const express = require ("express")
// const moment = require("moment")
const Contenedor = require("./Contenedor")
const app =  express()

// RUTAS
// app.get("/",(req,res)=>{
//     res.send(`sarasa`)
// })
// app.get("/fecha",(req,res)=>{
//     const today = moment().format("DD/MM/YYYY")
//     res.send(`<h1>Welcome, today is= ${today}`)
// })
// let visitas = 0
// app.get("/visitas", (req,res)=>{
//     visitas++
//     res.send(`visitas; ${visitas}`)
// })
// Desafio3
const listaProductos = new Contenedor("./productos.txt")
const producto1 = {
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
console.log(await listaProductos.save(producto1))
console.log(await listaProductos.save(producto2))
console.log(await listaProductos.save(producto3))
}
// crearProducto()

// RUTAS
app.get("/",(req,res)=>{
    res.send(`intente:
    http://localhost:8080/productos
    http://localhost:8080/productosRandom`)
})
app.get("/productos", async (req,res)=>{
    const products = await listaProductos.getAll()
    res.send(products)
})
app.get("/productosRandom", async (req,res)=>{
    const products = await listaProductos.getAll()
    const randomProd = products[Math.floor(Math.random()*products.length)]
    res.send(randomProd)
})

// listen for requests :)
const listener = app.listen(8080, function() {
    console.log("Your app is listening on port " + listener.address().port);
});