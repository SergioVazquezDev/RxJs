import { ajax, AjaxError } from "rxjs/ajax";
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * OTRAS FORMAS DE REALIZAR PETICIONES AJAX:
 * - DELETE
 * - PUT
 * - POST
 * */

// ESTO ES UN API HECHO PARA REALIZAR PRUEBAS
const url = "https://httpbin.org/delay/1"; // con el delay 1 estamos indicando que tarda 1 seg
// const url = 'https://api.github.com/users?per_page=5';

// // Si queremos realizar un GET:
// ajax.get(url, {
// // Aqui irñia el objeto con la configuración de los Headers
// });

// Si queremos realizar un POST:
// El primer argumento sería la url, el segundo el Body y el tercero el Header
ajax.post(url, {
    id:1,
    nombre: 'Sergio'
}, {
    'mi-token': 'ABC123' // mi-token va entre comillas xq si no haría la operacion de restar de 'mi' el 'token' :)
}).subscribe(console.log);

// Si queremos realizar un PUT (sería exactamente igual que el POST):
// El primer argumento sería la url, el segundo el Body y el tercero el Header
ajax.put(url, {
    id:1,
    nombre: 'Sergio'
}, {
    'mi-token': 'ABC123' // mi-token va entre comillas xq si no haría la operacion de restar de 'mi' el 'token' :)
}).subscribe(console.log);

// Si queremos realizar un DELETE (el segundo argumento sería el header, no permite mandar Body, es un delete XD ):
// El primer argumento sería la url, el segundo el Body y el tercero el Header
ajax.delete(url, {
    'mi-token': 'ABC123' // mi-token va entre comillas xq si no haría la operacion de restar de 'mi' el 'token' :)
}).subscribe(console.log);


//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Hay otra forma en el caso que necesitemos mas dinamismo:

ajax({
  url: url,
  method: "POST", // el tipo de metodo se puede tener en una variable
  headers: {
    "mi-token": "ABC123"
  },
  body: {
    id: 1,
    nombre: "Sergio"
  }
}).subscribe(console.log);

ajax({
  url: url,
  method: "PUT",
  headers: {
    "mi-token": "ABC123"
  },
  body: {
    id: 1,
    nombre: "Sergio"
  }
}).subscribe(console.log);

// De esta forma, el DELETE no dará error
ajax({
  url: url,
  method: "DELETE",
  headers: {
    "mi-token": "ABC123"
  },
  body: {
    id: 1,
    nombre: "Sergio"
  }
}).subscribe(console.log);