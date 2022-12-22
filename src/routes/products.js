import express from "express";
import { checkAdminRole } from "../middlewares/checkRole.js";
import { options } from "../config/dbConfig.js";
import { Contenedor } from "../components/Contenedor.js";
import { ContenedorSql } from "../components/ContenedorSql.js";
import {ContenedorDaoProductos} from "../daos/index.js";

//products manager
// const productosApi = new Contenedor(options.fileSystem.pathProducts);
// const productosApi = new ContenedorSql(options.sqliteDB, "productos");
const productosApi = ContenedorDaoProductos;

// products router
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const response = await productosApi.getAll()
    res.json(response)
})

productsRouter.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await productosApi.getById(productId);
    res.json(response);
})

productsRouter.post('/', checkAdminRole, async (req, res) => {
    const response = await productosApi.save(req.body);
    res.json(response)
})

productsRouter.put('/:id', checkAdminRole, async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await productosApi.updateById(productId,req.body);
    res.json(response);
})

productsRouter.delete('/:id', checkAdminRole, async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await productosApi.deleteById(productId);
    res.json(response);
})

export {productsRouter}