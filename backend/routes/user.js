const express = require('express')
const router = express.Router()

//constante

const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const passwordValidator = require('../middleware/password-validator')

//create
router.post('/signup', multer, passwordValidator, userCtrl.createUser)

//read
router.post('/login', multer,  userCtrl.logUser)
router.get('/:id', auth, multer,  userCtrl.getUser)

//update
router.put('/:id', auth,  multer, userCtrl.updateUser)

//delete
router.delete('/:id', auth, multer, userCtrl.deleteUser)

module.exports = router