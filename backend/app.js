require('dotenv').config()
const express = require('express')
const helmet = require("helmet")
const app = express()
const path = require('path')
const { Sequelize } = require('sequelize')

app.use(helmet())

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
const likeRoutes = require('./routes/like')


const sequelize = new Sequelize('database_development', 'root', process.env.dbSecret, {
    host: 'localhost',
    dialect: 'mysql'
  });
async function dbConnect(){
    try {
        await sequelize.authenticate();
        console.log('database connected');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
dbConnect()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
});

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/post', postRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/like', likeRoutes)


module.exports = app