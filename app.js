import express from 'express'
import { router } from './src/routes/index.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import { Contenedor } from './src/components/Contenedor.js'
const productos = new Contenedor("./src/data/comics.json");

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

//HandleBarS
app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './src/views')

const historicoMensajes = [];

io.on("connection",async(socket)=>{
    console.log("nuevo usuario conectado", socket.id);
    //enviar a todos menos al socket conectado
    socket.broadcast.emit("newUser");
    socket.emit("historico",historicoMensajes)
    socket.on("message",data=>{
        console.log(data);
        historicoMensajes.push(data);
        //enviar a todos
        io.sockets.emit("historico",historicoMensajes);
    })

    // primer pintada ya realizada en el route
    // socket.emit("productos",await productos.getAll())
    socket.on("alta",async data=>{
        console.log(data);
        console.log(productos);
        await productos.save(data);
        //enviar a todos
        io.sockets.emit("productos",await productos.getAll());
    })

})