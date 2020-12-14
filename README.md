# ADI
 PRACTICA 3 DE ADI
 desarrollo del cliente con CORS en el servidor.

# Herramientas empleadas:
 Para el desarrollo de la práctica 3 he utilizado vue-cli, Vuex, Vuetify, Vue Router, validation, cors(en el servidor) y axios.

# Requisitos implementados:
 Para el desarrollo del cliente he implementado el Login/Logout/Registro con localStorage de Vuex (/src/store/)
 
 He implementado el CRUD de Marcas, Categorías,Articulos y Usuarios.

 Considero haber implementado todo lo solicitado, tanto los requisitos mínimos como opcionales.

# Estructura del proyecto:
 He utilizado la estructura de vue-cli donde los directorios representan lo siguiente:
   * /src/components: Almacena los componentes .vue que se cargan de manera dinámica en App.vue, todos ellos utilizan VUETIFY 
   * /src/models: En principio se iba a utilizar para crear clases de las distintas entidades para su manejo, aunque he prescindido de ello por falta de tiempo.
   * /src/router: En este directorio se controlan las rutas definidias y a las que pueden acceder los usuarios.
   * /src/services: En este directorio se almacenan los archivos que se encargan de la comunicación asíncrona con el servidor.
   * /src/store: Aquí se encuentra la parte de Vuex donde se aplica la lógica del localStorage con su state, getters, actions y mutations.
   * /src/views: En esta carpeta he optado por dejar las vistas que no son considerada componentes individuales y que se crean por defecto al crear el proyecto.
   * /src/App.vue: Este archivo es el que se asocia con la vista principal y es el contiene el navbar de la web, el footer y es aquí donde se inyectan el resto de componentes.
   * /src/main.js: Este archivo se encarga de configurar algunos de los plugins/extensiones que utiliza el cliente.
   
## DETALLES IMPORTANTES:
 Puesto que necesitamos agregar el accessToken a las peticiones en más de un caso, y con el fin de no repetir código, he optado por utilizar la función "beforeMount" en /src/main.js para agregar el Authorization: BEARER + accessToken al header de las peticiones lanzadas al servidor.

 Adicionalmente, he tratado de emplear distintas funcionalidades de vuetify para tratar de proveer a los usuarios de una experiencia más satisfactoria.

 Cabe destacar que la parte en la cual me he centrado mayormente y con la cual he quedado más satisfecho es en la vista del administrador.

 Por último, quiero decir que no he tenido tiempo de crear seeds para la base de datos, por ello dejo aquí el usuario administrador principal para poblar la api:
    email: admin
    password: admin

En caso de que no exista un ADMIN, esta es la sintaxis empleada para crearlo (Es deseable que sea el usuario con id=1 por temas de la implementación del cliente):
    {
	"usuario": {
            "email": "admin",
            "password": "admin",
            "nombre": "Brian Mathias",
            "apellidos": "Pesci Juliani",
            "telefono": "644457371",
            "fechaNac": "1994-08-05",
            "rol": "admin"
        }
    }

# Puesta en marcha:
 Para descargar las despendencias del client/servidor hay que acceder a los directorios y ejecutar "npm install -y", tras esto hay que ejecutar npm run serve y npm run dev, ejemplo:
 
 (En caso de que falle en algún punto hay que volver a ejecutar el comando)
 Descargar dependencias client y lanzar:
    $ cd client
    $ npm install -y
    $ npm run serve
 Descargar dependencias servidor y lanzar:
    $ cd servidor
    $ npm install -y
    $ npm run dev  // Mirar los script del archivo  
                   // package.json para más opciones.
  
### NOTA: 
  * El cliente escucha en el puerto 8080, se puede cambiar en el archivo "/client/vue.config"
  * El servidor escucha en el puerto 3000, se puede cambiar en el archivo "/servidor/server.js"