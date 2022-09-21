class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `Nombre Completo del Usuario: ${this.nombre} ${this.apellido}`
    }
    countMascotas(){
        return `Cantidad de mascotas: ${this.mascotas.length}`
    }
    addBook(nombre, autor){
        const newBook = {nombre: nombre, autor: autor};
        // console.log(newBook);
        this.libros.push(newBook);
        return `Se agrego el libro: ${newBook.nombre}`
    }
    // getBookNames(){
    //     console.log("--Lista de Libros del Usuario:")
    //     this.libros.forEach((libro)=>{console.log(libro.nombre)})
    //     console.log("--fin lista de libros del usuario")
    // }
    //Otra forma de recorrer un array o de filtrar info de un array a otro
    getBookNames(){
        let coleccion = this.libros
        let nombre = [];
        coleccion.map(libro=>{
            nombre.push(libro.nombre)
        })
        return `Mi coleccion de Libros: ${nombre}`
    }
}

const usuario1 = new Usuario("Lucas", "Celaya", [{nombre:"Retratos", autor:"Pablo Bernasconi"}], ["perro", "gato", "pez"]);
console.log(usuario1)
console.log(usuario1.getFullName())
console.log(usuario1.countMascotas())
console.log(usuario1.addBook("Harry Potter y el Prisionero de Azcaban","J.K Rowling"))
console.log(usuario1.getBookNames())
console.log(usuario1)