import { Router } from 'express'
//import { Contenedor } from '../components/Contenedor.js'
import { ContenedorSql } from '../components/ContenedorSql.js'
import { options } from '../config/dbConfig.js'
import {faker} from "@faker-js/faker";
const {commerce, image, datatype} = faker;
faker.locale = "es";

//const comics = new Contenedor("./src/data/comics.json");
const comics = new ContenedorSql(options.mariaDB, "products");
const router = Router()

router.get('/', async(req, res) => {
  const c = await comics.getAll()
  res.render('home', { comics: c}) 
})

// const form = document.getElementById("form")

// router.post('/api/comics', (req, res) => {
//   comics.save(req.body)
//   res.redirect('/')
//   // form.reset();
// })

router.get("/api/productos-test",(req,res)=>{
  let arrayProducts=[];
  for(let i=0;i<5;i++){
    arrayProducts.push(
          {
              id: datatype.uuid(),
              product: commerce.productName(),
              price: commerce.price(),
              picURL: image.cats()
          }
      )
  }
  res.send(arrayProducts);
})

export { router }
