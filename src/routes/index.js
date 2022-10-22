import { Router } from 'express'
import { Contenedor } from '../components/Contenedor.js'

const comics = new Contenedor("./src/data/comics.json");
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
