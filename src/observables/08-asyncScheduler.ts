// Cuando lo importamos directamente de rxjs significa que son funciones para crear observables o algun tipo de tipado para los observables
import { asyncScheduler } from "rxjs";

/**
 * ASYNC SCHEDULER
 *
 * no crea un observable, sino una subscripcion.
 * Una subscripcion es el porducto de un subscribe, es decir,
 * el .subscribe de un observable.
 *
 * */

// Podemos hacer estas dos funciones de JS basicamente con asyncScheduler
// setTimeout(() => {}, 3000);
// setInterval(() => {}, 3000);

// creamos nuestra funcion saludar
const saludar = () => console.log("Hola Mundo");
const saludarConArgumento = nombre => console.log(`Hola ${nombre}`);

// Primer argumento la funcion a llamar (NO PUEDE SER UNA FUNCION DE FLECHA, SINO UNA FUNCION NORMAL), pero ojo sin parentesis, con parentesis lanzaria la funcion en ese instante
// Segundo parametro el tiempo en ejecutar el primer parametro
asyncScheduler.schedule(saludar, 2000);

// Tercer parametro, state, solo se puede llamar un state. Si tenemos mas datos deberá ser un objeto (PUEDE SER UN ARREGLO, UN OBJETO, UNA INSTANCIA DE LA CLASE, PERO UN SOLO ARGUMENTO)
asyncScheduler.schedule(saludarConArgumento, 3000, "Sergio");

const subs = asyncScheduler.schedule(
  function(state) {
    console.log("state: ", state);
    // llamamos a la funcion con el nuevo estado y cada cuanto queremos que ser vulsva a lanzar
    this.schedule(state + 1, 1000);
  },
  4000,
  0
);

// Como es una subscripcion, podemos cancelarlo simplemente con el .unsubscribe
// y cancelariamos tambien el ciclo infinito de emision (no aparece el cosole del state)
// setTimeout(() => {
//     subs.unsubscribe();
// }, 8000);

// Cancelaremos esa subscipcion pero sin el setTimeout (lo mismo que el codigo anterior)
asyncScheduler.schedule(() => subs.unsubscribe(), 8000);
