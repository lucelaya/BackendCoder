import MongoContainer from '../../components/ContenedorMongo.js'
import { cartsModel } from '../models/cartsModel.js'

class CarritosDaoMongo extends MongoContainer {
    constructor() {
        super(cartsModel)
    }
}

export {CarritosDaoMongo}