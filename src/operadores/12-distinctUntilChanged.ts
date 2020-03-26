import { of, from } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

/**
 * OPERADOR DISTINCT UNTIL CHANGED
 *
 * A diferencia del distinct, el distinctUntilChanged emite valores siempre y cuando
 * la emisión anterior no sea la misma
 *
 * */

const numeros$ = of<number | string>(1, "1", 1, 3, 3, 2, 2, 4, 4, 5, 3, 1, "1");

numeros$
  .pipe(
    // Apareceran aquellos valores cuya emision anterior no sea el mismo valor
    // Distinct usa para identificarlos el === (operador de equidad JS), por eso tenemos el '1' string
    distinctUntilChanged()
  )
  .subscribe(console.log);

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
    // como los objetos son distintos, deberemos comparar sus propiedades mediante un predicado
    // si la condicion regresa true, no lo dejará pasar
    distinctUntilChanged(
      (anterior, actual) => anterior.nombre === actual.nombre
    )
  )
  .subscribe(console.log);
