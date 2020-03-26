import { fromEvent, of } from "rxjs";
import { tap, map, mergeMap, pluck, catchError, switchMap, exhaustMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// Reqres.in - Sitio - web para hacer pruebas -> https://reqres.in/

// Helper (funcion auxiliar)
const peticionHttpLogin = userPass => // recibe un objeto con el email y el password
  ajax.post("https://reqres.in/api/login?delay=1", userPass).pipe( // post(url, body)
    pluck("response", "token"), // nos quedamos solo con el token de la respuesta
    catchError(err => of("xxx")) // controlamos el error (ya que es un servicio que no controlamos :) )
  );

// creamos un formulario
const form = document.createElement("form");
const inputEmail = document.createElement("input");
const inputPass = document.createElement("input");
// Boton de submit
const submitBtn = document.createElement("button");

// Configuraciones a los campos del formulario
inputEmail.type = "email";
inputEmail.placeholder = "Email";
inputEmail.value = "eve.holt@reqres.in"; // para no tener que estar escribiendolo para las pruebas

inputPass.type = "password";
inputPass.placeholder = "Password";
inputPass.value = "cityslicka"; // para no tener que estar escribiendolo para las pruebas

submitBtn.innerHTML = "Ingresar";

// ingresamos los elementos en el formulario
form.append(inputEmail, inputPass, submitBtn);
// añadimos el formulario al body
document.querySelector("body").append(form);

// Streams
// Vamos a eliminar el refresco que hace cuando se lanza el submit (da sensacion de sitio viejo)
const submitForm$ = fromEvent<Event>(form, "submit").pipe(
  // observamos el submit del form
  tap(ev => ev.preventDefault()), // dispara un efecto secundario con el preventDefault
  map(ev => ({
    // del formulario queremos que salga un objeto con los valores de email y passord de los input
    email: ev.target[0].value,
    password: ev.target[1].value
  })),
  // Si nos vamos a 'Network' en Chrome y hacemos 5 click seguidos en 'ingresar'
  //  mergeMap(peticionHttpLogin) // Las 5 peticiones se disparan. Puede tener cualquier cantidad de subcripciones internas activas simultaneamente
  //  switchMap(peticionHttpLogin) // Las 5 subcripciones internas se disparan, pero por cada nueva cancela la anterior y por tanto solo emite la ultima
  exhaustMap(peticionHttpLogin) // Solo una de las peticiones se disparó. Aunque pulsé 5 veces el resto fueron ignoradas
);

submitForm$.subscribe(token => {
  console.log(token); // lo ideal es recibir un token, por lo que podemos imprimirlo por consola
});
