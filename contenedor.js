const fs = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            if(dataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataParse, {...obj, id: dataParse.length+1}] , null, 2) )
            }
            else{
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{...obj, id: dataParse.length+1}], null, 2) )
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

    async getById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id == id)
            if(producto){
                producto = [producto]
                return producto
            }
            else{
                console.log('no se encontro el producto')
            }
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
                console.log('no hay productos')
            }
            return dataParse
        }
        catch(error){
            console.log(error )
        }
    }

    async getRandom(randomID){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === randomID)
            if(producto){
                console.log(producto)
            }
            else{
                console.log('no se encontro el producto')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if(producto){
                let dataParseFiltrado = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify( dataParseFiltrado, null, 2) )
                console.log('producto eliminado', dataParseFiltrado)
            }
            else{
                console.log('no se encontro el producto')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify( [], null, 2) )
        console.log('productos borrados')
    }
}

module.exports = Contenedor