import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";
/** LABORATORIO: CRECERÁ LA BARRA DE PROGRESO A MEDIDA QUE BAJEMOS EN EL SCROLL VERTICAL  */

// creamos un elemento div
const texto = document.createElement("div");

// rellenamos el div
texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin odio felis, pharetra at lectus ac, egestas volutpat massa. Maecenas elementum tellus vel augue commodo venenatis. Cras elementum, mauris ac rhoncus vestibulum, nibh velit egestas dui, pellentesque laoreet neque sapien eget nulla. Vestibulum consectetur sagittis risus, nec maximus elit tempus a. Proin venenatis libero ligula, at faucibus nisl dignissim ac. Praesent ut nulla sed ante vehicula convallis. Pellentesque eu condimentum nulla. Nullam eu metus at urna sagittis tristique eu et leo. Aenean euismod risus id pulvinar dictum. Ut et risus iaculis, pretium purus ut, tempus diam. Quisque quis pulvinar mauris. Mauris maximus vulputate sapien, vitae molestie leo hendrerit et. Nulla ornare bibendum mi facilisis viverra. Aenean leo quam, molestie quis suscipit vel, varius ut urna. Sed mattis, diam ut suscipit malesuada, lacus turpis convallis dui, ac convallis risus ex a ante.
<br/><br/>
Vestibulum mollis blandit elit vel blandit. Fusce nec metus purus. Vivamus feugiat faucibus odio eget malesuada. Cras in gravida mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse tempor lectus non massa ultricies, a ornare eros varius. Maecenas id est vulputate, pretium est non, ultricies tellus. Nam et risus vitae orci aliquet dapibus. Duis at turpis ac mauris tincidunt pellentesque eget at libero. Curabitur iaculis hendrerit tortor, ac volutpat erat rutrum at. Nam venenatis ex a interdum lobortis. Pellentesque id eros quam.
<br/><br/>
Donec at quam non mi congue molestie. Pellentesque et eros vulputate, ornare lectus a, vulputate dui. Donec blandit nisl justo, eu ullamcorper dui sollicitudin eget. Nulla euismod neque a nibh convallis faucibus. Sed dignissim ut dui tristique rutrum. Mauris ultrices laoreet augue, suscipit scelerisque turpis ullamcorper et. Proin commodo enim id rhoncus lobortis.
<br/><br/>
Proin vel vehicula sem, et facilisis enim. Nulla vel faucibus est. Nunc nec ultricies magna. Aliquam erat volutpat. Etiam ultricies accumsan neque, eu condimentum nibh mollis non. Morbi pretium arcu nec nibh cursus sodales. Vestibulum vehicula ante at blandit semper. Aenean in erat nec massa luctus aliquet vitae quis lectus. Morbi pretium nulla nisl, et porta eros volutpat eget. Vestibulum accumsan, mi in vehicula facilisis, lorem elit elementum nibh, ac gravida nisl libero sit amet sem. Fusce consequat libero commodo elementum molestie. Etiam sed varius lacus.
<br/><br/>
Cras in dolor ullamcorper, vulputate neque non, pulvinar enim. Pellentesque tristique risus sapien. Nulla et pretium ante. Aenean fermentum lectus vitae elit ultricies, eget tristique enim semper. Aenean non dapibus erat. Vestibulum et metus sed sem suscipit semper eget et sapien. Aliquam molestie enim porttitor ultrices hendrerit. In consectetur diam a orci lobortis ullamcorper. Phasellus dapibus erat vitae porttitor bibendum. Pellentesque dapibus, neque pharetra dictum ultricies, est nulla imperdiet enim, nec convallis ante erat dignissim sapien.
<br/><br/>
Vestibulum lobortis lorem ante. Curabitur sit amet sem vitae turpis lacinia porttitor. Aenean pretium massa ac quam vestibulum, finibus tincidunt ligula semper. Donec vehicula dolor in tellus scelerisque, a faucibus velit hendrerit. Integer mattis tellus a augue rhoncus, eget pulvinar nibh iaculis. Vivamus volutpat vel nisi et vestibulum. Sed quam ex, fringilla eget accumsan mollis, elementum quis lectus. Aenean a tristique risus. Phasellus ullamcorper convallis arcu at placerat. Nam pharetra, justo at hendrerit interdum, lorem dui rutrum erat, ut lobortis nibh sem vel dui. Proin nec pretium massa. Morbi vitae scelerisque felis, et tincidunt leo. Aenean sed felis rutrum, maximus lectus non, euismod sapien. Pellentesque suscipit viverra fermentum. Nunc non orci sem. Sed vitae gravida ligula.
<br/><br/>
Aenean quis imperdiet nisl, non pulvinar est. Etiam tincidunt molestie velit. Aliquam dignissim ultrices convallis. Morbi dapibus ante bibendum, interdum elit sollicitudin, consequat massa. Sed elit neque, lobortis vitae scelerisque non, congue vitae mi. Vivamus ex sem, accumsan at aliquet id, maximus eu erat. Nam malesuada velit sed elit laoreet fermentum. Quisque dictum feugiat ipsum, dictum facilisis nulla euismod ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eleifend nibh at condimentum bibendum. Mauris euismod vel lorem vitae rhoncus.
<br/><br/>
Pellentesque cursus hendrerit scelerisque. In ac neque tempor, maximus tortor vitae, faucibus ex. Vestibulum a dignissim purus. Morbi vestibulum dictum euismod. Donec fringilla, purus sed interdum aliquam, lorem dui suscipit turpis, vitae mattis elit ante sit amet lacus. Proin ultricies leo id velit euismod vestibulum. Fusce odio ex, fringilla et massa ut, auctor pharetra eros.`;

// creamos la referencia al body
const body = document.querySelector("body");

// mandamos al body el texto que creamos arriba
body.append(texto);

// El progressbar no es mas que un div que está en una posición fija
// que va a ir incrementando su ancho dependiendo del scroll que yo tenga (o bien en base a un porcentaje)
const progressBar = document.createElement("div");

// asignamos la clase css al progressBar
progressBar.setAttribute("class", "progress-bar");
// mandamos al body el progressbar
body.append(progressBar);

// Funcion que hace el cálculo
const calcularPorcentajeScroll = event => {
  // desestructuramos EmcScript6, así puedo extraer todas las propiedades que queramos de este objeto
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = event.target.documentElement;

  // comprobamos que los tres datos tienen valores (lo hemos escrito bien :))
  // console.log({ scrollTop, scrollHeight, clientHeight });

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// Nos subcribimos al scroll del html
// Streams
const scroll$ = fromEvent(document, "scroll");

//scroll$.subscribe(console.log)
const progress$ = scroll$.pipe(
  map(calcularPorcentajeScroll), // map(event => calcularPorcentajeScroll(event))
  tap(console.log) // console log de la informacion del map
);

// este observable deberia emitir cual es el porcentaje en el cual yo necesito establecer a mi progressBar cual es el ancho que el va a tener
progress$.subscribe(porcentaje => {
  progressBar.style.width = `${porcentaje}%`;
});
