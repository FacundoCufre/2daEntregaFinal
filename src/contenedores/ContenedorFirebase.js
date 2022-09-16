var admin = require("firebase-admin");
const db = admin.firestore()
query = db.collection('productos')


class ContenedorFirebase {
    constructor(ruta){
        this.ruta = ruta       
    }

    async save({ title, price, thumbnail }) {
        
        try {
         let id = 2
            const doc = query.doc(`${id}`)
            await doc.create({
                title: title,
                price: price,
                thumbnail: thumbnail
            })
        }
        catch(error){
            console.log(error)
        }
    }

    async updateById({ id, title, price, thumbnail }) {
        
        try {
            const iid = id
            const doc = query.doc(id)
            const item = await doc.update({
                title: title,
                price: price,
                thumbnail: thumbnail})
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id) {
        
        try {
            const doc = query.doc(id)
            const item = await doc.delete()
            console.log(`Item eliminado: ${item}`)
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll() {
        
        try {
            const queryRead = await query.get()
            const respuesta = queryRead.docs.map(document => ({id: document.id, ...document.data()}))
            console.log(respuesta)
        }
        catch(error){
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = query.doc(id)
            let queryReadONE = await doc.get()
            const respuesta = {id: queryReadONE.id, ...queryReadONE.data()}
            console.log(respuesta)
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports =   { ContenedorFirebase }