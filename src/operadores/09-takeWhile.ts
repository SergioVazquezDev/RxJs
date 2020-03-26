import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

/**
 * OPERADOR TAKEWHILE
 *
 * Permite recibir valores mientras la condicion se cumpla.
 * Cuando se recibe el primer valor que no cumple la condicion, se completa
 *
 * Algo bastante comun que se suele usar, es conocer el ultimo valor que rompió esa condición,
 * para ello tenemos un argumento boolean (inclusive), si lo ponemos a true, recibiremos valor
 * que hizo que mi takeWhile completara el observable
 *
 * */

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    map(({ x, y }) => ({ x, y })), // Para no tener el objeto event entero en el tap, podemos usar las destruccturacion de JS
    // Quiero recibir valores hasta que la y sea superior a 150
    // takeWhile(({y}) => y <= 150)
    // Hacemos lo mismo pero recibiendo el valor que rompió el while
    takeWhile(({ y }) => y <= 150, true)
  )
  .subscribe({
    next: val => console.log("next: ", val),
    complete: () => console.log("complete")
  });
