import { Observable, Observer } from 'rxjs';

// Objeto independiente Observer, es una interface
const observer: Observer<string> = {
    next: value => console.log('sigiente [next]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.info('completado [obs]')
}

// ¿Como crear un observable?
// const obs$ = Observable.create(); <--- Así tambien podemos hacer un observable
const obs$ = new Observable<string>(subcriber => { // <-- Siempre es importante indicar que tipo de información contendrá el observable <string>
    subcriber.next('Hola');
    subcriber.next('Mundo');

    subcriber.next('Hola');
    subcriber.next('Mundo');

    // para forzar un error, siempre antes del complete()
    // const a = undefined;
    // a.nombre = 'Sergio';

    subcriber.complete();

    // Esto no se muestra, ya que tras el complete, no se emitirá nada mas
    subcriber.next('Hola');
    subcriber.next('Mundo');
});

// Para que un observable se ejecute, tiene que tener una subcipcion ¿si no hay subcripccion que va a notificar?
// obs$.subscribe(respuesta => {  // seria lo mismo que obs$.subscribe(console.log)
//     console.log(respuesta);
// } 

// Desglosando el observable:
// obs$.subscribe(
//     valor => console.log('next: ', valor), // callback next
//     error => console.warn('error: ', error), // error
//     () => console.info('Completado') // funcion callback de completado
// )

// Podemos hacerlo tambien a través del Observer que hemos creado
obs$.subscribe(observer);



// RXJS-Firebase-docs
// https://rxjs-dev.firebaseapp.com/api

// ReactiveX-Official-Docs
// http://reactivex.io/documentation/observable.html