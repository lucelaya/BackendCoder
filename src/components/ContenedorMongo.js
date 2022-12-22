class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async save(obj) {
        try {
            debugger
            const items = await this.getAll();
                const lastIdAdded = items.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newItem={
                    id: lastIdAdded+1,
                    ...obj
                }
                const productSchema = new this.model(newItem)
                const productCreated = await productSchema.save()
                return (productCreated);
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
    async getById(id) {
        try {
            const data = await this.model.find({id:id});
            return data[0];
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
    async getAll() {
        try {
            const data = await this.model.find({})
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
    async deleteById(id) {
        try {
            const data = await this.model.deleteOne({ id: id });
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
    async deleteAll() {
        try {
            const data = await this.model.deleteMany({});
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
    async updateById(itemToUpdate, newValue) {
        try {
            const updatedItem = await this.model.updateOne({id:itemToUpdate}, { $set: newValue })
            return updatedItem;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
}

export default MongoContainer;