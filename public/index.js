console.log("javascript funcionando");

const socketClient = io();

let user;

Swal.fire({
    title: 'Formulario perfil',
    html: `
    <input type="text" id="name" class="swal2-input" placeholder="Nombre">
    <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">
    <input type="text" id="age" class="swal2-input" placeholder="Edad">
    <input type="text" id="alias" class="swal2-input" placeholder="Alias">
    <input type="text" id="avatar" class="swal2-input" placeholder="urlAvatar">`,
    confirmButtonText: 'Iniciar',
    focusConfirm: false,
    preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const lastname = Swal.getPopup().querySelector("#lastname").value;
        const age = Swal.getPopup().querySelector("#age").value;
        const alias = Swal.getPopup().querySelector('#alias').value;
        const avatar = Swal.getPopup().querySelector('#avatar').value;
        if (!name || !lastname || !age || !alias || !avatar) {
            Swal.showValidationMessage(`Pro favor complete el formulario`);
        }
        return { name, lastname, age, alias, avatar }
    },
    allowOutsideClick: false
}).then((result) => {
    Swal.fire(`
    Nombre: ${result.value.name}
    Apellido: ${result.value.lastname}
    Edad: ${result.value.age}
    Alias: ${result.value.alias}
    Avatar: ${result.value.avatar}
    `.trim());
    // console.log(result.value);
    user = result.value;
});

const btMsj = document.getElementById("mensajear")
const campo = document.getElementById("messageField")
// crea un nuevo objeto `Date`
const today = new Date();
// obtener la fecha y la hora
let now //now = today.toLocaleString(); example:1/27/2020, 9:30:00 PM

//esquemas
const authorSchema = new normalizr.schema.Entity("authors",{}, {idAttribute:"alias"});
const messageSchema = new normalizr.schema.Entity("messages", {author: authorSchema});
const chatSchema = new normalizr.schema.Entity("chat", {
    messages:[messageSchema]
}, {idAttribute:"id"});

btMsj.addEventListener("click",(evt)=>{
    now = today.toLocaleString()
    socketClient.emit("message",{
        author:user,
        timestamp:now,
        message:campo.value
    })
    campo.value=""
})
campo.addEventListener("keydown",(evt)=>{
    // console.log(evt.key)
    now = today.toLocaleString()
    if(evt.key === "Enter"){
        // console.log(campo.value)
        socketClient.emit("message",{
            author:user,
            text:chatInput.value,
            timestamp: new Date().toLocaleString(),
        })
        campo.value=""
    }
})

const messageContainer = document.getElementById("messageContainer");
console.log(messageContainer)

socketClient.on("historico",(data)=>{
    //de-normalizar
    const normalData = normalizr.denormalize(data.result,chatSchema,data.entities);
    //nivel de reduccion
    let compresion = parseInt(100 - (100 * JSON.stringify(normalData,null,"\t").length / JSON.stringify(data,null,"\t").length))
    // console.log("data;",JSON.stringify(data,null,"\t").length)
    // console.log("normalData:",JSON.stringify(normalData,null,"\t").length)
    let elementos="";
    idProd = 0
    normalData.messages.forEach(msj=>{
        elementos = elementos + `<p><span style="color:blue"><strong>${msj.author.alias}</strong><span/>
        <span style="color:brown">${msj.timestamp}<span/> : <span style="color:green"><i>${msj.message}<i><span/></p>`;
    });
    // console.log(elementos)
    messageContainer.innerHTML = `<h3 style="color:red">Compresion: <i>${compresion} % <i></h3>` + elementos;
})

socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario conectado",
        toast:true
    })
})

const table = document.getElementById("table");
console.log(table)

socketClient.on("productos",(data)=>{
    let elementos=""
    // debugger
    data.forEach(item=>{
        elementos = elementos + 
       `<tr>
        <th scope='row'>${item.id}</th>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>
            <img src=${item.thumbnail} alt='' width='50' />
        </td>
        </tr>`
    });
    // console.log(elementos)
    table.innerHTML = elementos
})

const SubmitBtn = document.getElementById("SubmitBtn")
const title = document.getElementById("title")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")

SubmitBtn.addEventListener("click",(evt)=>{
    // console.log(SubmitBtn.value)
    evt.preventDefault()
    socketClient.emit("alta",  {
        "title": title.value,
        "price": price.value,
        "thumbnail": thumbnail.value
    })
})