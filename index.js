import products from './products.js'
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

/* Carga Dináamica de Elementos:
Modificar la página de inicio (Home.html) para cargar dinámicamente los productos desde una estructura de datos en JavaScript, sin utilizar librerías o frameworks adicionales.
Los productos deben incluir al menos una imagen, un nombre, una descripción y un precio.
Utilizar eventos y funciones en JavaScript para lograr esta carga dinámica. */

const productList = (data) =>{
  console.log(data)
  data.forEach(item => {
    templateCard.querySelector('h4').textContent = item.name
    templateCard.querySelector('p').textContent = item.price
    templateCard.querySelector('button').dataset.id = item._id
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  cards.appendChild(fragment)
}

productList(products)