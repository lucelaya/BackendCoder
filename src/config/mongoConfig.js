import mongoose from "mongoose";

export async function connect() {
    const URL = `mongodb+srv://mongodbadmin:hJgGig2aJaCXD2yz@backendcoder.sdrj6yz.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(URL)
    mongoose.connection.on('open', () => console.log(`Conectado a MongoDB`))
    mongoose.connection.on('error', (e) => console.log(e))
}
