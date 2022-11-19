const fs = require("fs");
class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile,"utf8");
            const productos = JSON.parse(contenido);
            if(productos.length){
                return productos
            }else{ 
                return "El archivo esta vacio"
            }
        } catch (error) {
            console.log(error)
        }
    }
    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.nameFile)){
                const productos = await this.getAll()
                if(productos.length){
                    const titulo = product.title
                    const existe = productos.find(item=>item.title===titulo);
                    if (existe) { 
                        return "Ya existe ese titulo en el archivo"
                    } else{ 
                        // cuenta(acc) y recupera el ultimo id, recupera el mayor, pare evitar id repetido
                        // const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                        const idGen = productos.length+1
                        const newProduct={
                            // id: lastIdAdded+1,
                            id: idGen,
                            ...product
                        }
                        productos.push(newProduct);
                        await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
                        return `Se agrego el producto con id=${newProduct.id}`
                    }
                } else{
                    //si no existe ningun contenido en el archivo
                    const newProduct={
                        id:1,
                        ...product
                    }
                    //creamos el archivo
                    await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2))
                    return `Se agrego el producto con id=${newProduct.id}`
                }
            } else{
                // si el archivo no existe
                const newProduct={
                    id:1,
                    ...product
                }
                //creamos el archivo
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2))
                return `Se agrego el producto con id=${newProduct.id}`
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            const productos = await this.getAll()
            if(productos.length){
                const producto = productos.find(item=>item.id===id);
                return producto
            } else{
                return "El archivo esta vacio"
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try { 
            const productos = await this.getAll()
            if(productos.length){
                const newProducts = productos.filter(item=>item.id!==id);
                // Regrabo el archivo sin el producto del id solicitado.
                await fs.promises.writeFile(this.nameFile, JSON.stringify(newProducts, null, 2));
                return `Se elimino el producto con id=${id}`
            } else{
                return "El archivo esta vacio"
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
            return "delete sin where"
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor