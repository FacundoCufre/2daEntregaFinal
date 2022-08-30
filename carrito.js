const fs = require('fs')

class Carrito{
    constructor(ruta){
        this.ruta = ruta
    }

    async create(){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let carroNuevo = {id: dataParse.length+1,timestamp: Date.now(), prods: []}
            await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataParse, carroNuevo ] , null, 2) )
            return carroNuevo.id
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            if(!dataParse.length){
                console.log('no hay carritos')
            }
            return dataParse
        }
        catch(error){
            console.log(error )
        }
    }

    async deleteById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let cart = dataParse.find(cart => cart.id == id)
            if(cart){
                let dataParseFiltrado = dataParse.filter(cart => cart.id != id)
                await fs.promises.writeFile(this.ruta, JSON.stringify( dataParseFiltrado, null, 2) )
                console.log('carrito eliminado', dataParseFiltrado)
            }
            else{
                console.log('no se encontro el carrito')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async getById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let cart = dataParse.find(cart => cart.id == id)
            if(cart){
                return cart
            }
            else{
                console.log('no se encontro el carrito')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async updateById(obj){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            const objIndex = dataParse.findIndex(prod => prod.id === obj.id)
            if(objIndex !== -1){
                dataParse[objIndex] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify( dataParse , null, 2) )
                console.log('producto actualizado')
            }
            else{
                console.log('error') 
            }
            return (dataParse)
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = Carrito