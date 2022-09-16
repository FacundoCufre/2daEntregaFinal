const fs = require('fs')

class ContenedorArchivo {
    constructor(ruta){
        this.ruta = ruta       
    }   

    async #readFileFunction(ruta){
        let archivo = await fs.promises.readFile(ruta, 'utf-8' )
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }
    
    async save(obj){
        try {             
            let dataArch = await this.#readFileFunction(this.ruta)
            if (dataArch.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArch, { ...obj, id: dataArch[dataArch.length - 1].id + 1 } ], null, 2))                              
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{ ...obj, id: 1 }], null, 2))                
            }            
             console.log(`El archivo tiene el id: ${dataArch[dataArch.length - 1].id + 1}`)
        } catch (error) {
            console.log(error)
        }            
       
    }
    async updeteById(obj){
        try {
            let dataArch = await this.#readFileFunction(this.ruta)
            const objIndex = dataArch.findIndex(prod => prod.id === obj.id) 
            if (objIndex !== -1) {
                dataArch[objIndex] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify( dataArch, null, 2))  
                return {msg: 'actualizado el producto'}                                            
            } else {
                return {error: 'no existe el producto'}            
            }           
        } catch (error) {
            console.log(error)
        }            
       
    }

    async getProductRamdom(){
        try {
            let dataArch = await this.#readFileFunction(this.ruta)
            let random = Math.floor(Math.random() * dataArch.length)
            return dataArch[random]
        } catch (error) {
            console.log(error)
        }
    } 

    async getById(id){
        try {
            let dataArch = await this.#readFileFunction(this.ruta)
            let producto = dataArch.find(producto => producto.id === id)
            if (producto) {                
                console.log(producto)
            } else {               
                console.log('No se encontro el producto')  
            }           
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {            
            let dataArch = await this.#readFileFunction(this.ruta)           
            if (dataArch.length) {                             
                return dataArch
            } else {                
                return null
            }            
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        let dataArch = await this.#readFileFunction(this.ruta)
        let producto = dataArch.find(prod => prod.id === id)
        if (producto) {
            const dataArchParseFiltrado = dataArch.filter(prod => prod.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
            console.log('Producto eliminado')
        }else{
            console.log('no existe el producto')
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports =   { ContenedorArchivo }
