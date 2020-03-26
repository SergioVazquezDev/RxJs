import { Observable, Observer, Subscriber } from 'rxjs';

// Objeto independiente Observer, es una interface
const observer: Observer<any> = {
    next: value => console.log('next: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado')
}

const intervalo$ = new Observable<number>(subscriber => {
    // Crear un contador: 1,2,3,4,5,.....
    let count = 0;

    // lo asignamos a una constante para manejar el interval en la cancelacion del observable
    const interval = setInterval(() => {
        // cada segundo
        count++;
        subscriber.next(count);
    }, 1000);

    // OJO que no es lo mismo el unsubcribe que el complete
    setTimeout(() => {
        subscriber.complete();
    }, 2500);

    // En el return controlamos el procedimiento que queremos que se ejecute cuando hacemos en unsubscribe
    return () => {
        //borramos el interval que tenemos corriendo
        clearInterval(interval);
        console.log('interval destruido')
    }
});


// los valores se imprimirán a traves de este subscribe
const subscription1 = intervalo$.subscribe(observer);
const subscription2 = intervalo$.subscribe(observer);
const subscription3 = intervalo$.subscribe(observer);


// llamar a los tres subcrition.unsubcribe es algo incómodo ¿Cómo encadenar subcripciones?
subscription1.add(subscription2)
    .add(subscription3);


// Si asignamos el subcribe a una variable, podremos cancelar la subscrpcion a traves del unsubcribe
setTimeout(() => {
    // A los 3 seg cancelamos la subscripcion
    subscription1.unsubscribe();

    /*
    Al tenerlos encadenados con el .add, ya no hace falta llamar
    al subscription2 y subscription3 de esta forma, solo al primero
    subscription2.unsubscribe();
    subscription3.unsubscribe();
    */

    // // Si nos subcribimos, se crea una neuva intancia del observable,
    // // y por consiguiente, se ejecuta nuevamente todo el codigo de dentro de él
    // const subscription2 = intervalo$.subscribe(num => console.log('Num: ', num));
    console.log('Completado timeout');
}, 6000)

// Cuando llamamos al complete, se dispara la funcion del return,
// que limpiar el interval. Como ya se completó el observable si volvemos a llamar al unsubcribe, el resultado es el MSInputMethodContext,
// solo se lanza una vez y no se lanzará mas veces 