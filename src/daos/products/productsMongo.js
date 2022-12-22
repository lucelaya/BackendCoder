import MongoContainer from '../../components/ContenedorMongo.js'
import { productsModel } from '../models/productsModel.js'

class ProductosDaoMongo extends MongoContainer {
    constructor() {
        super(productsModel)
    }
}

export {ProductosDaoMongo}