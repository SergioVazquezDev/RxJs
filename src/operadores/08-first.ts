import { fromEvent } from "rxjs";
import { first, tap, take, map } from "rxjs/operators";

/**
 * OPERADOR FIRST
 *
 * first(): Cuando el observable emite el primer valor, devuelve ese primer valor y se completa,
 * sin importar que despues tengamos otras emisiones y en un futuro se complete
 *
 * first(x => x >= 10) Se seguiran emitiendo todos los valores hasta el primero que cumpla la condición,
 * y entonces se completará
 *
 * */

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    // Supongamos que solo queremos quedarnos con el primer click que hacemos y completar el observable
    // take(1) // Para conseguir ese efecto, podemos usar un take(1) en lugar del first
    //first() // simplemente con esto nos quedariamos con el primero y completamos

    // Supongamos ahora que lo que queremos es el primer evento que cumpla una condicion:
    // Que la coordenada Y sea mayor o igual a 150
    tap<MouseEvent>(t => console.log("tap", t)), // usamos el tap para visualizar los eventos que no sean el next

    // TIP:
    // Para no tener el objeto event entero en el tap, podemos usar las destruccturacion de JS,
    // y quedarnos solo con los atributos que nos interesan
    // map(event => ({
    //   clientY: event.clientY,
    //   clientX: event.clientX
    // }))
    // El codigo anterior podemos reducirlo aun mas asi:

    // Si tenemos una propiedad que es exactamente igual al nombre de una variable,
    // no es necesario aisgnarla
    map(({ clientX, clientY }) => ({ clientY, clientX })),

    first(event => event.clientY >= 150)
  )
  .subscribe({
    next: val => console.log("next: ", val),
    complete: () => console.log("complete")
  });
