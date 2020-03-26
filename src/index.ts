import { ajax } from 'rxjs/ajax';
import { switchMap, map } from 'rxjs/operators';
import { zip, of } from 'rxjs';

/**
 * Ejercicio: 
 *  Realizar 2 peticiones HTTP (ajax) una después de otra.
 *  
 *  La primera debe de obtener el personaje de Star Wars:
 *   Luke Skywalker, llamando el endpoint:   /people/1/
 * 
 *  La segunda petición, debe de ser utilizando el objeto
 *  de la petición anterior, y tomar la especie (species),
 *  que es un arreglo de URLs (array), dentro de ese arreglo, 
 *  tomar la primera posición y realizar la llamada a ese URL,
 *  el cual debería de traer información sobre su especie (Human)
 */

// Respuesta esperada:
// Información sobre los humanos en el universo de Star Wars
// Ejemplo de la data esperada
/*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

// Respuesta esperada con Mayor dificultad
// Retornar el siguiente objeto con la información de ambas peticiones
// Recordando que se disparan una después de la otra, 
// con el URL que viene dentro del arreglo de 'species'

// Tip: investigar sobre la función zip: 
//      Que permite combinar observables en un arreglo de valores
// https://rxjs-dev.firebaseapp.com/api/index/function/zip

// Ejemplo de la data esperada:
/*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/


(() =>{

    // No tocar ========================================================
    const SW_API = 'https://swapi.co/api';   // endpoint                  
    const getRequest = ( url: string ) => ajax.getJSON<any>(url); // respuesta
    // ==================================================================

    // Realizar el llamado al URL para obtener a Luke Skywalker
    getRequest(`${SW_API}/people/1`).pipe( // esta es la info de Luke, pero yo necesito la de especies
        // Realizar los operadores respectivos aquí

        // PRIMERA RESPUESTA:
        // para obtener la llamada de especies, usamos un switchMap
        //switchMap(respuesta => getRequest(respuesta.species[0])) // esto es la respuesta de la raza humana, pero no un objeto que es lo que pretendemos
        // respuesta es toda la info de Luke, y respuesta.species[0] la info de la raza humana, ahora toca combinarlas para el objeto
        // si metemos la respuesta dentro del zip, el warning nos indica que no es un stream, usamos el of y listo :)
        switchMap(respuesta => zip(of(respuesta), getRequest(respuesta.species[0]))),
        // para conseguir esa estructura de objeto, lo mejor el el map, usamos {} para hacer el objeto
        map(([personaje, especie]) => ({personaje, especie}))


        

    // NO TOCAR el subscribe ni modificarlo ==
    ).subscribe( console.log )           // ==
    // =======================================



})();

		