import { interval, fromEvent } from "rxjs";
import { sample } from "rxjs/operators";

/**
 * OPERADOR SAMPLE
 *
 * Emite el último valor emitido por el observable hasta que el otro observable
 * que tenemos detro del operador sample (normalmente un evento) emita un valor
 *
 * Si nuestro observable vuelve a emitir un evento, pero mi observable inicial no ha emitido ningun valor,
 * entonces no tendremos ninguna salida en la subscripcion
 *
 * Se completaría en el momento que se completa el observable al que estoy subscrito, no al del evento
 * */

const interval$ = interval(1000);
const click$ = fromEvent<MouseEvent>(document, "click");

interval$
  .pipe(
    // Parece que no hace nada, pero la unica manera de que se emita un valor es que
    // el segundo observable (click$), emita otro valor
    sample(click$) // Obtenemos la muestra de como está el primer observable en el momento en el que hago click
    /**
     * Si hacemos click muy rapido vemos que es una combinación de ambos: el intervalo tiene que haber emitido un valor
     * para que el sample pueda tomar una muestra de como se encuntra el observable en ese momento
     */
  )
  .subscribe(console.log);
