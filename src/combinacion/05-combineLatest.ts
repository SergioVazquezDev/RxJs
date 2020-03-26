import { fromEvent, combineLatest, from } from "rxjs";
import { pluck } from "rxjs/operators";

/**
 * FUNCION  COMBINE LATEST
 * 
 * Es una funcion que nos permite mandar observables como argumentos, combinarlos y emitir los valores
 * de todos los observables internos simultaneamente.
 * 
 * Es importante recalcar que el combineLatest regresa un nuevo observable el cual va a emitir valores
 * hasta que todos los observables internos hayan emitido por lo menos un valor
 * 
 * El complete de la subscripcion se dará cuando todos sus observables hayan sido completados
 * */

// EJERCICIO 1: (ejercicio que hicimos en el merge, pero cambiando por el combineLatest)
// const keyup$ = fromEvent( document, 'keyup');
// const click$ = fromEvent( document, 'click');

// combineLatest(
//     keyup$.pipe( pluck('type') ),
//     click$.pipe( pluck('type') )
// ).subscribe( console.log );


// EJERCICIO 2:
// Creamos dos input (email / password)
const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.placeholder = "email@gmail.com";

input2.placeholder = "*********";
input2.type = "password";

// Añadimos los input al body
document.querySelector("body").append(input1, input2);

// Helper (Funcion externa que regresa un nuevo observable creado mediante el fromEvent)
const getInputStream = (elem: HTMLElement) =>
  fromEvent<KeyboardEvent>(elem, "keyup").pipe(
    pluck<KeyboardEvent, string>("target", "value") // extraemos el value del keyup
  );

// Aqui deberá devolverse el ultimo valor de ambos valores
combineLatest(
    getInputStream(input1), 
    getInputStream(input2)
).subscribe(
  console.log
);