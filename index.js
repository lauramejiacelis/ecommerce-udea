const products = document.getElementById('products')
const items = document.getElementById('items')
const prices = document.getElementById('prices')
const templateCard = document.getElementById('template-card').content
const templateCart = document.getElementById('template-cart').content
const templatePrices = document.getElementById('template-prices').content
const fragment = document.createDocumentFragment()
let cart = {};

/*✔ 4. Carga Dinámica de Elementos:
Modificar la página de inicio (Home.html) para cargar dinámicamente los productos desde una estructura de datos en JavaScript, sin utilizar librerías o frameworks adicionales.
Los productos deben incluir al menos una imagen, un nombre, una descripción y un precio.
Utilizar eventos y funciones en JavaScript para lograr esta carga dinámica. */

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => { fetchData() });
products.addEventListener('click', e => { addToCart(e) });
//products.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('products.json');
    const data = await res.json()
    //console.log(data)
    createCards(data)
}

//Pintar productos
const createCards = data =>{
  data.forEach(product => {
    //  console.log(product)
    templateCard.querySelector('img').setAttribute("src", product.image)
    templateCard.querySelector('h4').textContent = product.name
    templateCard.querySelector('h5').textContent = product.price
    templateCard.querySelector('p').textContent = product.description
    templateCard.querySelector('button').dataset.id = product.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  products.appendChild(fragment)
}

//Agregar productos al carrito
const addToCart = e => {
  //console.log(e.target)
  //console.log(e.target.classList.contains('btn-warning'))
  if(e.target.classList.contains('btn-warning')){
    setCart(e.target.parentElement)
  }
}

const setCart = (obj) =>{
  console.log(obj)
  const product= {
    id: obj.querySelector('.btn-warning').dataset.id,
    name: obj.querySelector('h4').textContent,
    price: obj.querySelector('h5').textContent,
    quantity: 1
  }

  if(cart.hasOwnProperty(product.id)){
    product.quantity= cart[product.id].quantity + 1
  }

  cart[product.id] = {...product}

  paintCart()
}

const paintCart = () =>{
  console.log(cart)
  Object.values(cart).forEach(product=>{
    templateCart.querySelector('th').textContent = product.id
  })
}