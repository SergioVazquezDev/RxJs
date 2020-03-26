import { ajax, AjaxError } from "rxjs/ajax";
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * DIFERENCIAS ENTRE AJAX  Y AJAX.GET JSON
 *
 * Es una forma mas corta de ejecutar una peticion HTTP y obtener la informacion
 * */

// ESTO ES UN API HECHO PARA REALIZAR PRUEBAS
const url = "https://httpbin.org/delay/1"; // con el delay 1 estamos indicando que tarda 1 seg
// const url = 'https://api.github.com/users?per_page=5';

// Sacamos en un arrow function el control de errores
const manejaError = (err: AjaxError) => {
  // mostramos un texto personalizado con el mensaje del error
  console.warn("error: ", err.message);
  // Si ocurre un error, podemos retornar un observable con un array vacío (siempre es conveniente retornar algo)
  return of({
      ok:false,
      usuarios:[]
    });
};

// const obs$ = ajax.getJSON(url).pipe(
//     catchError(manejaError)
//     );

// const obs2$ = ajax(url).pipe(
//     catchError(manejaError)
//     );



// const obs$ = ajax.getJSON(url).pipe(catchError(manejaError));

const obs2$ = ajax(url).pipe(catchError(manejaError));

// Aqui tenemos la informacion propiamente de la respuesta
// obs$.subscribe(data => console.log("getJson:", data));

// Aqui tenemos mas informacion sobre la response, la request el evento,
// el status entre otras que puedes ser importantes para nosotros
obs2$.subscribe(data => console.log("ajax:", data));

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Esta es otra forma mejor para manejar los errores, en lugar de en el obs$, hacerlo en el subcribe
const obs$ = ajax.getJSON(url);

obs$.pipe(catchError(manejaError))
.subscribe({
    next: val => console.log('next: ', val),
    error: err => console.log('error en subs: ', err),
    complete: () => console.log('complete'),

});
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-