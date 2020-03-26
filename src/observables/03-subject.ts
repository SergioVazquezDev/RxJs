import { Observable, Observer, Subject } from 'rxjs';

// Objeto independiente Observer, es una interface
const observer: Observer<any> = {
    next: value => console.log('next: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado')
}

// Para que esto se ejecute, debe existir al menos una subscripcion
const intervalo$ = new Observable<number>(subscriber => {

    // lo asignamos a una constante para manejar el interval en la cancelacion del observable
    const intervalID = setInterval(() => {
        // cada segundo emitiremos un número random
        subscriber.next(Math.random())
    }, 1000);

    // En el return controlamos el procedimiento que queremos que se ejecute cuando hacemos en unsubscribe
    return () => {
        //borramos el interval que tenemos corriendo
        clearInterval(intervalID);
        console.log('interval destruido')
    }
});

// // Si tenemos dos subscripciones, cada una de ellas recibirá un valor random distinto
// const subs1 = intervalo$.subscribe(random => console.log('subs1', random));
// const subs2 = intervalo$.subscribe(random => console.log('subs2', random));

// Si necesitamos crear subscripciones del mismo valor,
// independiente de donde nos encontremos, usaremos 'subject'
/** Es un tipo especial de observable:
 * 
 *  1 - Casteo multiple: muhcas subcripctiones sujetas a un mismo observable, y ditribuye la misma informacion a todos los lugares donde esté subscrito
 *  2 - También es un observer
 *  3 - Podemos manejar el next, error, complete.
 */
const subject$ = new Subject();
const subscription = intervalo$.subscribe(subject$);

// Usamos las dos mismas lineas de antes, pero en lugar de subscribirnos al Observable,
// nos subscribiremos al subject. Ahora sí el valor de ambas subscripciones es el mismo
// const subs1 = subject$.subscribe(random => console.log('subs1', random));
// const subs2 = subject$.subscribe(random => console.log('subs2', random));

// cambiamos las lineas anteriores mandando nuestro observer como parametro
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);


// Esto nos permite insertar informacion en el flujo de datos que mi observable está emitiendo
/**
 * Cuando la data es producida por el observable en sí mismo,
 * es considerado un "Cold Observable".
 * Perdo cuando la data es producida FUERA del observable
 * es llamado "Hot Observable"
 * 
 * Un subject nos permite transformar un Cold observable en un Hot observable
 */
setTimeout(() => {
    // añadimos un 10 a nuestro flujo
    subject$.next(10);
    // completamos el subject
    subject$.complete();

    // Si no hacemos el unsubcribe, a pesar de hacerse el complete,
    // el return no se lanzará y por tanto el setInterval seguirá
    // consumiendo memoria. Por tanto, lo lanzamos
    subscription.unsubscribe();
}, 3500);