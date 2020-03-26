import { map } from 'rxjs/operators';
import { from } from 'rxjs';
/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */

// METEMOS EL CÓDIGO EN UNA FUNCION AUTOINVOCADA DE JS (Evitamos tener problemas con archivos en el mismo nivel)
(() =>{
  const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];
  const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // // Cambiar este FOR OF, por un observable y capitalizar las emisiones
  // for( let nombre of nombres ) {
  //   console.log( capitalizar(nombre) )
  // }

  // Una vez con la salida esperada, necesitamos llamar a la función capitalizar
  // Para eso, usamos el pipe con map, para llamar a la funcion capitalizar.
  from(nombres).pipe(
    // map(nombre => capitalizar(nombre))
    // Como en este caso solo tenemos el nombre, lo podemos dejar de esta manera
    map(capitalizar)
  ).subscribe(console.log)
})();