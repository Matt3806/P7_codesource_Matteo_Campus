
//constantes
const models = require('../models')
const fs = require('fs')

//création d'un post par l'utilisateur connecté 
exports.createOnePost = (req, res)=>{
    console.log('createOnePost')

    const post = models.post
    const userId = req.auth.userId
    const body = req.file ?
        {
        ...req.body,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :{ ...req.body}

    const newPost = post.create({
        ...body,
        userId: userId
    })
    .then(()=> res.status(201).json({ msg: 'post created' }))
    .catch(error => res.status(400).json({ error }))
}

//affichage de tous les posts
exports.getAllPost = (req, res)=>{
    console.log('getAllPost')
    
    const user = models.user
    const post = models.post

    const posts = post.findAll({
        include :[{
            model:user,
            attributes: ['id','username','picture' ],
        }]
    })
    .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}

//affichage d'un seul post
exports.getOnePost = (req, res)=>{
    console.log('getOnePost')

    const user = models.user
    const post = models.post
    const id = req.params.id

    const posts = post.findByPk( id, {
        include :[{
            model:user,
            as:'user',
            attributes: ['id','username','picture' ]
        }]
    })
    .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))

}

//mis à jour d'un post par l'utlisateur qui l'a créé ou admin
exports.updatePost = (req, res)=>{
    console.log('updatePost')
 
    const userId = req.auth.userId
    const isadmin = req.auth.isadmin
    const id = parseInt(req.params.id)
    const body = req.file ?
        {
        ...req.body,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :{ ...req.body}
    const fieldsAllowed = { fields: ['picture', 'title', 'content'] }
    const contentToUpdate = (post) => {
        if(!req.file){
            post.update({
                ...body
            }, fieldsAllowed)
            .then(() => res.status(201).json({ msg: 'post updated' }))
            .catch(error => res.status(400).json({ error }))
        } else {
            if(!post.picture){
                post.update({
                    ...body
                },fieldsAllowed)
                .then(() => res.status(201).json({ msg: 'post updated' }))
                .catch(error => res.status(400).json({ error }))
            } else{
                const filename = post.picture.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    post.update({
                        ...body
                    },fieldsAllowed)
                    .then(() => res.status(201).json({ msg: 'post updated' }))
                    .catch(error => res.status(400).json({ error }))
                })
            }
        }
    }
    const postFound = models.post.findByPk(id)
    .then((post)=>{
        if (!post) return res.status(404).json({ msg: 'not found' })
        if(isadmin === true || userId === post.userId)
            return contentToUpdate(post)
        res.status(401).json({msg:'not allowed'})    
    })
    .catch(error => res.status(404).json({ error }))

}

//suppression d'un post par l'utlisateur qui l'a créé ou admin
exports.deletePost = (req, res)=>{
    console.log('deletePost')
    const userId = req.auth.userId
    const isadmin = req.auth.isadmin
    const id = parseInt(req.params.id)
  
    const contentToDelete = (post) =>{
        if(!post.picture){
            post.destroy({...post})
            .then(() => res.status(201).json({ msg: 'post destroy' }))
            .catch(error => res.status(400).json({ error }))
        } else {
            const filename = post.picture.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                post.destroy({
                    ...post,
                })
                .then(() => res.status(201).json({ msg: 'post destroy' }))
                .catch(error => res.status(400).json({ error }))
            })
        }            
    }

    const postFound = models.post.findByPk(id)
    .then((post)=>{
        if (!post) return res.status(404).json({ msg: 'not found' })
        if(isadmin === true || userId === post.userId) 
            return contentToDelete(post)
        res.status(401).json({msg:'not allowed'})    
    })
    .catch(error =>  res.status(404).json({ error }))
}