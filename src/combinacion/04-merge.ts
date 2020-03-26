import { fromEvent, merge } from "rxjs";
import { pluck } from "rxjs/operators";

/**
 * FUNCION MERGE (El operador merge está obsoleto, y no lo veremos)
 * 
 * Es otra funcion que recibe uno o más observables y el resultado va a ser el producto
 * de ambos observables combinados simultaneamente
 * 
 * Si los emitieran valores exactamente al mismo instante, sería el operador que esta al principio el de mayor prioridad 
 * El complete de la subscripcion se dará cuando todos sus observables hayan sido completados
 * 
 * */

// Creamos los dos observables que vamos a mergear
const keyup$ = fromEvent(document, "keyup");
const click$ = fromEvent(document, "click");

// La salida de este merge será la combinacion de ambas emisiones
merge(
    keyup$.pipe(pluck("type")), // Ponemos el pluck para quedarnos solo con el tipo del evento
    click$.pipe(pluck("type"))
).subscribe(
  console.log
);

