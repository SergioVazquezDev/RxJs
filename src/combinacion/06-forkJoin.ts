import { of, interval, forkJoin } from "rxjs";
import { take, delay } from "rxjs/operators";


/**
 * FUNCION FORK JOIN
 * 
 * Es una funcion que recibe observables como argumento, pero estos observables tienen que ser FINITOS,
 * de no serlo, el forkJoin no emitiria ningun valor
 * 
 * El forkJoin va a retornar el valor de cada uno de los observables cuando todos se completen.
 * Los emitirá como un array (aunque con una pequeña configuración lo podemos transformar a un objeto)
 * 
 * */

const numeros$ = of(1, 2, 3, 4); // El of es sincrono, por lo que acabaria muy rápido
const intervalo$ = interval(1000).pipe(take(3)); //0..1..2 // El interval es infinito, lo hacemos finito con take
const letras$ = of("a", "b", "c").pipe(delay(3500)); // Este sería el mas lento con el delay

// salida normal, como un array
forkJoin(
    numeros$,
    intervalo$,
    letras$
).subscribe( console.log  )

// salida concatenando string con la respuesta
forkJoin(
    numeros$,
    intervalo$,
    letras$
).subscribe( resp => {
    console.log('numeros: ', resp[0] )
    console.log('intérvalo: ', resp[1] )
    console.log('letras: ', resp[2] )
});

// salida con pares de valores con key observable y value el valor
forkJoin({
    numeros$,
    intervalo$,
    letras$
}).subscribe( resp => {
    console.log(resp)
});

// salida si nosotros queremos personalizar la key
forkJoin({
  num: numeros$,
  int: intervalo$,
  let: letras$
}).subscribe(resp => {
  console.log(resp);
});


