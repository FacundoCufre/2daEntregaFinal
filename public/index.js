const server = io().connect()

const listar = (lista) => {
    let listadoSection = document.getElementById('productsList')
    
    let html = lista.map(prod => {
        return (`<li>
                    <strong>Nombre: ${prod.title}</strong>
                    <p>Nombre: ${prod.description}</p>
                    <em>Precio: ${prod.price}</em>
                    <img src="${prod.thumbnail}" alt="">
                </li>`)
    })
    
    listadoSection.innerHTML = html.join(' ')
}

const updateID = () => {
    
    const nombre = document.querySelector('#titleEdit').value
    const precio = document.querySelector('#priceEdit').value
    const thumbnail = document.querySelector('#thumbnailEdit').value

    const producto = {title: nombre, price: precio, thumbnail:thumbnail}
    console.log(producto)
    server.emit('producto-editado', producto)
}

const editable = () =>{
    let formEdit = `
                    <input type="text" placeholder="titulo nuevo" id="titleEdit">
                    <input type="text" placeholder="precio nuevo" id="priceEdit">
                    <input type="text" placeholder="foto nueva" id="thumbnailEdit">
                    <button type="submit" onclick="updateID()">actualizar</button>
                        `
    let listadoSection = document.getElementById('productsList')
    listadoSection.innerHTML += formEdit
}

const addProduct= (evt) => {
    const nombre = document.querySelector('#title').value
    const precio = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    const description = document.querySelector('#description').value
    const stock = document.querySelector('#stock').value

    const producto = {title: nombre, price: precio, thumbnail: thumbnail, timestamp: Date.now(), description: description, stock: stock,}

    server.emit('producto-nuevo', producto)
}

server.on('listado', mensaje => {
    listar(mensaje.lista)
    if(mensaje.id){
        editable()
    }
})

server.on('mensaje-servidor', mensaje => {
    listar(mensaje.productos)
})
