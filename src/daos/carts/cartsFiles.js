import { Contenedor } from "../../components/Contenedor.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class CartsDaoArchivos extends Contenedor{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {CartsDaoArchivos}