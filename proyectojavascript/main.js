//Bienvenida al cliente y logueo al sistema

const usuarios = {
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

// Catálogo de productos con su código, nombre, precio y stock disponible

const productos = [
  { codigo: 1 , nombre: "Pan integral", precio: 5000, stock: 10 },
  { codigo: 2 , nombre: "Chipa x6", precio: 2500, stock: 25 },
  { codigo: 3 , nombre: "Albondigas de Berenjena x6", precio: 3500, stock: 5 },
  { codigo: 4 , nombre: "Albondigas de Pollo x6", precio: 4500, stock: 8 },
  { codigo: 5 , nombre: "Empanadas de Verdura x6" , precio: 6000, stock: 12 },
  { codigo: 6 , nombre: "Empanadas de Bondiola x6" , precio: 7000, stock: 7 }
];

//Función para control de stock

function controlarStock(codigo, cantidad) {
  
  for (let i = 0; i < productos.length; i++) {
    
    if (productos[i].codigo === codigo) {
      
      if (productos[i].stock >= cantidad) {
        productos[i].stock = productos[i].stock - cantidad;
        
        alert(`✅ ¡Compra realizada!`);
        
        return `✅ Compra realizada de ${productos[i].nombre}. Nuevo stock: ${productos[i].stock}.`;
       
      } else {
        
        alert(`❌ No hay suficiente stock. Solo quedan ${productos[i].stock} unidades.`);
        return `❌ No hay stock suficiente de ${productos[i].nombre}. Quedan ${productos[i].stock}.`;
      }
    }
  }
  alert("❌ El código de producto ingresado no existe.");
  return "❌ El código de producto ingresado no existe.";
}


const codigo = Number(prompt("Ingresa el código del producto que deseas comprar (1-6):"));
const cantidad = Number(prompt("¿Cuántos necesitás?"));


const mensaje = controlarStock(codigo, cantidad);


console.log(mensaje);








