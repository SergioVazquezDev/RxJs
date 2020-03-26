import { combineLatest } from 'rxjs';
import { interval, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
/**
 * Ejercicio: Combinar ambos observables (letras$, numeros$)
 * para que las emisiones sean la concatenación de los últimos
 * valores emitidos
 */

//  Ejemplo de la salida esperada:
// a1
// a2
// b2
// b3
// c3
// c4
// d4
// d5
// e5

(() =>{

    const letras  = ['a','b','c','d','e'];
    const numeros = [1,2,3,4,5];

    // Emite letras cada segundo
    const letras$  = interval(1000).pipe(
        map( i => letras[i] ),
        take( letras.length ) // Se cancela cuando no hay mas valores
    );
    
    // Emite numeros del 1 al 5 cada segundo, pero tiene un delay inicial
    // de 500 milésimas 
    const numeros$ = timer(500,1000).pipe( // este se emite en la mitad de tiempo
        map( i => numeros[i] ),
        take( numeros.length ) // Se cancela cuando no hay mas valores
    );

    // ========================================
    // Empezar a codificar aquí abajo
    // Nota, el subscribe debe de ser así
    // .subscribe( console.log )
    // Es decir, la salida en el subscribe debe 
    // de estar procesada en su totalidad
    // ========================================


    // La funcion ideal es combineLatest
    // combineLatest(letras$, numeros$)
    // .subscribe(console.log) // Si lo hacemos así, la salida será en forma de arreglo ["a",1]["a",2]["b", 2]["b", 3]... y eso no es lo que se pide :(


    // necesitamos pasarlo por el map
    combineLatest(letras$, numeros$).pipe(
      map(([a,b])=> a + b) // usamos destructuracion de arreglos (un num + string es string)
    ).subscribe(console.log) 


})();

		