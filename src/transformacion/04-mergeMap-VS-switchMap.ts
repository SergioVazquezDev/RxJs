import { fromEvent, interval } from "rxjs";
import { mergeMap, switchMap } from "rxjs/operators";

/**
 * DIFERENCIAS ENTRE MERGE MAP Y SWITCH MAP
 * 
 * mergeMap: cuando hago click, se subscribe al intervalo y empieza a contar, 
 * si hago click de nuevo, comienza una nueva subscripcion a contar, pero tambien sigue apareciendo el contador
 * de la primera subscripcion. Si hago muchos click, esto puede acabar en un problema de memoria
 * PUEDE MANTENER SIMULTANEAMENTE TODAS LAS SUBSCRIPCION INTERNAS ACTIVAS QUE NECESITEMOS
 * 
 * switchMap: cuando hago click, se subscribe al intervalo y empieza a contar, 
 * si hago click de nuevo, la anterior subscripcion se cancela y comienza la nueva subscripcion.
 * Si hago muchos click, no tendré el problema del mergeMap, ya que solo permanece la subscripcion del ultimo de los click
 * SOLO MANTIENE SIMULTANEAMENTE UNA SUBSCRIPCION INTERNA ACTIVA
 * */

const click$ = fromEvent(document, "click");
const interval$ = interval(1000);

click$
  .pipe(
    switchMap(() => interval$)
    // mergeMap( () => interval$ ),
  )
  .subscribe(console.log);
