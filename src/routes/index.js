import { Router } from 'express'
import { Customers } from '../components/Customers.js'
import { Contenedor } from '../components/Contenedor.js'

const comics = new Contenedor("./src/data/comics.json");
const customers = new Customers()
const router = Router()

router.get('/', (req, res) => {
  res.render('home') 
})

router.post('/api/customers', (req, res) => {
  customers.add(req.body)
  res.redirect('/')
})

router.get('/customers', (req, res) => {
  res.render('customers', { customers: customers.getAll() })
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
