const express = require('express')
const router = express.Router()

//constantes

const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//create
router.post('/', auth, multer, postCtrl.createOnePost)

//read
router.get('/', auth, multer, postCtrl.getAllPost)
router.get('/:id', auth, multer, postCtrl.getOnePost)

//update
router.put('/:id', auth, multer, postCtrl.updatePost)

//delete
router.delete('/:id', auth, multer, postCtrl.deletePost)

module.exports = router