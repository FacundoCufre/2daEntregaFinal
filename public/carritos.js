const serverCarro = io().connect()

const crearCarro = () =>{
    serverCarro.emit('carrito-nuevo')
}

const listarEnCarro = (lista) => {
    let listadoSection = document.getElementById('listadoCarroSection')
    let html = lista.map(prod => {
            return (`<li>
                    <strong>Nombre: ${prod.title}</strong>
                    <em>Precio: ${prod.price}</em>
                </li>`)      
    })

    listadoSection.innerHTML = `<h2>PRODUCTOS EN ESTE CARRO</h2><br>`
    listadoSection.innerHTML += html.join(' ')

    document.getElementById('agregarPorID').innerHTML= `<h2>AGREGAR PRODUCTO POR SU ID</h2>
    <form method="POST" onsubmit="return agregarPorID(this)">
        <input type="number" id="idProducto" placeholder="id del producto">
        <input type="submit" value="agregar al carro">
    </form>`
}

const agregarPorID = () =>{
    const id2 = document.querySelector('#idProducto').value
    serverCarro.emit('buscar-porID', id2)
}

serverCarro.on('ver-carro', carritoID => {
    listarEnCarro(carritoID.prods)
    console.log(carritoID.prods)
})