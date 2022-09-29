
//constantes
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSIgnSecret = process.env.jwtSIgnSecret 
const models = require('../models')
const fs = require('fs')

// création d'un utlisateur 
exports.createUser = (req, res)=>{
    console.log('createOneUser')
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser = models.user.create({
            email: req.body.email,
            password: hash,
            username: req.body.username,
        })
            .then(() => res.status(201).json({ message: 'user created' }))
            .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

//connection d'un utilisateur 
exports.logUser = (req, res)=>{
    console.log('logOneUser')
    const email = req.body.email

    const userFound = models.user.findOne({ where: { email: email } })
        .then((user) => {
            if(!user) return res.status(404).json({ error: 'user not found!' })
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'incorrect password' })
                    }
                    res.status(200).json({
                        token: jwt.sign(
                            { 
                            userId: user.id,
                            isadmin :user.isadmin 
                            },
                            jwtSIgnSecret,
                            { expiresIn: '24h' },
                        )
                    })
                })
                .catch(error => res.status(404).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// recupération du profil ciblé
exports.getUser = (req, res)=>{
    console.log('getUser')

    const id = parseInt(req.params.id)

    const userFound = models.user.findByPk(id,{ 
        attributes: ['id','username', 'bio', 'picture', 'createdAt', 'updatedAt'] 
    })
    .then((user)=>{
        if (!user) return res.status(404).json({ msg: 'not found' })
         res.status(200).json(user)    
    })
    .catch(error => res.status(404).json({ error }))
}

//récupération de tous les profils
exports.getAllUser = (req, res) => {
    console.log('getAllUser')

    const userFound = models.user.findAll({ 
        attributes: ['id','username', 'bio', 'picture', 'createdAt', 'updatedAt'] 
    })
    .then((user)=>{
        if (!user) return res.status(404).json({ msg: 'not found' })
         res.status(200).json(user)    
    })
    .catch(error => res.status(404).json({ error }))
}

//mis à jour du profil par l'utilisateur connecté ou admin
exports.updateUser = (req, res)=>{
    console.log('updateUser')
    const userId = req.auth.userId
    const isadmin = req.auth.isadmin
    const id = parseInt(req.params.id)
    const body = req.file ?
        {
        ...req.body,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :{ ...req.body}
    const fieldsAllowed = { fields: ['username', 'bio', 'picture'] }

    const contentToUpdate = (user) => {
        if(!req.file){
            user.update({
                ...body
            },  fieldsAllowed)
            .then(() => res.status(201).json({ msg: 'user updated' }))
            .catch(error => res.status(400).json({ error }))
        } else {
            if(!user.picture){
                user.update({
                    ...body
                }, fieldsAllowed)
                .then(() => res.status(201).json({ msg: 'user updated' }))
                .catch(error => res.status(400).json({ error }))
            } else {
                const filename = user.picture.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    user.update({
                        ...body
                    }, fieldsAllowed)
                    .then(() => res.status(201).json({ msg: 'user updated' }))
                    .catch(error => res.status(400).json({ error }))
                })
            }
        }
    }
    const userFound = models.user.findByPk(id,{
        attributes: [ 'id', 'username', 'bio', 'picture'] 
    })
    .then((user)=>{
        if (!user) return res.status(404).json({ msg: 'not found' })
        if(isadmin === true || userId === id)
            return contentToUpdate(user)
        res.status(401).json({msg:'not allowed'})    
    })
    .catch(error => {res.status(404).json({ error })})
}

//suppression par l'utilisateur connecté ou admin
exports.deleteUser = (req, res)=>{
    console.log('deleteUser')

    const userId = req.auth.userId
    const isadmin = req.auth.isadmin
    const id = parseInt(req.params.id)
  
    const contentToDelete = (user) =>{
        if(!user.picture){
            user.destroy({...user})
            .then(() => res.status(201).json({ msg: 'user destroy' }))
            .catch(error => res.status(400).json({ error }))
        } else {
            const filename = user.picture.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                user.destroy({
                    ...user,
                })
                .then(() => res.status(201).json({ msg: 'user destroy' }))
                .catch(error => res.status(400).json({ error }))
            })
        }            
    }

    const userFound = models.user.findByPk(id)
    .then((user)=>{
        if (!user) return res.status(404).json({ msg: 'not found' })
        if(isadmin === true || userId === id) 
            return contentToDelete(user)
        res.status(401).json({msg:'not allowed'})    
    })
    .catch(error =>  {console.log(error) ; res.status(404).json({ error })})
}