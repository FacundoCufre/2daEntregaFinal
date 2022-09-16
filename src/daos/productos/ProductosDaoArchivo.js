const {ContenedorArchivo} = require('../../contenedores/ContenedorArchivo')

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('./datos.txt')
    }
}

module.exports = ProductosDaoArchivo
