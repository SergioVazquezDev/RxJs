import { fromEvent, asyncScheduler } from "rxjs";
import { throttleTime, pluck, distinctUntilChanged } from "rxjs/operators";

/**
 * OPERADOR THROTTLE TIME
 *
 * Es, podríamos decir, exactamente lo opuesto al funcionamiento del debounceTime.
 * En este caso, emitirá el primer valor de ese intervalo de tiempo,
 * e ignorará el resto de emisiones del mismo intervalo.
 * Cuando este intervalo termine, y pase a un nuevo intervalo de tiempo,
 * volverá a publicar la primera emision en ese intervalo, ignarando nuevamente
 * el resto de emisiones hasta un nuevo intervalo de tiempo.abs
 *
 * (Veremos que hay una forma de saber el primero y el ultimo ;D )
 * */

// EJEMPLO 1:
const click$ = fromEvent(document, "click");

click$
  .pipe(
    // Tras hacer click, se emitirá ese click e ignorará los sucesivos click durante esos 3 seg.
    // Si hago varios click en ese intervalo, solo emitirá el primer click
    throttleTime(3000)
  )
  .subscribe(console.log);

// EJEMPLO 2:
const input = document.createElement("input");
document.querySelector("body").append(input);

// Queremos que se impriman todos los valores que ingresamos en el input
const input$ = fromEvent(input, "keyup");

input$
  .pipe(
    // Emitimos solo el primer valor que se escribe, y esperaria 1 seg antes de emitir el siguiente
    // Con la siguiente configuracion, controlaremos lo escrito, de forma similar al debounceTime,
    // pero emitiendo valores cada menos tiempo
    throttleTime(500, asyncScheduler, {
      leading: false, // Primer elemento
      trailing: true // ultimo elemento
    }),
    // Hacemos que solo nos muestre el valor que hay en el input
    pluck("target", "value"),
    // si borro y vuelvo a escribir lo mismo dentro de ese periodo, tampoco se volverá a emitir al ser el mismo valor
    distinctUntilChanged()
  )
  .subscribe(console.log);
