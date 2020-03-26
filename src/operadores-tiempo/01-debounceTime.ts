import { fromEvent } from "rxjs";
import { debounceTime, pluck, distinctUntilChanged } from "rxjs/operators";

/**
 * OPERADOR DEBOUNCE TIME
 *
 * Nos ayuda a que podamos contar cuantas milésimas de segundo han pasaddo
 * desde la última emision, y si esas milésimas de segundo sobrepasan el parametro
 * que tenemos entre paréntesis entonces emitirá dicho valor.
 *
 * Por tanto, nos va a ayudar a poder restringir la cantidad de emisiones que
 * nuestro observable está emitiendo
 * (Por ejemplo, cada vez que hacemos click que se hiciera una peticion HTTP,
 * que traiga información y renderice. Si hay muchos click, puede hacer caer el performance de nuestra app)
 * */

// EJEMPLO 1:
const click$ = fromEvent(document, "click");

click$
  .pipe(
    // Tras hacer click, solo emitirá un evento cada 3 seg.
    // Si hago varios click en ese intervalo, solo emitirá el ultimo click
    debounceTime(3000)
  )
  .subscribe(console.log);

// EJEMPLO 2:
const input = document.createElement("input");
document.querySelector("body").append(input);

// Queremos que se impriman todos los valores que ingresamos en el input
const input$ = fromEvent(input, "keyup");

input$
  .pipe(
    // Emitimos solo tras pasar un seg, y no cada vez que se pulse una tecla
    debounceTime(1000),
    // Hacemos que solo nos muestre el valor que hay en el input
    pluck("target", "value"),
    // si borro y vuelvo a escribir lo mismo dentro de ese periodo, tampoco se volverá a emitir al ser el mismo valor
    distinctUntilChanged()
  )
  .subscribe(console.log);
