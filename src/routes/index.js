import { Router } from 'express'
import { Contenedor } from '../components/Contenedor.js'

const comics = new Contenedor("./src/data/comics.json");
const router = Router()

router.get('/', async(req, res) => {
  const c = await comics.getAll()
  res.render('home',{ comics: c}) 
})

router.post('/api/comics', (req, res) => {
  comics.save(req.body)
  res.redirect('/')
})

router.get('/comics', async(req, res) => {
  const c = await comics.getAll()
  res.render('comics', { comics: c})
})

export { router }
