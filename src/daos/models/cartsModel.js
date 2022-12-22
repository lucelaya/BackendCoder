import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    products: [{
        type: Number,
        required: true,
        default: []
    }],
    timestamp: {
        type: Date, 
        default: Date.now
    }
})

export const cartsModel = mongoose.model('Carts', cartsSchema)