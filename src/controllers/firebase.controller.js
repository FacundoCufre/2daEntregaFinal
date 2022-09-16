const { response } = require('express')

const ProductosDaoFirebase= require('../daos/productos/ProductosDaoFirebase')

const productosDaoFirebase = new ProductosDaoFirebase()

const getProducts = async (req, res = response) => {
    const productos = await productosDaoFirebase.getAll()
    res.json({
        productos
    })
}

const getProductById = async (req, res = response) => {
    const { id } = req.params
    const producto = await productosDaoFirebase.getById(id)
    res.json({
        producto
    })
}

const postProduct = async (req, res = response) => {
    const { title, price, thumbnail } = req.body
    if (title && price && thumbnail) {
        const producto = await productosDaoFirebase.save({ title, price, thumbnail })
        res.json({
            msg: 'producto guardado',
            producto
        })
    }   
}

const putProduct = async (req, res = response) => {
    const id  = parseInt(req.params.id)
    const { title, price, thumbnail } = req.body
    if (title && price && thumbnail) {
        const producto = await productosDaoFirebase.updeteById({ id, title, price, thumbnail })
        res.json({
            msg: 'producto actualizado',
            producto
        })
    }
}

const deleteProduct = async (req, res = response) => {
    const id  = parseInt(req.params.id)
    const producto = await productosDaoFirebase.deleteById(id)
    res.json({
        msg: 'producto eliminado',
        producto
    })
}




module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}
