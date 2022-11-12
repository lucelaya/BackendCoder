import { Router } from 'express'
import { Contenedor } from '../components/Contenedor.js'

const contenedorProductos = new Contenedor("./src/data/products.json");
const contenedorCarritos = new Contenedor("./src/data/chart.json");
const chartRouter = Router()
// crea un nuevo objeto `Date`
const today = new Date();
// obtener la fecha y la hora
let now //now = today.toLocaleString(); example:1/27/2020, 9:30:00 PM

// /api/carrito/                             C     *POST 
// /api/carrito/:chartId                        D  *DELETE
// /api/carrito/:chartId/productos            RU   *GET *POST
// /api/carrito/:chartId/productos/:ProductId   D' *DELETE
chartRouter.post("/",async(req,res)=>{
    try {
        now = today.toLocaleString()
        const newChart = {
        timestamp:now,
        products:[]}

        const carrito = await contenedorCarritos.save(newChart);
        res.json({
            message:"carrito creado",
            response: carrito
        })
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

chartRouter.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const carrito = await contenedorCarritos.getById(parseInt(id));
        if(carrito){
            const carritosActualizados = await contenedorCarritos.deleteById(parseInt(id));
            res.json({
                message:`El carrito con el id ${id} fue eliminado`,
                response: [carrito,carritosActualizados]
            })
        } else {
            res.json({
                message:"carrito no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

// chartRouter.get("/",async(req,res)=>{
//     try {
//         const carritos = await contenedorCarritos.getAll();
//         res.send(carritos)
//     } catch (error) {
//         res.status(500).send("hubo un error en el servidor")
//     }
// })

chartRouter.get("/:id/productos", async(req,res)=>{
    //listar produtos del contenedor, si el producto ya no existe? no lo muestro
    try {
        const {id} = req.params;
        const carrito = await contenedorCarritos.getById(parseInt(id));
        if(carrito){
            const productos = await contenedorProductos.getAll();
            const items = []
            let item
            // carrito.products.map(p => items.push(productos.find(pr => pr.id === p)))
            carrito.products.map((p) => { 
                                        item = productos.find(pr => pr.id === p) 
                                        if (item) {items.push(item)} 
                                        }
                                )
            if (items.length > 0) {
                res.json({
                    message:"items encontrados",
                    product: items
                })
            } else {
                res.json({
                    message:"el carrito no tiene items en stock"
                })
            }
        }else{
            res.json({
                message:"carrito no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

chartRouter.post("/:id/productos", async(req,res)=>{
    //buscar por id si lo encuentro lo sumo
    try {
        //El body deberia traer un array de id de productos 
        const dataArr = new Set(req.body);
        //Quitar duplicados
        const body = [...dataArr];
        const {id} = req.params;
        const carrito = await contenedorCarritos.getById(parseInt(id));
        if(carrito){
            const productos = await contenedorProductos.getAll();
            const items = []
            let item
            body.map((i) => { 
                                item = productos.find(pr => pr.id === i) 
                                if (item) {
                                    carrito.products.find(prd => prd === i) ?
                                    console.log("sarasa")
                                    :
                                    items.push(item.id)
                                } 
                            })
            if (items.length > 0) {
                //incorporar al carrito el array de items
                carrito.products.length > 0 && carrito.products.map((p)=>{ items.push(p) })
                console.log(carrito.products)
                now = today.toLocaleString()
                const newChart = {
                    timestamp:now,
                    products:items}
                await contenedorCarritos.updateById(parseInt(id),newChart)
                res.json({
                    message:"items del carrito incorporados",
                    carrito: [id,{...newChart}]
                })
            } else {
                res.json({
                    message:"items sin stock o ya incorporados previamente al carrito"
                })
            }
        }else{
            res.json({
                message:"carrito no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

chartRouter.delete("/:id/productos/:idProd", async(req,res)=>{
    //borrar producto del carrito si lo encuentro
    try {
        const {id, idProd} = req.params;
        const carrito = await contenedorCarritos.getById(parseInt(id));
        if(carrito){
            // const carritosActualizados =await contenedorCarritos.deleteById(parseInt(id));
            if (carrito.products.find(p => p === parseInt(idProd))){
                now = today.toLocaleString()
                const newChart = {
                    timestamp:now,
                    products:carrito.products.filter(i => i !== parseInt(idProd))}
                // console.log(carrito.products.filter(i => i !== parseInt(idProd)))
                await contenedorCarritos.updateById(parseInt(id),newChart)
                res.json({
                    message:`se elimino el item del carrito`,
                    response: [carrito,newChart]
                })
            } else {
                res.json({
                    message:`el item no se encuentra en el carrrito`
                })
            }
        } else {
            res.json({
                message:"carrito no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

export { chartRouter }