import productsList from "./productsList.js"

const renderCart = document.getElementById('renderCart')
const products = document.getElementById('products')
const itemsOnCart = document.getElementById('itemsOnCart')
const cartFooter = document.getElementById('cart-footer')
const templateCard = document.getElementById('template-card').content
const templateCart = document.getElementById('template-cart').content
const templateCartFooter = document.getElementById('template-cart-footer').content
const fragment = document.createDocumentFragment()
let cart = {};

/* 
3. Gestión de Inventarios:
✔Crear un sistema de inventario sencillo que almacene la cantidad disponible de cada producto.
✔Cuando un producto se agrega al carrito, la cantidad disponible debe reducirse.
✔Cuando un producto se elimina del carrito, la cantidad disponible debe aumentar.
4. Carga Dinámica de Elementos:
✔Modificar la página de inicio (Home.html) para cargar dinámicamente los productos desde una estructura de datos en JavaScript, sin utilizar librerías o frameworks adicionales.
✔Los productos deben incluir al menos una imagen, un nombre, una descripción y un precio.
✔Utilizar eventos y funciones en JavaScript para lograr esta carga dinámica. */

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => { createCards(productsList) });
products.addEventListener('click', e => { addToCart(e) });
itemsOnCart.addEventListener('click', e => { btnAddDecrease(e) })

// Traer productos
console.log(productsList)
//createCards(productsList)

//Pintar productos
const createCards = data =>{
  data.forEach(product => {
    //console.log(product)
    templateCard.querySelector('img').setAttribute("src", product.image)
    templateCard.querySelector('h4').textContent = product.name
    templateCard.getElementById('count-in-stock').textContent = product.countInStock
    templateCard.querySelector('span').textContent = product.price
    templateCard.getElementById('description').textContent = product.description
    templateCard.querySelector('button').dataset.id = product.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  products.appendChild(fragment)
}

/* 1. Carrito de Compras:
✔Agregar un carrito de compras a la página Home.html (Página de Inicio de Usuario Registrado).
✔El carrito de compras debe mostrar los productos que el usuario ha seleccionado para comprar.
✔Permitir que los usuarios añadan productos al carrito, actualicen las cantidades y eliminen productos del carrito.
✔Mostrar el precio total de los productos en el carrito.
✔Agregar un botón Comprar que permita a los usuarios finalizar la compra (sin implementar la funcionalidad de pago real). */

//Agregar productos al carrito
const addToCart = e => {
  products.parentElement.classList.remove('col')
  products.parentElement.classList.add('col-md-8')
  renderCart.classList.remove('d-none')
  //console.log(templateCard.firstElementChild)
  products.firstElementChild.classList.remove('col-xl-3')
  products.firstElementChild.classList.remove('col-lg-4')
  products.firstElementChild.classList.remove('col-sm-12')
  
  //console.log(e.target)
  //console.log(e.target.classList.contains('btn-warning'))
  if(e.target.classList.contains('btn-warning')){
    setCart(e.target.parentElement.parentElement)
    //console.log(e.target.parentElement.parentElement)
    //console.log(e.target.parentElement.parentElement.querySelector('img').getAttribute("src"))
  }
}

//Empujar el objeto al carrito
const setCart = (obj) =>{
  //console.log(obj)
  const product= {
    id: obj.querySelector('.btn-warning').dataset.id,
    img: obj.querySelector('img').getAttribute("src"),
    name: obj.querySelector('h4').textContent,
    price: parseInt(obj.querySelector('span').textContent),
    quantity: 1,
    countInStock: parseInt(obj.querySelector('#count-in-stock').textContent)-1
  }
  //Incrementa la cantidad del producto cuando ya existe y la saca del inventario
  console.log(cart.hasOwnProperty(product.id))
  if(cart.hasOwnProperty(product.id)){
    console.log(cart.hasOwnProperty(product.id))
    product.quantity= cart[product.id].quantity + 1
    product.countInStock= cart[product.id].countInStock - 1
    productsList[product.id].countInStock -= 1 //manejo de inventario
  }

  cart[product.id] = {...product}

  //aquí cuando el product.id = id del productList restar al count in stock (inventarios)
  productsList.find((element)=> {
    if(element.id === product.id){
      element.countInStock = element.countInStock - 1
      console.log(element)
    }
  })
  console.log(productsList)
  createCards(productsList)

  paintCart()
}

//Pintar el carrito
const paintCart = () =>{
  console.log(cart)
  itemsOnCart.innerHTML = ''
  Object.values(cart).forEach(product=>{
    templateCart.querySelector('img').setAttribute("src", product.img)
    templateCart.getElementById('cart-item-name').textContent = product.name
    templateCart.getElementById('cart-item-qty').textContent = product.quantity
    templateCart.getElementById('addProducts').dataset.id = product.id
    templateCart.getElementById('substractProducts').dataset.id = product.id
    templateCart.getElementById('cart-item-price').textContent = (product.quantity * product.price).toLocaleString("es")
    templateCart.getElementById('count-in-stock-cart').textContent = product.countInStock

    const clone = templateCart.cloneNode(true)
    fragment.appendChild(clone)
  })
  itemsOnCart.appendChild(fragment)

  paintCartFooter()
}

//Pintar los totales del carrito
const paintCartFooter = ()=> {
  cartFooter.innerHTML = ''
  if (Object.keys(cart).length === 0){
    cartFooter.innerHTML= `
      <div>Carrito vacío - comience a comprar!</div>
    `
    return
  }
  const totalQuantity = Object.values(cart).reduce((acc, {quantity})=> acc+quantity, 0)
  
  const totalPrice = Object.values(cart).reduce((acc, {quantity,price})=> acc + quantity * price, 0)
  
  templateCartFooter.getElementById('total-items-qty').textContent = totalQuantity
  templateCartFooter.getElementById('total-cart-price').textContent = totalPrice.toLocaleString("es")

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
  console.log(e.target.parentElement)
  if(e.target.parentElement.id === 'addProducts'){
    console.log(cart[e.target.parentElement.dataset.id])
    const product = cart[e.target.parentElement.dataset.id]
    product.quantity++
    product.countInStock--
    cart[e.target.parentElement.dataset.id] = {...product}
    paintCart()
  }

  if(e.target.parentElement.id === 'substractProducts'){
    console.log(cart[e.target.parentElement.dataset.id])
    const product = cart[e.target.parentElement.dataset.id]
    product.quantity--
    product.countInStock++
    if(product.quantity === 0){
      delete cart[e.target.parentElement.dataset.id]
    }
    paintCart()
  }

  e.stopPropagation()
}