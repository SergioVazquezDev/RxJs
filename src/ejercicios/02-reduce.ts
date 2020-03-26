import { reduce } from 'rxjs/operators';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Ejercicio: 
 * Sume todos los números del arreglo usando un reduce.
 * Debe de filtrar para que sólo números sean procesados
 * La salida debe de ser 32
 * 
 * Tip:
 * isNan() es una función de JavaScript para determinar si es número
 * Usar filter<any>(...) para no tener problemas de tipado.
 */

(() =>{
  const datos = [1, 2, 'foo', 3, 5, 6, 'bar', 7, 8];

  from(datos).pipe(

    
    // Trabajar aquí
    // En primer lugar, usamos el filter para quedarnos solo con los numeros
    filter<any>(val => !isNaN(val)),
    // el siguiente paso es usa reduce para sumarlos (tambien podemos usar una funcion externa)
    reduce((acumulado, actual) => acumulado + actual )


  ).subscribe( console.log ) // La salida debe de ser 32
})();