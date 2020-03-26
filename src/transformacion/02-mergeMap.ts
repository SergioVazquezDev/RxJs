import { of, interval, fromEvent } from "rxjs";
import { mergeMap, take, map, takeUntil } from "rxjs/operators";


/**
 * OPERADORES DE TRANSFORMACION
 * 
 * Nos permiten poder transformar el observable completamente o bien cambiar la emision para que 
 * podamos unificar los observables o las emisiones de los mismos para simplificar todo el código
 *
 * */

 /**
 * OPERADOR MERGE MAP
 * 
 * No es otra cosa que un map seguido de un mergeAll.
 * La diferencia con concatMap es que esta no tira las peticiones 1 por 1 esperando termine la anterior 
 * sino que empieza a tirarlas directo y una vez que responde una 
 * puedes usar esa respuesta y al igual que concatMap no interfiere con las demás,
 * es decir, no los tendremos en orden de valores, sino en el orden como sean emitidos
 * 
 * */

// EJEMPLO 1: 
const letras$ = of("a", "b", "c");

letras$.pipe(
  mergeMap(letra =>
    interval(1000).pipe(
      map(i => letra + i),
      take(3) // Para emitirlo solo tres veces y que se complete
    )
  )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('Complete')
});

// EJEMPLO 2: Contemos cuanto tiempo pasa el usuario presionando el raton
const mousedown$ = fromEvent(document, "mousedown");
const mouseup$ = fromEvent(document, "mouseup");
const interval$ = interval(); // Ponerlo vacio es como decir 'lo mas rapidp que pueda'

mousedown$
  .pipe(
      mergeMap(() => 
      interval$.pipe(
          takeUntil(mouseup$)) // Detenemos el interval cuando soltamos el raton con takeUntil
      )
    )
  .subscribe(console.log);