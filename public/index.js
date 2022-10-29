console.log("javascript funcionando");

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