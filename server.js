const express = require('express')
const { Server: HttpServer } = require('http') 
const {Router} = express

const routerProductos = require('./src/routes/productos.route')

const app = express()

const httpServer = new HttpServer(app)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProductos)

httpServer.listen(8080, () => console.log('online'))

  