import { fromEvent, interval } from "rxjs";
import { takeUntil, skip, tap } from "rxjs/operators";

/**
 * OPERADOR TAKE UNTIL
 *
 * Recible como argumento otro observable.
 * Sigue recibiendo valores y sigue emitiendolos hasta que el segundo observable
 * emita su primer valor
 *
 * */

/**
 * OPERADOR SKIP
 *
 * Sirve para saltar u omitir x cantidad de emisiones iniciales.
 * Si tenemos un skip(3), hasta la cuarta emision no va a ser nada emitido hacia mi subscriptcion,
 * aunque no necesariamente tiene que ser una subscriptción,
 * tambien podría ser el siguente operador despues del skip(3),
 * redordemos que podemos encadenar varios operadores
 *
 * */

// Creamos el boton
const boton = document.createElement("button");
boton.innerHTML = "Detener Timer";
document.querySelector("body").append(boton);

// Creamos un contador que emita cada seg los valores
const counter$ = interval(1000);

// Creamos el segundo observable que será el click en el boton
// const clickBtn$ = fromEvent<MouseEvent>(boton, "click");
// Hacemos lo mismo que en la linea anterior, pero añadiendo el skip
// Ahora se completará tras pulsar dos veces en el boton 'Detener timer'
const clickBtn$ = fromEvent<MouseEvent>(boton, "click").pipe(
  tap(() => console.log("tap antes de skip")),
  skip(1),
  tap(() => console.log("tap despues de skip")) // esto no sale hasta la segunda emision tras el skip
);

counter$
  .pipe(
    // Pasamos al takeUtil el observable que parará el counter
    takeUntil(clickBtn$)
  )
  .subscribe({
    next: val => console.log("next: ", val),
    complete: () => console.log("complete")
  });
