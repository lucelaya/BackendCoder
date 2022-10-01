const Contenedor = require("./Contenedor.js")

const listaProductos = new Contenedor("./productos.txt")
const producto1 = {
    title:"Sandman#1",
    price:150,
    thumbnail:"../assets/products/Sandman001.jpeg"
}
const productoRepetido = {
    title:"Sandman#1",
    price:150,
    thumbnail:"../assets/products/Sandman001.jpeg"
}
const producto2 = {
    title:"100 Bullets#1",
    price:120,
    thumbnail:"../assets/products/Balas001.jpeg"
}

const producto3 = {
    title:"Y: The last man#1",
    price:180,
    thumbnail:"../assets/products/YTLM01.jpeg"
}

const crearProducto = async()=>{
    //*elimino el archivo*
    // para ver que me devuelve la proxima funcion si el archivo no existe
    console.log(await listaProductos.getAll());
    console.log(await listaProductos.getById(1));
    console.log(await listaProductos.deleteById(2));
    console.log(await listaProductos.deleteAll());
    // se agregan 3 productos
    console.log(await listaProductos.save(producto1));
    console.log(await listaProductos.save(producto2));
    console.log(await listaProductos.save(producto3));
    // tratar titulo repetido
    console.log(await listaProductos.save(productoRepetido));
    // recupero el producto con id=1
    console.log(await listaProductos.getById(1));
    // recupero los productos
    console.log(await listaProductos.getAll());
    // se elimina el producto con id=2 
    console.log(await listaProductos.deleteById(2));
    // se vuelve a incorporar el producto 2, pero con un nuevo id
    console.log(await listaProductos.save(producto2));
    console.log(await listaProductos.getAll());
    // se borra todo, entiendo que el id vuelve a iniciar en 1
    console.log(await listaProductos.deleteAll());
    //archivo vacio
    console.log(await listaProductos.getAll());
    //inexistente
    console.log(await listaProductos.getById(4));
    // vuelvo a grabar los 3 primeros productos y los muestro
    console.log(await listaProductos.save(producto1));
    console.log(await listaProductos.save(producto2));
    console.log(await listaProductos.save(producto3));
    console.log(await listaProductos.getAll());
}

crearProducto();