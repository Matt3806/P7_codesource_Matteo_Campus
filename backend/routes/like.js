const express = require('express')
const router = express.Router()

//constantes

const likeCtrl = require('../controllers/likeCtrl')
const auth = require('../middleware/auth')

//create
router.post('/:id', auth, likeCtrl.createLike)


//delete
router.delete('/:id', auth, likeCtrl.deleteLike)

module.exports = router