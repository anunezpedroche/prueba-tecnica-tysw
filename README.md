# Prueba técnica Tyris SW

## Información inicial
El ejercicio consistirá en cargar una lista de personajes. Como mínimo el listado deberá mostrar el nombre de cada personaje.

Al seleccionar cualquiera de los personajes, se deberá acceder a su detalle (se puede mostrar la información que se desee, en base a lo que
nos provee la API)

Mientras se obtienen los datos de la API, se deberá mostrar un loader.

Se deberán tener contemplado dos casos. En ellos, también se deberá mostrar un mensaje para reintentar la acción:

- El listado llega vacío (se deberá mostrar el mensaje: “No hay datos”)
- La llamada a la API da error por cualquier motivo (se deberá mostrar el mensaje: “Error en la llamada”)
- Se permite utilizar cualquier dependencia para facilitar la implementación, siempre y cuando sea accesible para comprobar el funcionamiento del ejercicio.
- Implementación de tests unitarios.


## Planteamiento
Para resolver este ejercicio aplicando buenas prácticas y clean architecture he ido implementando capas que dejen separado el dominio de la aplicación de la gestión de la UI, de esta forma sería relativamente sencillo cambiar el framework con el que se trabaja puesto que el mapeo de datos y definición de los mismos se encuentra fuera de la UI.

Para ayudar en esta labor se han utilizado las siguientes dependencias:
- Typescript
- Tsyring para utilizar inyección de dependencias
- Reflect-metadata para utilizar decoradores experimentales, posiblemente esto sea innecesario en las últimas versiones de EcmaScript.

En lugar de utilizar create-react-app he decidido utilizar Vite no sólo por su mayor rendimiento y velocidad, si no, por la idea de la organización de React de ir abandonado CRA en favor de compiladores y meta frameworks. Para ello han sido necesarias las siguientes dependencias:
-Vite
-Vitest para realizar los test, jest necesita Babel y requería más librerías para ello.
-jsdom para ayudar a vitest a acceder al dom
-@testing-library/react para tener los métodos de testeo de react

Para manejar el estado global de la aplicación se ha optado por una opción sencilla como Zustand. Esto es debido a que Redux es una solución más compleja y pesada, por otro lado, el uso de un Context Provider podría provocar problemas de rendimiento ya que si cambia un estado del provider vuelve a renderizar todo el árbol de componentes que haya por debajo. De esta forma, Zustand aportaba flexibilidad, sencillez y rendimiento en este caso.

## Retos resueltos y problemas pendientes
- La versión de typescript utilizada no es la última (5.0.2) debido a que hay un problema con la librería tsyringe (también de Microsoft) que hace incompatible los decoradores @inject puesto que espera un tipado más fuerte, he consultado los issues abiertos en ambas librerías y de momento, no hay una solución clara al respecto, al parecer hay una PR pendiente para solucionarlo.

- He tenido que solicitar una nueva API KEY pues la proporcionada para el reto era sólo la parte pública, faltaba la privada para generar un hash. No ha supuesto mayor problema, sólo se remarca para especificar que si el proyecto se descarga desde GitHub fallará por falta de las variables de entorno que no van a ser subidas al repositorio. En el correo adjunto con los ficheros binarios sí estará disponible el fichero .env.local con las variables de entorno necesarias para realizar llamadas a la api de Marvel.

- El motivo de utilizar un estado global para la aplicación en lugar de hacer llamadas a la API de Marvel para devolver la información de cada héroe es porque los endpoint /characters y /characters/{characterId} devuelven realmente la misma información de héroe. Teniéndolos ya, se ahorran llamadas a la API estableciendo un estado global que filtre por id de héroe. En caso de que algún campo no fuese igual, sí sería necesario actualizar el código con llamadas a la API.

- Como no era especificación importante el estilo de la aplicación en un primer lugar se intentó trabajar con CSS Modules, esto me dió algunos problemas a la hora de testear, así que se volvió a unas hojas css y pasando el className correspondiente a cada una o estilando directamente sobre el elemento html. En otras circunstancias podría sugerir el uso de Styled-Components o TailwindCSS dependiendo de las necesidades.

-Existe un pequeño problema cuando se encuentra en la vista de detalle, si se recarga la página en esa vista, los datos mostrados se perderán (la aplicación vuelve a renderizarse entera y en este punto no existen datos). Las soluciones pueden pasar por añadir persistencia de datos para seguir sin realizar una llamada extra a la API, dependiendo de las necesidades del proyecto. Sin la persistencia se podría recuperar el {idHero} de la ruta del navegador y hacer una petición a la API.