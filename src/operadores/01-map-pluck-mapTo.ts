import { range, fromEvent } from "rxjs";
import { map, pluck, mapTo } from "rxjs/operators";
/**
 * OPERADOR MAP
 *
 * Nos permite transformar lo que recibimos o lo que emite el observable en algo que nosotros ocupemos,
 * nos pueder servir para extraer información o bien para transformarla o para regresar
 * otra cosa totalmente diferente.
 * Trabaja con cualquier tipo de dato que emita y puede regresar cualquier tipo de dato
 * */

/**
 * OPERADOR PLUCK
 *
 * Nos permite extraer simplemente un valor del objeto y
 * que este sea la nueva emisión o salida del objeto observado
 * */

/**
 * OPERADOR MAPTO
 *
 * Nos permite transformar la entrada en una salida especifica que pueden ser numeros, objetos, lo que sea
 * */

// Si queremos que cada valor del observable lo multiplique por 10
// range(1,5).subscribe(val => console.log(val * 10));

// La idea es que cuando sale algo de observar un valor, debe estar lo mas procesado posible (lo mas cerca de lo que yo necesito)
range(1, 5)
  .pipe(
    // map( val => {
    //     // muy importante el return del map si lo ponemos así
    //     return val * 10;
    // })
    // Con el tipado, garantizamos lo que queremos (entrada un numero, salida un string)
    map<number, string>(val => (val * 10).toString())
  )
  .subscribe(console.log);

// const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

// // si tocamos cualquier tecla, obtendremos el flujo
// keyup$.subscribe(val => console.log('map: ', val.code));

// Si queremos hacer lo mismo, pero solo con el code, podemos usar el map
const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");

keyup$.subscribe(console.log);

const keyupCode$ = keyup$.pipe(map(event => event.code));

// si tocamos cualquier tecla, obtendremos el codigo de la tecla presionada
keyupCode$.subscribe(code => console.log("map: ", code));

// Podemos usar el operador pluck para traernos el valor de esa propiedad por cada dato del steam
// const keyupPluck$ = keyup$.pipe(
//     pluck('key')
// );

// Podemos ondar dentro de varios objetos
const keyupPluck$ = keyup$.pipe(pluck("target", "baseURI"));

keyupPluck$.subscribe(code => console.log("pluck: ", code));

// Mostraremos tecla presionada cada vez que llegue un valor del stream
const keyupMapTo$ = keyup$.pipe(
  // regresaremos un string
  mapTo("tecla presionada")
);

keyupMapTo$.subscribe(code => console.log("mapTo: ", code));

// mapTo-Documentación
// https://rxjs-dev.firebaseapp.com/api/operators/mapTo