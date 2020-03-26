import { fromEvent, from } from "rxjs";
import { filter, map } from "rxjs/operators";
/**
 * OPERADOR FILTER
 *
 * Nos permite filtrar las emisiones de los valores que emite el observable
 *
 * */

// range(1, 10)
//   .pipe(
//       filter(valor => valor % 2 ===1) // tiene que ser una condicion que devuelva un boolean
//   ).subscribe(console.log);

// range(20, 30)
//   .pipe(
//     filter((valor, i) => {
//         console.log('index: ', i);
//         return valor % 2 === 1; // tiene que ser una condicion que devuelva un boolean
//     })
//   )
//   .subscribe(console.log);

// Nos creamos una interface para tipar los personajes
interface Personaje {
  tipo: string;
  nombre: string;
}

const personajes: Personaje[] = [
  {
    tipo: "heroe",
    nombre: "Batman"
  },
  {
    tipo: "heroe",
    nombre: "Robin"
  },
  {
    tipo: "villano",
    nombre: "Joker"
  }
];

// fitramos para obtener solo los heroes
from(personajes)
  .pipe(filter(personaje => personaje.tipo === "heroe"))
  .subscribe(console.log);

// Encadenamiento de operadores (el orden es importante)
const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map(event => event.code), // recibe un keyboardEvent y devuelve un string
  // solo me interesa alguna accion con la tecla enter
  filter(key => key === "Enter")
);

keyup$.subscribe(console.log);
