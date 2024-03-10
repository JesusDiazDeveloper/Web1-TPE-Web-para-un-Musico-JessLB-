"use strict";
document.addEventListener("DOMContentLoaded", iniciarTienda);

function iniciarTienda() {
  /*TIENDA*/
  

  const url = 'https://62b5c3ad42c6473c4b39c3af.mockapi.io/api/usuarios'; 
  let id = 0;
  let formOcultoContainer = document.querySelector("#formOcultoContainer");
  let nombreCarritoMod = document.querySelector("#nombreCarritoMod");
  let emailCarritoMod = document.querySelector("#emailCarritoMod");
  let productoCarritoMod = document.querySelector("#productoCarritoMod");

  document.querySelector(".tablaCarrito").addEventListener("submit", compraNueva);
  document.querySelector("#botonQuitarFormModificar").addEventListener("click", ocultarForm);

  async function eliminarItem() {
    console.log(`esta es el objeto con id ${this.id} y va a ser eliminada `);
    try {
      let resultado = await fetch(`${url}/${this.id}`, {
        method: "DELETE",
      });
      if (resultado.status === 200) {
        console.log(`item Elimnado!`);
        actualizarCarrito();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function ocultarForm() { 
    formOcultoContainer.classList.add("ocultoForm");
    nombreCarritoMod.value = '';
    emailCarritoMod.value = '';
    productoCarritoMod.value = '';
  }

function mostrarFormOculto(){
  formOcultoContainer.classList.remove("ocultoForm");
}
async function modificarItem() {
  
  let producto = productoCarritoMod.value;
  let nombreUsuario = nombreCarritoMod.value;
  let emailUsuario = emailCarritoMod.value;
  let cantidad = 1;
  let pedidoNuevo = {
    nombre: nombreUsuario,
    email: emailUsuario,
    producto: producto,
    cantidad: cantidad, 
  };

  try {
    let envioNuevo = await fetch(`${url}/${this.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pedidoNuevo),
    });
    if (envioNuevo.status === 200) {
      console.log("objeto MODIFICADO!");
      actualizarCarrito();
    }
  } catch (error) {
    console.log(error);
  }
}

  async function compraNueva(e) {
    e.preventDefault();
    let producto = document.querySelector("#productoCarrito").value;
    let nombreUsuario = document.querySelector("#nombreCarrito").value;
    let emailUsuario = document.querySelector("#emailCarrito").value;
    let cantidad = 1;
    let pedidoNuevo = {
      nombre: nombreUsuario,
      email: emailUsuario,
      producto: producto,
      cantidad: cantidad,
    };

    try {
      let envioNuevo = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedidoNuevo),
      });
      if (envioNuevo.status === 201) {
        console.log("objeto creado!");
        actualizarCarrito();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function actualizarCarrito() {
  
    let tablaCarritoDom = document.querySelector("#tablaCarritoREST");
    tablaCarritoDom.innerHTML = "";
    try {
      let respuesta = await fetch('https://62b5c3ad42c6473c4b39c3af.mockapi.io/api/usuarios?page=1&limit=10'); // guardo en una variable lo que recibo del fetch (fetch por defecto hace GET);
      let json = await respuesta.json(); // en la variable json guardo el objeto json que me devuelve el metodo .json (porque era un string, no un json cuando llega la respuesta)
      for (let item of json) {
        // ahora un forOf donde cada item sera 1 item del json
        tablaCarritoDom.innerHTML += ` 
            <tr class:"trCarrito">
                <td class="columnaCarrito1"">${item.nombre}</td>
                <td class="columnaCarrito2">${item.email}</td>
                <td class="columnaCarrito3">${item.cantidad}</td>
                <td class="columnaCarrito4">${item.producto}</td>
                <td class="columnaCarritoBotones">
                    <button type="button" id="${item.id}" class="btnEliminarProducto" value="eliminar"><i class="fa-solid fa-trash-can"></i></button>
                    <button type="button" id="${item.id}" class="btnModificarProducto" value="eliminar"> <i class="fa-solid fa-pen"></i> </i></button>
                </td>
            </tr>
            `;
      }
      
      let botonEliminar = document.querySelectorAll(".btnEliminarProducto");
      botonEliminar.forEach((e) => e.addEventListener("click", eliminarItem));
      let botonModificar = document.querySelectorAll(".btnModificarProducto");
      botonModificar.forEach((e) => e.addEventListener("click", mostrarFormOculto));
    } catch (error) {
      console.log(error);
    }
  }

  actualizarCarrito(); 
}
