import { ContenedorSql } from "../../components/ContenedorSql.js";

class CarritosDaoSQL extends ContenedorSql{
    constructor(options,tableName){
        super(options,tableName)
    }
}

export {CarritosDaoSQL}