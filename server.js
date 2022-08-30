const { captureRejectionSymbol } = require('events')
const express = require('express')
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const {Router} = express

const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./datos.txt")

const Carrito = require("./carrito")
const carrito = new Carrito("./carrito.txt")

const app = express()
const adminRouter = express.Router();

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', adminRouter)


adminRouter.get('/productos/:id?', async (req, res) => {
    
    const {id} = req.params
    if(id){
        const lista = await contenedor.getById(id)
        io.on('connection', socket => {
            const mensaje = {
                lista: lista,
                id: id
            }
            socket.emit('listado', mensaje)
            socket.on('producto-editado', async producto => {
                productoNuevo = {title: producto.title, price: producto.price, thumbnail: producto.thumbnail, id: parseInt(id)}
                console.log(productoNuevo)
                await contenedor.updateById(productoNuevo)
                const productos = await contenedor.getAll()
                const mensaje = {
                    mensaje: 'producto editado',
                    productos: productos,
                }
                io.sockets.emit('mensaje-servidor', mensaje )
            })
        })        
    }
    if(!id){
        const lista = await contenedor.getAll()
        io.on('connection', socket => {
            const mensaje = {
                lista: lista
            }
            socket.emit('listado', mensaje)
        }) 
    }
    const productos = await contenedor.getAll()
    res.json(productos)
})

adminRouter.post('/productos/', async (req, res) => {
    const nombre = req.query.title
    const precio = req.query.price
    const thumbnail = req.query.thumbnail
    const description = req.query.description
    const stock = req.query.stock
    const producto = {title: nombre, price: precio, thumbnail: thumbnail, timestamp: Date.now(), description: description, stock: stock,}
    await contenedor.save(producto)
    const productos = await contenedor.getAll()
    res.json(productos)
})

adminRouter.delete('/productos/:id', async (req, res) => {
    const {id} = req.params
    await contenedor.deleteById(id)
    const productos = await contenedor.getAll()
    const mensaje = {
        mensaje: 'producto eliminado',
        productos: productos,
    }
    io.sockets.emit('mensaje-servidor', mensaje )
    res.json(productos)
})

adminRouter.get('/carrito', (req, res) =>{
    res.sendFile('./carrito.html', {root: __dirname})
})

adminRouter.post('/carrito', async (req, res) =>{
    const carroNuevo = await carrito.create()
    res.json(carroNuevo)
})

adminRouter.delete('/carrito/:id', async (req, res) =>{
    const {id} = req.params
    await carrito.deleteById(id)
    const carritosRestantes = await carrito.getAll()
    res.json(carritosRestantes)
})

adminRouter.get('/carrito/:id/productos', async (req, res) =>{ 
    const {id} = req.params
    io.on('connection', async socket => {
        const carritoID = await carrito.getById(id)
        io.sockets.emit('ver-carro', carritoID)
    })
    const carritoID = await carrito.getById(id)
    res.json(carritoID)
    
})

adminRouter.post('/carrito/:id/productos', async (req, res) =>{
    const {id} = req.params
    io.on('connection', (socket) => {
        socket.on('buscar-porID', async (id2) => {
            const carritoID = await carrito.getById(id)
            const producto = await contenedor.getById(id2)
            const resultado = producto.find( prod => prod.id == id2 )
            console.log(resultado)
            carritoID.prods.push(resultado)
            await carrito.updateById(carritoID)
        })
    })
    const carritoActualizado = await carrito.getById(id)
    res.json(carritoActualizado)
})

adminRouter.delete('/carrito/:id/productos/:id_prod', async (req, res) =>{
    const {id} = req.params
    const {id_prod} = req.params
    io.on('connection', async (socket) => {
        const carritoID = await carrito.getById(id)
        const resultado = carritoID.prods.findIndex(prod => prod.id == id_prod)
        carritoID.prods.splice(resultado,1)
        await carrito.updateById(carritoID)
    })
    const carritoActualizado = await carrito.getById(id)
    res.json(carritoActualizado)
})

httpServer.listen(8080, () => console.log('SERVER ON'))

  