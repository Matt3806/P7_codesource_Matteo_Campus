
//constantes
const models = require('../models')

//ajout d'un like à un post
exports.createLike = (req, res) =>{
    console.log('createLike')

    const postId = req.params.id
    const userId = req.auth.userId

    const isLiked = models.like.findAll({ where: { postId: postId } })
    .then(islike => {
        if (islike.filter(i => i.userId === userId).length) return res.status(401).json({ err: 'already liked' })
        const liked = models.like.create({
            postId:postId,
            userId:userId
        })
        .then(()=> res.status(201).json({ msg: 'post liked' }))
        .catch(error => res.status(400).json({ error })) 
    })
    .catch(error => res.status(400).json({ error }))
}


//suppression d'un like à un post
exports.deleteLike = (req, res) => {
    console.log('deleteLike')
    const postId = req.params.id
    const userId = req.auth.userId

    const isLiked = models.like.findAll({ where: { postId: postId } })
    .then(islike => {
        if (!islike.filter(i => i.userId === userId).length) return res.status(401).json({ err: 'like first' })
        const disliked = models.like.destroy({where: { postId: postId , userId : userId}})
        .then(()=> res.status(201).json({ msg: 'post disliked' }))
        .catch(error => res.status(400).json({ error })) 
    })
    .catch(error => res.status(400).json({ error }))
}