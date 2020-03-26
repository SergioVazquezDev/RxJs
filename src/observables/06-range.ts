import { of, range, asyncScheduler } from "rxjs";

/**
 * FUNCION RANGE
 *
 * crea un observable que emite una secuencia de numeros en base a un rango
 * Por defecto son sincrinos pero se pueden trnasformar en asincronos utilizando un
 * async Scheduler.
 * El primer parametro es el valor inicial y el segundo el numero de emisiones,
 * ojo (-5, 10) no son 15 valores, sino desde el -5, sus 10 valores siguientes
 * Al llegar al ultimo valor, se completa
 * */

// const src$ = of(1, 2, 3, 4, 5);
// const src$ = range(1, 100); // con muchos valores mas practico que el of
// const src$ = range(5) // el inicio es opcional, si no se indica inicia en 0

// Por defecto es sincrono => const src$ = range(1, 5);
// Lo hacemos asincrono al añadir como tercer valor el asyncScheduler
const src$ = range(1, 5, asyncScheduler);

console.log("inicio");
src$.subscribe(console.log);
console.log("fin");
