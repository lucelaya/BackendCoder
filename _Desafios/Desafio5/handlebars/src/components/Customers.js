class Customers {
  constructor() {
    this.customers = [
      { id: 1, name: 'Jose', age: 31, picture: 'https://xsgames.co/randomusers/assets/avatars/pixel/40.jpg' },
      { id: 2, name: 'Raul', age: 24, picture: 'https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg' },
      { id: 3, name: 'Ni idea', age: 19, picture: 'https://xsgames.co/randomusers/assets/avatars/pixel/9.jpg' },
    ]

    this.numberOfClients = this.customers.length
  }

  add = (client) => {
    const lastItem = this.customers[this.numberOfClients - 1] //Ultimo item del array
    const lastID = lastItem.id //ID del ultimo item
    const nextID = lastID + 1 //ID para el nuevo item
    client.id = nextID
    this.customers.push(client)
    this.numberOfClients++
  }

  getByID = (id) => {
    let positionFound = this.#getClientPosInArray(id)

    if (!positionFound) return null

    return this.customers[positionFound]
  }

  delete = (id) => {
    const actualCustomers = [...this.customers]
    const filteredCustomers = actualCustomers.filter((client) => client.id !== parseInt(id))
    this.customers = [...filteredCustomers]
    this.numberOfClients = this.customers.length
  }

  getAll = () => {
    return this.customers
  }

  update = (id, client) => {
    let positionFound = this.#getClientPosInArray(id)
    if (!positionFound) return null
    client.id = id
    this.customers[positionFound] = client
    return true
  }

  #getClientPosInArray = (id) => {
    let pos = null

    for (let i = 0; i < this.numberOfClients; i++) {
      if (this.customers[i].id === parseInt(id)) {
        pos = i
        break
      }
    }

    return pos
  }
}

export { Customers }
