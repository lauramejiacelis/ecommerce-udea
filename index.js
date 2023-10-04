const products = document.getElementById('products')
const items = document.getElementById('items')
const cartFooter = document.getElementById('cart-footer')
const templateCard = document.getElementById('template-card').content
const templateCart = document.getElementById('template-cart').content
const templateCartFooter = document.getElementById('template-cart-footer').content
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
items.addEventListener('click', e => { btnAddDecrease(e) })

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

//Crear el carrito
const setCart = (obj) =>{
  console.log(obj)
  const product= {
    id: obj.querySelector('.btn-warning').dataset.id,
    name: obj.querySelector('h4').textContent,
    price: parseInt(obj.querySelector('h5').textContent),
    quantity: 1
  }

  if(cart.hasOwnProperty(product.id)){
    product.quantity= cart[product.id].quantity + 1
  }

  cart[product.id] = {...product}

  paintCart()
}

//Pintar el carrito
const paintCart = () =>{
  console.log(cart)
  items.innerHTML = ''
  Object.values(cart).forEach(product=>{
    templateCart.querySelector('th').textContent = product.id
    templateCart.querySelectorAll('td')[0].textContent = product.name
    templateCart.querySelectorAll('td')[1].textContent = product.quantity
    templateCart.querySelector('.btn-info').dataset.id = product.id
    templateCart.querySelector('.btn-danger').dataset.id = product.id
    templateCart.querySelector('span').textContent = product.quantity * product.price


    const clone = templateCart.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)

  paintCartFooter()
}

//Pintar los totales del carrito
const paintCartFooter = ()=> {
  cartFooter.innerHTML = ''
  if (Object.keys(cart).length === 0){
    cartFooter.innerHTML= `
      <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
    return
  }
  const totalQuantity = Object.values(cart).reduce((acc, {quantity})=> acc+quantity, 0)
  
  const totalPrice = Object.values(cart).reduce((acc, {quantity,price})=> acc + quantity * price, 0)
  
  templateCartFooter.querySelectorAll('td')[0].textContent = totalQuantity
  templateCartFooter.querySelector('span').textContent = totalPrice

  const clone = templateCartFooter.cloneNode(true)
  fragment.appendChild(clone)
  cartFooter.appendChild(fragment)

  const btnEmptyCart = document.getElementById("empty-cart")
  btnEmptyCart.addEventListener('click', ()=>{
    cart= {}
    paintCart()
  })
}

//Botones dentro del carrito 
const btnAddDecrease = e => {
  //console.log(e.target)
  if(e.target.id === 'addProducts'){
    console.log(cart[e.target.dataset.id])
    const product = cart[e.target.dataset.id]
    product.quantity++
    cart[e.target.dataset.id] = {...product}
    paintCart()
  }

  if(e.target.id === 'substractProducts'){
    console.log(cart[e.target.dataset.id])
    const product = cart[e.target.dataset.id]
    product.quantity--
    if(product.quantity === 0){
      delete cart[e.target.dataset.id]
    }
    paintCart()
  }

  e.stopPropagation()
}