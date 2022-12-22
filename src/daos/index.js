import {options} from "../config/dbConfig.js";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

//identificador
let databaseType = "mongo";

switch(databaseType){
    case "archivos":
        const {ProductsDaoArchivos} = await import("./products/productsFiles.js");
        const {CartsDaoArchivos} = await import("./carts/cartsFiles.js");
        ContenedorDaoProductos = new ProductsDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoCarritos = new CartsDaoArchivos(options.fileSystem.pathCarts);
        break;
    case "sql":
        const {ProductosDaoSQL} = await import("./products/productsSql.js");
        const {CarritosDaoSQL} = await import("./carts/cartsSql.js");
        ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDB, "productos");
        ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDB,"carritos");
        break;
    case "mongo":
        const {ProductosDaoMongo} = await import("./products/productsMongo.js");
        const {CarritosDaoMongo} = await import("./carts/cartsMongo.js");
        //Conectar Mongo
        const { connect } = await import("../config/mongoConfig.js");
        try {
            await connect()
        } catch (error) {
            console.log(error);
        }
        ContenedorDaoProductos = new ProductosDaoMongo();
        ContenedorDaoCarritos = new CarritosDaoMongo();
        break;
}

export {ContenedorDaoProductos,ContenedorDaoCarritos}