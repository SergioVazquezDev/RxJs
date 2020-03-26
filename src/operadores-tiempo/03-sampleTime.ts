import { fromEvent } from "rxjs";
import { map, sampleTime } from "rxjs/operators";

/**
 * OPERADOR SAMPLE TIME
 *
 * Nos permite obtener el ultimo valor emitido en un intervalo de tiempo.
 * En el momento en el que se realice una subscripcion, cada intervalo de tiempo,
 * el sample time va a estar emitiendo cual fue el ultimo valor emitido, pero si no se emitió
 * ningun valor en ese tiempo, no emitirá nada.
 *
 * */

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    // la informacion saldría en lapso de 2 seg
    sampleTime(2000),
    // sería mas eficiente colocar el simpleTime antes que el map, para evitar el procesar todas las emisiones
    map(({ x, y }) => ({ x, y })) // Nos quedamos solo con la info que queremos
  )
  .subscribe(console.log);
