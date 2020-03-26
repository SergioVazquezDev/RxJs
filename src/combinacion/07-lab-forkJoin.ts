import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError } from "rxjs/operators";

/**
 * CASO DE USO MAS COMUN DEL FORK JOIN
 * 
 * Realizar peticiones ajax de manera simultanea
 * 
 * */

const GITHUB_API_URL = "https://api.github.com/users";
const GITHUB_USER = "SergioVazquezDev";

// Vamos a hacer tres peticiones simultaneas y cada una de ellas estará con su respectivo identificador
forkJoin({
  // el forkJoin aplana estos observables
  // Usuario de github
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  // Repositorio de ese usuario
  repos: ajax
    // .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/ingreso-egreso-app`) un repo en concreto generaria un error
    .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`)
    .pipe(catchError(err => of([]))), // podemos captur el error y retornar un observable como un objeto vacio. Esto nos permite manejar de manera independiente cada error
  // Gists
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`)
})
  // Se deería realizar las tres peticiones simultaneas y cuando las tres se termine yo obtendré la informacion
  .pipe(catchError(err => of(err))) // capturamos un observable como error
  .subscribe(console.log);
