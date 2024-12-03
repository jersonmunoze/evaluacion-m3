// Jerson Muñoz Espinoza - Evaluación Modulo 3
// Clase producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
};
// Clase carrito
class Carrito {
    constructor() {
        this.arreglo = [];
    }
    agregarProducto(producto) {
        this.arreglo.push(producto);
    }
};

// Función para agregar productos al carrito por opción seleccionada
function agregarProductosCarrito(carrito, opcion, cantidad) {
    let producto;
    switch (opcion) {
        case 1:
            producto = new Producto('Leche', 1000);
            break;
        case 2:
            producto = new Producto('Pan de Molde', 2000);
            break;
        case 3:
            producto = new Producto('Queso', 1200);
            break;
        case 4:
            producto = new Producto('Mermelada', 890);
            break;
        case 5:
            producto = new Producto('Azúcar', 1300);
            break;
        default:
            alert('El producto ingresado no es válido');
            break;
    }
    //Bucle for para incorporar la cantidad de productos que indicó el usuario
    for (let i = 0; i < cantidad; i++) {
        carrito.agregarProducto(producto);
    }
    alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`)
}

//Función para calcular el total de la compra y retornar el resultado
function calcularTotalCompra(carrito) {
    return carrito.arreglo.reduce((total, producto) => total + producto.precio, 0);
}

//Función para mostrar detalles de la compra por consola
function mostrarDetallesCompra(carrito) {
    console.log('Detalles de la compra:');
    //Filtra los productos, obteniendo los nombres de cada producto del carrito una única vez
    let productosFiltrados = carrito.arreglo.filter((producto, index, arr) => {
        let indexObjeto = arr.findIndex((x) => x.nombre === producto.nombre);
        return indexObjeto === index;
    });
    //Por cada producto, obtiene la cantidad de productos y total por cada uno
    productosFiltrados.forEach(producto => {
        let cantidadProductos = carrito.arreglo.filter(x => x.nombre === producto.nombre).length;
        let totalPorCantidad = cantidadProductos * producto.precio;
        console.log(`Producto: ${producto.nombre}, precio: ${producto.precio}, cantidad: ${cantidadProductos}, total: $${totalPorCantidad}`);
    });
    console.log(`Total final de compra: $${calcularTotalCompra(carrito)}`);
}

//Función para que usuario indique si continuará agregando productos retorna true cuando el resultado es n y finalizará la compra
function continuarCompra() {
    let resultado = prompt('¿Deseas seguir agregando productos? (s/n)').toLowerCase();
    //while para que el resultado siempre sea s o n
    while (resultado !== 'n' && resultado !== 's') {
        alert('Debe ingresar un valor válido (s/n)');
        resultado = prompt('¿Deseas seguir agregando productos? (s/n)').toLowerCase();
    }
    //Verifica que usuario no quiere agregar más productos
    return resultado === 'n';
}
//Función que finaliza la compra y muestra el resumen final usando las funciones ya creadas
function finalizarCompra(carrito) {
    let totalCompra = calcularTotalCompra(carrito);
    alert(`Total de la compra $${totalCompra}`);
    mostrarDetallesCompra(carrito);
}

//Inicia ejecución código
//Inicialización de carrito
const carrito = new Carrito();

let compraFinalizada = false;

do {
    alert('Productos disponibles:\n1.- Leche $1000\n2.- Pan de Molde $2000\n3.- Queso $1200\n4.- Mermelada $890\n5.- Azúcar $1300');
    let numeroProducto = parseInt(prompt('Ingresa el número del producto que deseas agregar al carrito:'));
    if (isNaN(numeroProducto) || numeroProducto <= 0 || numeroProducto > 5) {
        alert('El producto ingresado no es válido, ingrese una opción válida');
        continue;
    }
    let cantidad = parseInt(prompt('Ingresa la cantidad de unidades:'));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('La cantidad ingresada no es válida, porfavor ingresar una cantidad nuevamente');
        continue;
    }

    agregarProductosCarrito(carrito, numeroProducto, cantidad);

    compraFinalizada = continuarCompra();
} while (!compraFinalizada);

finalizarCompra(carrito);
