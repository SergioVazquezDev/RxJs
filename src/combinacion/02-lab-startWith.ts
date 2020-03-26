import { ajax } from "rxjs/ajax";
import { startWith } from "rxjs/operators";

// Referencias
// Creamos un loading
const loadingDiv = document.createElement("div");
loadingDiv.classList.add("loading"); // clase personalizada del style.css
loadingDiv.innerHTML = "Cargando...";

// Creamos la referencia al body
const body = document.querySelector("body");

// Stream
ajax
  .getJSON("https://reqres.in/api/users/2?delay=3")
  .pipe(
      // Antes de lanzar la peticion, marcamos en true para que aparezca el cargando
      startWith(true)
    ).subscribe(resp => {
    if (resp === true) { // Si está true, mostramos el loading
      body.append(loadingDiv);
    } else {
      document.querySelector(".loading").remove();
    }

    console.log(resp);
  });
