import { ajax } from "rxjs/ajax";

/**
 * AJAX  /  GET JSON
 *
 * Es una forma mas corta de ejecutar una peticion HTTP y obtener la informacion
 * */

// ESTO ES UN API HECHO PARA REALIZAR PRUEBAS
const url = "https://httpbin.org/delay/1"; // con el delay 1 estamos indicando que tarda 1 seg
// const url = 'https://api.github.com/users?per_page=5';

const obs$ = ajax.getJSON(url, {
    // si necesitamos mandar Header, token, lo podemos configurar como un segundo argumento
  "Content-Type": "application/json",
  "mi-token": "ABC123"
});

obs$.subscribe(data => console.log("data:", data));

