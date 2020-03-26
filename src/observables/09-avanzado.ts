// Cuando lo importamos directamente de rxjs significa que son funciones para crear observables o algun tipo de tipado para los observables
import { of, from } from "rxjs";

/**
 * OF
 * Toma argumentos y genera una secuencia de valores
 *
 * FROM
 * Crea un observable a partir de un array, promise, iterable, observable netre otras cosas
 * Puede trabajar con las funciones generadoras o iterables de JS
 * */

const observer = {
  next: value => console.log("next: ", value),
  complete: () => console.info("completado")
};

//const source$ = from([1,2,3,4,5]);
//const source$ = of(...[1, 2, 3, 4, 5]);
//const source$ = from('Sergio');

// Vamos a mandar una promesa utilizando el fetch.
// Fetch es una funcion de JS que permite realizar una peticion http y traer la informacion a esa peticion
const source$ = from(fetch("https://api.github.com/users/sergiovazquezdev"));

//source$.subscribe(observer);

// source$.subscribe(async (resp) => {
//     // console.log(resp.ok);
//     console.log(resp);

//     // la data esta en el body en otra promesa, para llegar hasta ella aádimos async await
//     const dataResp = await resp.json();
//     console.log(dataResp);
// });

// RX tiene su propia forma para trabajar con las peticiones Ajax,
// no es necesario el fetch, pero se puede hacer tambien de era manera.

// Creamos nuestra funcion generadora (el asterisco nos dice que es una funcion generadora)
// Esta funcion emitirá cada uno de estos valores cada vez que se solicite el siguiente valor.
const miGenerador = function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const miIterable = miGenerador();

// podemos obtener los valores mediante un for de miIterable
// for (let id of miIterable) {
//     console.log(id);
// }

// Usaremos el from para hacer los mismo que el for
// Pero con una ventaja, al ser un observable, nos permite trabajar con operadores,
// transformar la data y el flujo de información y hacerlo de manera secuencial y mas claro
from(miIterable).subscribe(observer);



// Mozilla-MDN-Funciones-generadoras
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Generador

// Mozilla-MDN-Fetch
// https://developer.mozilla.org/es/docs/Web/API/Fetch_API

// CanIUse.com-Fetch
// https://caniuse.com/#search=fetch