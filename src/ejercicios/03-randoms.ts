import { interval, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
/**
 * Ejercicio: Realizar que los dos observables finales, 
 * emitan exactamente el mismo valor
 * 
 * Tip: Hot Observable? subjects?
 */

(() =>{

  // == NO TOCAR este bloque ====================
  const reloj$ = interval(1000).pipe(
    take(5),
    map( val => Math.round(Math.random() * 100) ) // *100 para tener numeros entre 1 y 99
  );
  // No tocar la creación del observable
  // ============================================

  // Para resolver el ejercicio, lo primero que debemos hacer es crear un subject (lleva $ ya que es un tipo de observable)
  const subject$ = new Subject();
  // Al reloj$ le pasamos el subject$
  reloj$.subscribe(subject$);
  
  
  // Estos dos observables deben de emitir exactamente los mismos valores
  // reloj$.subscribe( val => console.log('obs1', val) );
  // reloj$.subscribe( val => console.log('obs2', val) );

  // Al subject es al que debemos ahora disparar las subcripciones, no al reloj
  subject$.subscribe( val => console.log('obs1', val) );
  subject$.subscribe( val => console.log('obs2', val) );

})();
