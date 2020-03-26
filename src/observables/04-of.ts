import { of } from 'rxjs';

/** 
 * FUNCION OF
 * 
 * nos permite crear observables en base a un listado de elementos. 
 * Emite los valores uno por uno de manera sincrona,
 * y cuando emite el ultimo valor automaticamente,
 * se completa el observable
 * 
 * */

// Lo valores separados por comas!
//const obs$ = of(1,2,3,4,5,6);

// const obs$ = of([1, 2, 3, 4, 5, 6]); asi solo emite un valor, el of convierte la secuencia de argumentos que recibe en valores que fluyen a traves del observable
const obs$ = of<number>(...[1, 2, 3, 4, 5, 6], 2, 3, 4, 5); // con el operador spread si sería valido
// const obs$ = of([1, 2], {a:1, b:2}, function(){}, true, Promise.resolve(true)); // of puede admitir multiples tipos


// Los observable tambien pueden trabajar de manera sincrona (ver Inicio del Obs$ | Fin del Obs$)
console.log('Inicio del Obs$');
obs$.subscribe(
    next => console.log('next: ', next),
    null, // error
    () => console.info('¡Terminamos la secuencia!')
);
console.log('Fin del Obs$');