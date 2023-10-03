const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

/*✔ 4. Carga Dinámica de Elementos:
Modificar la página de inicio (Home.html) para cargar dinámicamente los productos desde una estructura de datos en JavaScript, sin utilizar librerías o frameworks adicionales.
Los productos deben incluir al menos una imagen, un nombre, una descripción y un precio.
Utilizar eventos y funciones en JavaScript para lograr esta carga dinámica. */

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => { fetchData() });
items.addEventListener('click', e => { addToCart(e) });
//items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('products.json');
    const data = await res.json()
    console.log(data)
    createCards(data)
}

//Pintar productos
const createCards = data =>{
  data.forEach(item => {
    console.log(item)
    templateCard.querySelector('img').setAttribute("src", item.image)
    templateCard.querySelector('h4').textContent = item.name
    templateCard.querySelector('h5').textContent = item.price
    templateCard.querySelector('p').textContent = item.description
    templateCard.querySelector('button').dataset.id = item.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
}

//Agregar productos al carrito
const addToCart = e => {
  console.log(e.target)
}