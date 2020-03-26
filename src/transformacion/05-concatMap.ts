import { interval, fromEvent } from "rxjs";
import { take, switchMap, concatMap } from "rxjs/operators";

 /**
 * OPERADOR CONCAT MAP
 * 
 * Nos sive para concatenar los observables resultante que pueden fluir a traves de este operador
 * las peticiones se hacen lineales, es decir, una tras otra. lo 'concatena', lo pone en una 'cola': 
 * termina la petición 1, sigue con la 2, termina la 2, sigue con la 3… 
 * y así sucesivamente hasta terminar.
 * 
 * Lo bueno en concatMap es que si una petición termina y falla, la siguiente no se ve afectada, 
 * por lo que si tenemos 10,000 registros, si falla el 30, los otros 29 sí se muestran y únicamente el 30 fallará.
 * Adicionalmente, en concatMap las peticiones se realizan en orden, lo cual podría ser una desventaja también, 
 * ya que, si por ejemplo la petición 1 tiene 500 registros, la 2 tiene 10,000, la 3 tiene 100, 
 * entonces la 3 en teoría sería la más rápida, pero deberá esperar por las demás a que terminen.
 * 
 * */


const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent(document, "click");

click$.pipe(
    //switchMap(() => interval$)
    concatMap(() => interval$)
).subscribe(console.log);

// Aqui la diferencia radica en cuantas emisiones se hagan:
// Si lo hacemos con switchMap y hacemos varios click, la emision anterior se cancela para empezar la nueva
// Si lo hacemos con concatMap y hacemos varios click, la emision anterior continúa y cuando termine empieza la nueva