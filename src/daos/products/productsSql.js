import { ContenedorSql } from "../../components/ContenedorSql.js";

class ProductosDaoSQL extends ContenedorSql{
    constructor(options,tableName){
        super(options,tableName)
    }
}

export {ProductosDaoSQL}