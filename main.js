//Bienvenida al cliente y logueo al sistema

/*const usuarios = {
  "MarceloF": "pass123",
  "TutoraEuge": "segura456",
  "Belensoyyo": "galletas888",
};

let nombreUsuario = prompt("Ingresá tu usuario");
let contraseñaUsuario = prompt("Ingresá tu contraseña");

while (!usuarios[nombreUsuario] || usuarios[nombreUsuario] !== contraseñaUsuario) {
  
  console.log("Datos ingresados incorrectos");
  alert("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");

  nombreUsuario = prompt("Ingresá tu usuario nuevamente");
  contraseñaUsuario = prompt("Ingresá tu contraseña nuevamente");
}

console.log("El usuario", nombreUsuario, "ha ingresado a la página.");
alert("¡Bienvenid@ " + nombreUsuario + " al universo de Dama Peca!");
*/
// Catálogo de productos con su código, nombre, precio y stock disponible
const productos = [
    { id: 1, nombre: 'Pan Integral', precio: 5000, stock: 10, img: 'images/pan-integral.jpg' },
    { id: 2, nombre: 'Chipa x6', precio: 2500, stock: 25, img: 'images/chipa.jpg' },
    { id: 3, nombre: 'Albóndigas Berenjena x6', precio: 3500, stock: 5, img: 'images/albondigas-berenjena.jpg' },
    { id: 4, nombre: 'Albóndigas Pollo x6', precio: 4500, stock: 8, img: 'images/albondigas-pollo.jpg' },
    { id: 5, nombre: 'Empanadas de Verdura x6', precio: 6000, stock: 12, img: 'images/empanadas-verdura.jpg' },
    { id: 6, nombre: 'Empanadas de Bondiola x6', precio: 7000, stock: 7, img: 'images/empanadas-bondiola.jpg' },
    { id: 7, nombre: 'Empanadas de Pollo x6', precio: 7000, stock: 7, img: 'images/empanadas-pollo.jpg' },
    { id: 8, nombre: 'Empanadas de Osobuco x6', precio: 7000, stock: 7, img: 'images/empanadas-osobuco.jpg' }
];

// DOM
const productList = document.getElementById('product-list');
const cartButton = document.querySelector('.cart-button');
const cartModal = document.getElementById('cart-modal');
const closeModalButton = document.querySelector('.close-button');
const cartCount = document.querySelector('.cart-count');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function renderizarProductos() {
    productList.innerHTML = ''; 
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toLocaleString('es-AR')}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="add-to-cart-button" data-id="${producto.id}">Añadir al carrito</button>
            </div>
        `;
        productList.appendChild(card);
    });
}


function agregarAlCarrito(e) {
    if (e.target.classList.contains('add-to-cart-button')) {
        const productoId = parseInt(e.target.dataset.id);
        const productoSeleccionado = productos.find(p => p.id === productoId);
        
       
        if (productoSeleccionado.stock > 0) {
            const productoEnCarrito = carrito.find(p => p.id === productoId);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({ ...productoSeleccionado, cantidad: 1 });
            }
            
            
            productoSeleccionado.stock--;
            
            guardarCarritoEnStorage();
            actualizarCarritoDOM();
            renderizarProductos(); 
            
            
            console.log(`✅ ¡Producto añadido! Nuevo stock de ${productoSeleccionado.nombre}: ${productoSeleccionado.stock}`);

        } else {
            
            console.warn(`❌ No hay stock suficiente para ${productoSeleccionado.nombre}.`);
        }
    }
}


function eliminarDelCarrito(e) {
    if (e.target.classList.contains('remove-item-btn')) {
        const productoId = parseInt(e.target.dataset.id);
        const productoEnCarrito = carrito.find(p => p.id === productoId);
        
        
        const productoOriginal = productos.find(p => p.id === productoId);
        productoOriginal.stock += productoEnCarrito.cantidad;
        
        carrito = carrito.filter(p => p.id !== productoId);
        
        guardarCarritoEnStorage();
        actualizarCarritoDOM();
        renderizarProductos(); 
    }
}


function actualizarCarritoDOM() {
    cartList.innerHTML = '';
    let total = 0;
    
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <span>${producto.nombre} x${producto.cantidad}</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</span>
            </div>
            <button class="remove-item-btn" data-id="${producto.id}">Eliminar</button>
        `;
        cartList.appendChild(li);
        total += producto.precio * producto.cantidad;
    });
    
    cartCount.textContent = carrito.length > 0 ? carrito.reduce((acc, curr) => acc + curr.cantidad, 0) : 0;
    cartTotal.textContent = `$${total.toLocaleString('es-AR')}`;
}


function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarritoDOM();
});

productList.addEventListener('click', agregarAlCarrito);
cartList.addEventListener('click', eliminarDelCarrito);

cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});