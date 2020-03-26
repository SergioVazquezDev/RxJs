import { interval } from "rxjs";
import { tap, take, reduce } from "rxjs/operators";

/**
 * OPERADOR REDUCE
 *
 * Aplica una funcion acumuladora a las emisiones producidas por mi observable
 *
 * ¡IMPORTANTE! Cuando aplicamos el operador reduce no vamos a tener ninguna emisión hasta que se complete el observable
 * Hay un problema a tener en cuenta con el operador reducer. SI necesitamos el valor acumulado en el momento de la emisión, y así ir trabajando con el, el reducer no nos va a servir, necesitaremos el SCAN
 * */

// Primero veamos como funciona reduce en JS
const number = [1, 2, 3, 4, 5];

// como una bola de nieve, no sabemos como será de grande hasta que llega al final
const totalReducer = (acumulador: number, valorActual: number) => {
  return acumulador + valorActual;
};

const total = number.reduce(totalReducer, 0);
console.log("total array: ", total);

// En Rxjs
interval(1000)
  .pipe(
    take(6), // completará el observable despues de la cantidad de veces que yo especifique dentro de él
    tap(console.log), // con el tap vemos que sucede
    reduce(totalReducer) // simparentesis, solo el nombre de la funcion
  )
  .subscribe({
    next: valor => console.log("next: ", valor),
    complete: () => console.log("Complete")
  });
