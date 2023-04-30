El ejercicio consistirá en cargar una lista de personajes. Como mínimo el listado deberá mostrar el nombre de cada personaje.

Al seleccionar cualquiera de los personajes, se deberá acceder a su detalle (se puede mostrar la información que se desee, en base a lo que
nos provee la API)

Mientras se obtienen los datos de la API, se deberá mostrar un loader.

Se deberán tener contemplado dos casos. En ellos, también se deberá mostrar un mensaje para reintentar la acción:

- El listado llega vacío (se deberá mostrar el mensaje: “No hay datos”)
- La llamada a la API da error por cualquier motivo (se deberá mostrar el mensaje: “Error en la llamada”)
- Se permite utilizar cualquier dependencia para facilitar la implementación, siempre y cuando sea accesible para comprobar el funcionamiento del ejercicio.
- Implementación de tests unitarios.


- Lista de Personajes 
- Hasta que no haya datos, mostrar loader
- Al clickar en un personaje, desplegar detalle
- Si el listado llega vacío, mostrar 'No hay datos'
- Si hay error en la API. Mostrar mensaje 'Error en la llamada' (Da igual el motivo)
- Implementar test unitarios

Notas
- La versión de typescript utilizada no es la última (5.0.2) debido a que hay un problema con la librería tsyringe (también de Microsoft) por lo que todavía no es compatible. Para trabajar con inyección de dependencias es necesaria esta librería

- Se ha tenido que generar una nueva API KEY en marvel api, ya que faltaba el hash para poder hacer la petición a la api

- He decidido utilizar Zustand para manejar el estado global de la aplicación por diversos motivos:
    - Utilizar un context con un state o un reducer provocaría un renderizado de todo componente hijo en el árbol de componentes, siendo una solución ineficiente en una aplicación que pueda crecer.
    - Después de estudiar que la api devuelve la misma información en la petición de devolver todos los carácteres que en la de un sólo héroe, me ha parecido que podría ahorrar peticiones a la API introduciendo un estado global para la app.
    - Es una librería ligera y ofrece una solución más sencilla de implementar que Redux o similares.