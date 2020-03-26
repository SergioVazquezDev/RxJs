import { of } from "rxjs";
import { startWith, endWith } from "rxjs/operators";

/**
 * OPERADOR START WITH
 *
 * Nos permite hacer una emisión antes de que el observable empiece a emitir, aunque sea un valor sincróno.
 * Justo en el momento del subscribe, de forma sincrona va a disparar la emision pasada por parámetros 
 * (que puede ser de cualquier naturaleza)
 * */

 /**
 * OPERADOR END WITH
 *
 * Nos permite hacer una emisión (que puede ser de cualquier naturaleza) antes de que se complete el observable 
 * */

const numeros$ = of(1, 2, 3).pipe(
  // no importa si el endWith va delante, esto no afecta a la salida,
  // pero se recomienda que el start sea lo primero y el end lo ultimo
  startWith("a", "b", "c"), // emitirá esto en primer lugar
  endWith("x", "y", "z") // emitirá esto en ultimo lugar
);

numeros$.subscribe(console.log);
