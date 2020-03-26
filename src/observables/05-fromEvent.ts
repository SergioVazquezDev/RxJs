import { fromEvent } from 'rxjs';

/** 
 * FUNCION FROMEVENT
 * 
 * nos permite crear observables en base a un event target, de cierto tipo que provienene de mi event target 
 * Por ejemplo, si solo quiero saber los eventos que sean emitidos del Document
 * que tienen que ver con el scroll.abs
 * No hay un fin de este fromEvent, aunque si podemos cancelarlo o terminar
 * */

/**
 * Eventos del DOM:
 */
const src1$ = fromEvent<MouseEvent>(document, 'click');
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

const observer = {
    next: val => console.log('next: ', val)
};

// comprobamos todo los que nos devuelve el evento
src1$.subscribe(observer);

// se lanzará al hacer un click
src1$.subscribe(ev => {
    // mostraremos las coordenadas del evento click
    console.log('coordenada X: ' + ev.x);
    console.log('coordenada Y: ' + ev.y);
});

// Podemos hacer lo mismo que el codigo anterior destructuración del es6
src1$.subscribe(({ x, y }) => {
    console.log(x, y);
});

// se lanzará al pulsar una tecla y soltar
src2$.subscribe(evento => {
    console.log(evento.key); // tendremos que tipar el fromEvent para acceder a sus propiedades
});
