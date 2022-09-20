const jwt = require('jsonwebtoken')
const jwtSIgnSecret =  process.env.jwtSIgnSecret 

module.exports =(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, jwtSIgnSecret)
        const userId = decodedToken.userId
        const isadmin = decodedToken.isadmin
        req.auth = { userId , isadmin}
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable'
        }else{
            next()
        }
    } catch (error){
        res.status(401).json ({ error : error | 'Requête non authentifiée !'})
    }
}