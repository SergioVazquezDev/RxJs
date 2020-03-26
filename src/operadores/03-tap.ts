import { range } from "rxjs";
import { map, tap } from "rxjs/operators";
/**
 * OPERADOR TAP
 *
 * Nos permite disparar efectos secundarios.
 * Principalmente los usaremos para imprimir el valor por consola
 * o cuando necesitemos disparar alguna accion cuando la informacion
 * a traves de ese observable
 * Algo muy poderoso es poder depurar todo el proceso desde inicio hasta el final, simulando next, errores y complete
 * */

const numeros$ = range(1, 5);

numeros$
  .pipe(
    tap(x => {
      console.log("antes: ", x);
      return 100; // en este caso, el return en el tap no haria nada
    }),
    map(val => val * 10),
    tap({
      next: x => console.log("despues: ", x), // se ejecutará cada vez que el tap reciba el siguiente valor
      complete: () => console.log("Se terminó todo") // se ejecutará cuando todo el observable se complete
    })
  )
  .subscribe(valor => console.log("subcribe: ", valor));
