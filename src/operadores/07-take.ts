import { of } from "rxjs";
import { take, tap } from "rxjs/operators";

/**
 * OPERADOR TAKE
 *
 * Es sumamente util cuando queremos limitar la cantidad de emisiones
 * que un observable puede tener, inclusive si mas adelante el observable
 * retorna un error, eso no importaría ya qye mi subscripcion se completó
 *
 *
 * */

const numeros$ = of(1, 2, 3, 4, 5);

numeros$
  .pipe(
    // Una peculiaridad que tiene el take, es que cancela la ejecucion del observable, lo vemos con un tap
    tap(t => console.log("tap", t)),
    take(3)
  )
  .subscribe({
    next: val => console.log("next: ", val),
    complete: () => console.log("complete")
  });
