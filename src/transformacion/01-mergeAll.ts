import { fromEvent, Observable } from "rxjs";
import { debounceTime, map, pluck, mergeAll } from "rxjs/operators";

import { ajax } from "rxjs/ajax";

import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResp } from '../interfaces/github-users.interface';


/**
 * OPERADORES DE TRANSFORMACION
 * 
 * Nos permiten poder transformar el observable completamente o bien cambiar la emision para que 
 * podamos unificar los observables o las emisiones de los mismos para simplificar todo el código
 *
 * */

 /**
 * OPERADOR MERGE ALL
 * 
 * Sirve para trabajar con observables que internamente retornan observables.
 * Puede emitir distintos observables creando nuevas lineas de tiempo. 
 * Internamente esta subscrito a todas sus lineas, emitiendo como resultado todas las emisiones de todos sus hijos
 * El observable padre, no es completado hasta que todos sus hijos que hayan sido registrados por el mergeAll sean completados
 * 
 * Este procedimiento de unificar observables en una sola salida se conoce como Fattening Operator (operadores de aplanamiento)
 * */


// Referencias
const body = document.querySelector("body");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");
// Añadimos los elementos al html
body.append(textInput, orderList);

// Helpers
// Para hacer que la info aparezca en pantalla
const mostrarUsuarios = (usuarios: GithubUser[]) => {
  console.log(usuarios); // mostramos en consola lo que recibimos 
  orderList.innerHTML = ""; // purgamos el orderList

  // Iteramos los usuarios
  for (const usuario of usuarios) {
    // Creamos una lista
    const li = document.createElement("li");
    // Creamos una imagen para el avatar
    const img = document.createElement("img");
    // Asignamos el avatar al src de la imagen 
    img.src = usuario.avatar_url; // la ventaja de tenerlo tipado nos ayuda el autocomplete

    // Creamos un anchor para ir a la pagina de ese usuario
    const anchor = document.createElement("a");
    // Configuramos el anchor
    anchor.href = usuario.html_url; // Url del usuario de github
    anchor.text = "Ver página";
    anchor.target = "_blank"; // para abrirlo en una nueva pestaña

    // Configuramos los append
    li.append(img);
    li.append("  " + usuario.login + "  ");
    li.append(anchor);

    // Insertamos el li en el orderList
    orderList.append(li);
  }
};

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

// Montamos el set de operadores
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// MUY RECOMENDABLE ESPECIFICAR EL TIPO DE DATO QUE FLUYE A TRAVES DE UN OPERADOR A LO LARGO DEL FUJO DE OPERADORES
// AL MENOS EL PRIMERO (fromEvent<KeyboardEvent> ó debounceTime<KeyboardEvent>) Y EL ULTIMO (el del pluck <GithubUsersResp, GithubUser[]>)
//
// Para obtener las interfaces mediante la respuesta, podemos usar la web QuickType.io https://app.quicktype.io/
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
input$
  .pipe(
    debounceTime<KeyboardEvent>(500), // Esperamos 0.5s antes de continuar para no saturar de peticiones cada vez que escribe
    pluck<KeyboardEvent, string>("target", "value"), // del Keyboard event nos quedamos solo con el value del tarjet
    // Queremos hacer una peticion ajax que obtenga los usuarios de github que coincidan con el texto introducido
    map<string, Observable<GithubUsersResp>>(texto =>
    // Hacemos la peticion para obtener los usuarios filtrando por el texto escrito
      ajax.getJSON(`https://api.github.com/search/users?q=${texto}`) // esto retorna un nuevo observable
    ),
    // Podemos utilizar el mergeAll para que mi respuesta sea el objeto que yo quiero, se subscriba y lo maneje internamente
    mergeAll<GithubUsersResp>(), // Tipamos el mergeAll a la respuerta del ajax
    // Tipando <'Entrada', 'Salida'>
    pluck<GithubUsersResp, GithubUser[]>("items") // Para quedarnos solo con los items
  )
  .subscribe(mostrarUsuarios); // hacemos que la info aparezca en pantalla

