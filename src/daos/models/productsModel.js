import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    thumbnail: {
        type: String,
        required: true
    }
})

export const productsModel = mongoose.model('Products', productsSchema)