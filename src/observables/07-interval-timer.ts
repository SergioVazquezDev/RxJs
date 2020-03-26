// Cuando lo importamos directamente de rxjs significa que son funciones para crear observables o algun tipo de tipado para los observables
import { interval, timer } from "rxjs";

/**
 * FUNCION INTERVAL
 *
 * permite crea un observable que trabaja con intervalos de tiempo.
 * Al subscribirnos al observable que se genera mediante el interval,
 * tendrimanos una secuencia de valores que empiezan en 0 hasta el fin de los tiempos
 * y cada una de esas emisiones se haria en la fraccion de tiempo del parametro del interval
 * Es asíncrono por naturaleza.
 * Se ejecutará tan pronto como pueda hacerlo JS
 * Aunque cancelemos la subscripcion, el timer seguirá corriendo (habrá que cancelarlo tambien para evitar fugas de memoria)
 *
 * */

/**
 * FUNCION TIMER
 *
 * Muy parecido al interval, aunque su comprotamiento por defecto puede ser justo lo opuesto
 * Si lanzamos un timer(2000), despues de 2 seg va a emitir el primer valor y se va a completar dicho observable.
 * Esto ees bastante util si sabemos en que momento vamos a ejecutar dicha tarea, pero es mas poderoso que eso
 * Veremos que el timer y el interval son muy parecidos
 * */

const observer = {
  next: val => console.log("next: ", val),
  complete: () => console.log("completado")
};

// creamos nuestro intervalo de tiempo
const interval$ = interval(1000);

// configuracion por defecto del timer
// const timer$ = timer(2000);

// Si ponemos const timer$ = timer(0); estamos diciendo que se lanze instantaneamente, pero no es intantanio sino cuando JS y su stop de callback lo permita

// Con un segundo parametro, creamos practicamente un interval con un timer que inicia en 2 segundos
// const timer$ = timer(2000, 1000);

// Para notificaciones locales, podemos especificar en que momento, en que fecha se dispara dicha notificación.
// Esto podemos hacerlo tambien con el timer
const hoyEn5 = new Date(); // ahora
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);

// emitirá el valor en la fecha indicada y completará la tarea
const timer$ = timer(hoyEn5);

// nos subscribimos a nuestro observable interval$
// comprobamos que efectivamente es asíncrono =>
// const interval$ = interval(0); NO LO HARÁ TAMPOCO SINCRONO, ESTO NO FUNCIONA ASÍ
// console.log("inicio");
// interval$.subscribe(observer);
// console.log("fin");

console.log("inicio");
timer$.subscribe(observer);
console.log("fin");
