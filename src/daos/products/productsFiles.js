import { Contenedor } from "../../components/Contenedor.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoArchivos extends Contenedor{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {ProductsDaoArchivos}