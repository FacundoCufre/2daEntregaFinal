const express = require('express')
const { Server: HttpServer } = require('http') 
const {Router} = express

var admin = require("firebase-admin");

var serviceAccount = require("./ecommerce-facundocufre-firebase-adminsdk-taxov-1afc23c373.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const routerFirebase = require('./src/routes/firebase.route')

const app = express()

const httpServer = new HttpServer(app)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/firebase', routerFirebase)

httpServer.listen(8080, () => console.log('online'))
