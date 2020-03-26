import { fromEvent } from "rxjs";
import { auditTime, tap, map } from "rxjs/operators";

/**
 * OPERADOR AUDIT TIME
 *
 * Emite el ultimo valor que ha sido emitido por el observable en un periodo de tiempo determinado.abs
 * El observable emite un valor, empieza a contar el intervalo de tiempo en parámetro, y terminado el tiempo,
 * emite el último valor.
 *
 * Si antes de terminar el intervalo de tiempo el observable es completado,
 * audit time no emitirá ningun valor
 *
 * */

const click$ = fromEvent<MouseEvent>(document, "click");

// Con el primer click se inicia un intervalo de 2 seg, y si hacemos varios click en esos 2 seg,
// devolvería el ultimo de los click en esos 2 seg
click$
  .pipe(
    map(({ x }) => x), // Nos quedamos solo con la info que queremos
    tap(valor => console.log("tap: ", valor)),
    auditTime(2000)
  )
  .subscribe(console.log);
