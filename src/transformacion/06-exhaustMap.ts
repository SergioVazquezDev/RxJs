import { interval, fromEvent } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";

 /**
 * OPERADOR EXHAUST MAP
 * 
 * El exhaustMap SOLO MANTIENE UNA SUBSCRIPCION ACTIVA, antes de poder añadir otra subscripcion para que emita los valores.
 * Si tenemos una subscripcion interna que está funcionando todavia y aun no se ha completado, si tengo una nueva emision
 * la nueva será ignorada, no lo concatena, no concatena con la peticion anterior, nada, es ignorada completamente.
 * Cuando termina la que tenía activa internamente y se genera una nueva emision, ahora, al no tener ninguna 
 * subsciptcion interna activa, ahora si emitirá esos nuevos valores
 * 
 * Es muy util para ignorar dobles click en botones o doble submit en un formulario
 * */

const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent(document, "click");

click$.pipe(
    exhaustMap(() => interval$)
).subscribe(console.log);

// Si hago click rapidamente, solo aparece una secuencia. Con el primer click entro en el exhaustMap y se subscribió internamente.
// El segundo y tercer click entraron en el exhaustMap, pero como ya habia una subscripcion interna corriendo, ignoró estas dos nuevas.
// Si ya terminada la primera secuencia vuelvo ha hacer click, entra en el exhaustMap y se subscribe internamente de nuevo,
// ya que no habia ninguna subscripcion interna corriendo

