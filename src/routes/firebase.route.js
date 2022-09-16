const express = require('express')
const { getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/firebase.controller.js')


const { Router } = express

const routerProductos = Router()



routerProductos.get('/', getProducts)

routerProductos.post('/', postProduct )

routerProductos.put('/:id', putProduct)

routerProductos.delete('/:id', deleteProduct)

module.exports = routerProductos
