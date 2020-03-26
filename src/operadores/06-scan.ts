import { from } from "rxjs";
import { reduce, scan, map } from "rxjs/operators";

/**
 * OPERADOR SCAN
 *
 * Aplica una funcion acumuladora a las emisiones producidas por mi observable, similar al reduce,
 * pero en este caso, cuando los valores son emitidos por mi observable, inmediatamente van saliendo
 * conforme van ingresando, pero regresa su valor acumulado
 * */

const numeros = [1, 2, 3, 4, 5];

// const totalAcumulador = (acumuladoValue, currentValue) => {
//  return acumuladoValue + currentValue;
// }
// Lo podemos simplificar así:
const totalAcumulador = (acumuladoValue, currentValue) =>
  acumuladoValue + currentValue;

// Reduce => emite sólo el valor 15
from(numeros)
  .pipe(reduce(totalAcumulador, 0))
  .subscribe(console.log);

// Scan => emite 1, 3, 6, 10 y 15
from(numeros)
  .pipe(scan(totalAcumulador, 0))
  .subscribe(console.log);

// El scan podría ser la base del patron REDUX (manejamos en estado global de nuestra app en un unico objeto)
interface Usuario {
  id?: string;
  autenticado?: boolean;
  token?: string;
  edad?: number;
}

// Vamos a simular que vamos a tener varias emisiones de cambios que va a recibir este usuario
const user: Usuario[] = [
  { id: "sergio", autenticado: false, token: null }, // estado inicial
  { id: "sergio", autenticado: true, token: "ABC" }, // tras autenticarse
  { id: "sergio", autenticado: true, token: "ABC123" } // token actualizado
];

// Nos creamos un observable que simule que cada una de esas peticiones se ejecutaron
// en momentos diferentes del tiempo. Si seguimos el patron Redux, tendríamos algo parecido al State

// Este state, me estará manteniendo todas las modificaciones que cambian en el estado.
// Y el estado seria solo una de las lineas
const state$ = from(user).pipe(
  scan<Usuario>(
    (acc, cur) => {
      // Es recomendable tipar el scan, para evitar futuros erores
      return { ...acc, ...cur }; // retornamos todas las propiedades
    },
    { edad: 33 }
  ) // Podemos añadir el estado inicial, aunque puede ser un objeto vacío
);

// Ahora lo que
const id$ = state$.pipe(map(state => state));

/**
 * Cada vez que nosotros recibamos una accion que modifique mi estado de la app,
 * yo mandaría un objeto similar a éste, que sería procesado por el scan
 * y tendría el valor acumulado de mi estado.
 * El único incoveniente que yo tendría si me subscribo unicamente al cambio
 * del estado referente al id, lo tendría tres veces impreso, pero eso lo podemos resolver con otro operador
 */

id$.subscribe(console.log);
