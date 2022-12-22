import express from 'express'
import { router } from './src/routes/rutas.js'
import { cartsRouter } from "./src/routes/carritos.js";
import { productsRouter } from "./src/routes/products.js";
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { Contenedor } from './src/components/Contenedor.js'
import { ContenedorSql } from './src/components/ContenedorSql.js';
import { options } from './src/config/dbConfig.js'
import { normalize, schema } from 'normalizr'

//const productos = new Contenedor("./src/data/comics.json");
const productos = new ContenedorSql(options.mariaDB, "products");
//const historicoMensajes = [];
const historicoMensajes = new Contenedor("./src/data/mensajes.json");
// const historicoMensajes = new ContenedorSql(options.sqliteDB,"chat");

const PORT = process.env.PORT || 8080;
const app = express()

//Servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//Servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

//Configuracion: al body lo interpreta como JSON
app.use(express.json())
//Configuracion: nested objets, usa una libreria para anidar los atributos de un mismo objeto
app.use(express.urlencoded({ extended: true }))
//Carpeta de Acceso publico, al usuario
//con "type": "module", hay que levantar la variable de entorno de otro lado, url
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static(__dirname+"/public"));
// io.use(express.static('public'));

//Router
app.use('/', router)
//router productos y carritos
app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);

//HandleBarS
app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './src/views')

//Normalizacion
//creamos los esquemas.
//esquema del author
const authorSchema = new schema.Entity("authors",{}, {idAttribute:"alias"});

//esquema mensaje
const messageSchema = new schema.Entity("messages", {author: authorSchema});

//creamos nuevo objeto para normalizar la informacion
// {
//     id:"chatHistory",
//     messages:[
//         {},{},{}
//     ]
// }
//esquema global para el nuevo objeto
const chatSchema = new schema.Entity("chat", {
    messages:[messageSchema]
}, {idAttribute:"id"});

//aplicar la normalizacion
//crear una funcion que la podemos llamar para normalizar la data
const normalizarData = (data)=>{
    const normalizeData = normalize({id:"chatHistory", messages:data}, chatSchema);
    return normalizeData;
};

const normalizarMensajes = async()=>{
    const results = await historicoMensajes.getAll();
    const messagesNormalized = normalizarData(results);
    return messagesNormalized;
}

io.on("connection",async(socket)=>{
    //enviar a todos menos al socket conectado
    socket.broadcast.emit("newUser");
    // socket.emit("historico",await historicoMensajes.getAll())
    socket.emit("historico",await normalizarMensajes())
    socket.on("message",async data=>{
        await historicoMensajes.save(data);
        //enviar a todos
        // io.sockets.emit("historico",await historicoMensajes.getAll());
        io.sockets.emit("historico",await normalizarMensajes());
    })

    // primer pintada ya realizada en el route
    // socket.emit("productos",await productos.getAll())
    socket.on("alta",async data=>{
        await productos.getAll();
        await productos.save(data);
        //enviar a todos
        io.sockets.emit("productos",await productos.getAll());
    })

})