const express = require('express')
const { getProducts, postProduct, putProduct, deleteProduct, deleteAllProducts } = require('../controllers/productos.controller.js')


const { Router } = express

const routerFirebase = Router()



routerFirebase.get('/', getProducts)

routerFirebase.post('/', postProduct )

routerFirebase.put('/:id', putProduct)

routerFirebase.delete('/:id', deleteProduct)

routerFirebase.delete('/', deleteAllProducts)

module.exports = routerFirebase
