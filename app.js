import express from 'express'
import { router } from './src/routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//carpeta Public accecible para el usuario
app.use(express.static('public'))

//configuramos el motor de plantillas
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use('/', router)

app.listen(8080,()=>console.log("server listening"));