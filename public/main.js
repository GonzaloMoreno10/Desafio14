const socket = io.connect('http://localhost:8080', { forceNew: true });

// Cuando arrancamos pedimos la data que hay actualmente enviando un socket
socket.emit('askProducts');
socket.emit('askMensajes');
let f = new Date();

function sendProduct(e) {
    let fecha = f.getDay() + "/" + f.getMonth() + "/" + f.getFullYear() + " - " + f.getHours() + ":" + f.getMinutes();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    let objeto = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    socket.emit('productos', objeto);
    socket.emit('mensajes', {email:"boot",fecha:fecha,texto:"Se cargo un nuevo producto"});
}

function sendMensaje(e) {
  
  let email = document.getElementById('email').value;
  let fecha = f.getDay() + "/" + f.getMonth() + "/" + f.getFullYear() + " - " + f.getHours() + ":" + f.getMinutes();
  let texto = document.getElementById('texto').value;
  let objeto = {
      email: email,
      fecha: fecha,
      texto: texto
  }
  socket.emit('mensajes', objeto);
}

function renderProducts(data) {
    let cuerpo = document.getElementById('cuerpo');
    let newElement = document.createElement('tr');
    let htmlProducto = `
    <td>${data.title}</td>
    <td>${data.price}</td>
    <td>
      <div class='text-center wd-100'>
        <div
          class='card'
          style='width: 4rem; margin-left: auto; margin-right: auto;'
        >
          <img
            src='${data.thumbnail}'
            class='card-img-top mx-auto d-block'
            alt='...'
          />
        </div>
      </div>
    </td>
    `;
  newElement.innerHTML = htmlProducto;
  cuerpo.appendChild(newElement);
};

socket.on('productos', function (data) {
    document.getElementById('cuerpo').innerHTML = ""

    for(let i in data){
      renderProducts(data[i]);
    }
});

function renderMensaje(data) {
  let caja = document.getElementById('caja');
  let newElement = document.createElement('p');
  let htmlMensaje = `
   <strong style="color:blue">${data.email} </strong>  <small style="color:red"> ${data.fecha} </small> <em style="color:green"> ${data.texto} <em>`;
  newElement.innerHTML = htmlMensaje;
  caja.appendChild(newElement);
};

socket.on('mensajes', function (data) {
  document.getElementById('caja').innerHTML = ""
  for(let i in data){
    renderMensaje(data[i]);
  }
});