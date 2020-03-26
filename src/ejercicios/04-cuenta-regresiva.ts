import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() =>{

    const inicio = 7;
    const countdown$ = interval(700).pipe( // Actualmente emitimos 0..1..2..3..4..5
        // Usar los operadores necesarios para realizar la cuenta regresiva

        // Lo primero que necesitamos es transformar los numeros
        // map es ideal para transformar la salida
        // si al inicio (7) le restamos el i, tendremos una cuenta atrás
        map(i => inicio - i),
        // para detener el intervalo, usaremos el operador take, en el que indicamos el numero de emisiones necesito 
        take(inicio + 1)//take(8) ya que queremos tambien el 0  
        );
    

    // No tocar esta línea ==================
    countdown$.subscribe( console.log ); // =
    // ======================================


})();
