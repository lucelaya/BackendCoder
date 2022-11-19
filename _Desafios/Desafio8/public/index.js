console.log("javascript funcionando");

const socketClient = io();

let user;

// Swal.fire({
//     title:"Hola usuario",
//     text:"Bienvenido, ingresa tu Mail",
//     input:"text",
//     allowOutsideClick:false
// }).then(respuesta=>{
//     // console.log(respuesta)
//     user = respuesta.value;
// });
// Ejemplo validacion de login:
// Swal.fire({
//     title: 'Login Form',
//     html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
//     <input type="password" id="password" class="swal2-input" placeholder="Password">`,
//     confirmButtonText: 'Sign in',
//     focusConfirm: false,
//     preConfirm: () => {
//       const login = Swal.getPopup().querySelector('#login').value
//       const password = Swal.getPopup().querySelector('#password').value
//       if (!login || !password) {
//         Swal.showValidationMessage(`Please enter login and password`)
//       }
//       return { login: login, password: password }
//     }
//   }).then((result) => {
//     Swal.fire(`
//       Login: ${result.value.login}
//       Password: ${result.value.password}
//     `.trim())
//   })
Swal.fire({
    title: 'Bienvenido, ingrese su Mail',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Su Mail = Su Usuario">`,
    confirmButtonText: 'Ingresar',
    focusConfirm: false,
    preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        if (!login) {
            Swal.showValidationMessage(`Por favor, ingresa tu Mail`)
        }
        return {user: login}
    }
}).then((result) => {
    user = result.value.user
    Swal.fire(`Usuario: ${result.value.user}`.trim())
})

const btMsj = document.getElementById("mensajear")
const campo = document.getElementById("messageField")
// crea un nuevo objeto `Date`
const today = new Date();
// obtener la fecha y la hora
let now //now = today.toLocaleString(); example:1/27/2020, 9:30:00 PM

btMsj.addEventListener("click",(evt)=>{
    now = today.toLocaleString()
    socketClient.emit("message",{
        username:user,
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
            username:user,
            timestamp:now,
            message:campo.value
        })
        campo.value=""
    }
})

const messageContainer = document.getElementById("messageContainer");
console.log(messageContainer)

socketClient.on("historico",(data)=>{
    let elementos="";
    idProd = 0
    data.forEach(item=>{
        elementos = elementos + `<p><span style="color:blue"><strong>${item.username}</strong><span/> <span style="color:brown">${item.timestamp}<span/> : <span style="color:green"><i>${item.message}<i></p>`;
    });
    // console.log(elementos)
    messageContainer.innerHTML = elementos;
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