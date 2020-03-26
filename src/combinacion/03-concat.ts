import { interval, concat, of } from "rxjs";
import { take } from "rxjs/operators";

/**
 * FUNCION CONCAT (El operador concat está obsoleto, y no lo veremos)
 *
 * Es una funcion que recibe observables como argumento (tambien puede recibir un iterable o un array).
 * El concat creará un nuevo observable, y suponiendo que nosotros estamos subscritos veríamos ese resultado
 * concat (obs1$, obs2$, obs3$): el obs2$ comenzará cuando el obs1$ se complete, si el obs1$ no se completa nunca,
 * el obs2$ y obs3$ jamas se ejecurarán.
 *
 * El complete de la subscripcion se dará cuando todos sus observables hayan sido completados
 *
 * */

const interval$ = interval(1000);

concat(
  interval$.pipe(take(3)),
  interval$.pipe(take(2)),
  [1, 2, 3, 4], // Un arreglo
  of(1) // Nuevo observable, por lo que es tambien valido como parametro
).subscribe(console.log);
