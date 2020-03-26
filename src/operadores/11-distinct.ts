import { of, from } from "rxjs";
import { distinct } from "rxjs/operators";

/**
 * OPERADOR DISTINCT
 *
 * Nos deja pasar unicamente los valores que no han sido previamente emitidos por mi observable
 *
 * */

const numeros$ = of<number | string>(1, "1", 1, 3, 3, 2, 2, 4, 4, 5, 3, 1, "1");

numeros$
  .pipe(
    // Apareceran unicamente los no emitidos hasta el momento
    // Distinct usa para identificarlos el === (operador de equidad JS), por eso tenemos el '1' string
    distinct()
  )
  .subscribe(console.log);

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" },
  { nombre: "X" },
  { nombre: "Zero" },
  { nombre: "Dr. Willy" },
  { nombre: "X" },
  { nombre: "Megaman" },
  { nombre: "Zero" },
  { nombre: "Megaman" }
];

from(personajes)
  .pipe(
    // como los objetos son distintos, deberemos comparar los atributos mediante un predicado
    distinct(personaje => personaje.nombre)
  )
  .subscribe(console.log);
