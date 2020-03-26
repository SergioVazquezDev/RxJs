import { from } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

/**
 * OPERADOR DISTINCT UNTIL KEY CHANGED
 *
 * Muy similar al distinctUntilChanged, que emite valores siempre y cuando
 * la emisión anterior no sea la misma, pero en este caso, fijándose en el valor
 * de una de las propiedades del objeto para determinar si es igual o no a la emision anterior
 *
 * */

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" },
  { nombre: "Megaman" },
  { nombre: "Zero" },
  { nombre: "Dr. Willy" },
  { nombre: "X" },
  { nombre: "X" },
  { nombre: "Zero" },
  { nombre: "Megaman" }
];

from(personajes)
  .pipe(
    // En este caso, solo debemos identificar la propiedad que observamos
    distinctUntilKeyChanged("nombre")
  )
  .subscribe(console.log);
