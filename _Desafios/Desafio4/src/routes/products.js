const express = require("express");
const Contenedor = require("../controllers/contenedor.js");
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("./data/productos.txt");

// /api/productos/           *GET *POST
// /api/productos/:productId *GET *PUT *DELETE

productsRouter.get("/",async(req,res)=>{
    try {
        const products = await contenedorProductos.getAll();
        res.send(products)
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.get("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await contenedorProductos.getById(parseInt(id));
        if(product){
            res.json({
                message:"producto encontrado",
                product: product
            })
        }else{
            res.json({
                message:"producto no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.post("/",async(req,res)=>{
    try {
        const newProduct = req.body;
        const productos = await contenedorProductos.save(newProduct);
        res.json({
            message:"producto creado",
            response: [newProduct,productos]
        })
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.put("/:id", async(req,res)=>{
        const {id} = req.params;
        try {
        const product = await contenedorProductos.getById(parseInt(id));
        if(product){
            const newInfo = req.body;
            const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
            res.json({
                message:`El producto con el id ${id} fue actualizado`,
                response: [product,productosActualizados]
            })
        } else {
            res.json({
                message:"producto no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await contenedorProductos.getById(parseInt(id));
        if(product){
            const productosActualizados =await contenedorProductos.deleteById(parseInt(id));
            res.json({
                message:`El producto con el id ${id} fue eliminado`,
                response: [product,productosActualizados]
            })
        } else {
            res.json({
                message:"producto no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

module.exports = productsRouter;