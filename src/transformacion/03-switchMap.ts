import { fromEvent, Observable } from "rxjs";
import { debounceTime, pluck, mergeMap, switchMap } from "rxjs/operators";

import { ajax } from "rxjs/ajax";

import { GithubUser } from "../interfaces/github-user.interface";
import { GithubUsersResp } from "../interfaces/github-users.interface";

 /**
 * OPERADOR SWITCH MAP
 * 
 * De la misma forma que mergeMap es la combinación de map + mergeAll, 
 * SwitchMap es la combinación de un map + switch. 
 * La particularidad que tiene Switch es que cancelará la subscripción del primer Observable 
 * cuando detecta que el segundo Observable comienza a emitir valores por lo que es 
 * un operador muy útil cuando nos queremos asegurar de no hacer "pooling"
 * 
 * */

// EJEMPLO 1: El mismo que el del mergeAll, pero con mergeMap

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
    // como el mergeMap no es mas que map seguido de un mergeAll, podemos cambiarlo en el ejercicio que hicimos en el mergaAll
    mergeMap<string, Observable<GithubUsersResp>>(
      texto =>
        // Hacemos la peticion para obtener los usuarios filtrando por el texto escrito
        ajax.getJSON(`https://api.github.com/search/users?q=${texto}`) // esto retorna un nuevo observable
    ),
    // Tipando <'Entrada', 'Salida'>
    pluck<GithubUsersResp, GithubUser[]>("items") // Para quedarnos solo con los items
  )
  .subscribe(mostrarUsuarios); // hacemos que la info aparezca en pantalla

// EJEMPLO 2: Usamos switchMap
const url = "https://httpbin.org/delay/1?arg="; // + sergio

input$
  .pipe(
    pluck("target", "value"), // extraemos del target el value
    // Si lo hacemos con mergeMap, se emite un valor o peticion por cada vez que el input emite un valor (muchas peticiones)
    // mergeMap(texto => ajax.getJSON(url + texto))
    switchMap(texto => ajax.getJSON(url + texto)) // con switchMap hacemos la peticion solo con al ultima, ya que el resto de las peticiones son canceladas
  )
  .subscribe(console.log);
