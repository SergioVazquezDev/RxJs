import { ajax, AjaxError } from "rxjs/ajax";
import { map, pluck, catchError } from "rxjs/operators";
import { of } from "rxjs";

/**
 * OPERADOR CATCH ERROR
 *
 * No solo es para atrapar errores HTTP, sirve para atrapar cualquier error que suceda en el observable
 * Dejará pasar todos los valores correctos, y en el caso de que suceda un error (catch), podemos decidir
 * si retornar un mensaje de error o retornar un nuevo observable que emita cualquier valor
 * */

const url = "https://api.github.com/users?per_page=5";

// Con Fetch API tendriamos que controlar los errores con una funcion
const manejaErrores = (response: Response) => {
  if (!response.ok) {
    // Para que se dispare el catch, yo tengo que lanzar un throw en la promesa,
    // Así finciona el Fetch API actualmente
    throw new Error(response.statusText);
  }

  return response;
};

// Sacamos en un arrow function el control de errores
const atrapaError = (err: AjaxError) => {
  // mostramos un texto personalizado con el mensaje del error
  console.warn("error en:", err.message);
  // Si ocurre un error, podemos retornar un observable con un array vacío
  return of([]);
};

const fetchPromesa = fetch(url);

// fetchPromesa
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn('error en usuarios', err ) )

// Hay una gran cadena de promesas para realizar algo relativamente sencillo, y esto suponiendo que la data
// no la necesito transformar
// fetchPromesa
//     .then( manejaErrores )
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn('error en usuarios', err ) )

/** Aqui vemos el beneficio de utilizar observables y el objeto Ajax que se encuentra dentro de Rx */
ajax(url)
  .pipe(
    // map (resp => resp.response) // Podemos quedarnos solo con la respuesta con el map
    pluck("response"), // Con pluck hacemos lo mismo que con map, pero aun mas corto
    catchError(atrapaError)
  ) // Para manejar el error, lo pasamos por el operador catchError
  .subscribe(users => console.log("usuarios:", users));
