import path from "path"

//con "type": "module", hay que levantar la variable de entorno de otro lado, url
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const options = {
    fileSystem: {
        pathProducts: 'src/files/productos.json',
        pathCarts: 'src/files/carritos.json',
    },
    mariaDB:{
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            password:"",
            database:"coderhousedb"
        }
    },
    sqliteDB:{
        client:"sqlite3",
        connection:{
            filename: path.join(__dirname, "../DB/chatDB.sqlite")
        }
    }
}

export { options }