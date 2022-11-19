import { Router } from 'express'
//import { Contenedor } from '../components/Contenedor.js'
import { ContenedorSql } from '../components/contenedorSql.js'
import { options } from '../config/dbConfig.js'

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

export { router }
