# Entrega 4 Proyecto WEB

## Vídeo

[Dar click aquí para ver vídeo de funcionalidades de la página](https://www.youtube.com/watch?v=oNZW6PsV6wE&feature=youtu.be)
 
## Usabilidad

### Combinaciones adecuadas de tipografía y colores

- La carpeta *./ui/tests/usability* contiene dos evidencias del contraste de los colores principales de la página.
- La tipografía utilizada es la icónica del paradigma de diseño Materialize: Roboto.

### Axe

- La carpeta *./ui/tests/usability/axe* contiene pantallazos evidencia de las pruebas Axe.

### Reglas de diseño

- La carpeta *./ui/tests/usability/evaluation* contiene un documento resumen del cumplimiento de las reglas de diseño.
- La carpeta *./ui/tests/usability/evaluation/screenshots* contiene pantallazos citados en el documento y evidencia de las reglas.

### Internacionalización

- La página está configurada para inglés y español. Dependiendo del lenguaje predeterminado del navegador, la página será mostrada en uno u otro idioma.

### Tests de usabilidad

- La carpeta *./ui/tests/usability/* contiene el documento **resultados_tests_usabilidad.pdf**.

### Otros elementos

- Los demás elementos de calificación son directamente evidenciables en la página web y la materialización del proyecto.

## Ejecución

### Estructura

Tanto el front como el back se ejecutan en este proyecto (no es necesario ejecutar el proyecto de la entrega anterior). El back tiene la implementación de una base de datos PostgreSQL que está en la máquina virtual del estudiante Nicolás Hernández (nm.hernandez10). La IP de la máquina con la base de datos es 172.24.41.67. Esta máquina está en la red local de la Universidad de los Andes, por tanto, cuando se haga el uso y le ejecución de este proyecto, **debe estarse conectado en dicha red físicamente o por medio de una VPN**.

Los elementos del back están distribuidos de la siguiente manera:

- La carpeta *./docs/populate* tiene los scripts (python) utilizados para poblar la base de datos con Artistas, Canciones y Albums.
- La carpeta *./src/routes* tiene en el archivo index.js todas las rutas de los servicios CRUD para cada uno de los 9 recursos.
- La carpeta *./src/models* tiene los modelos de cada uno de los 9 recursos con los atributos y relaciones respectivas.
- La carpeta *./src/controllers* tiene los métodos relacionados a cada ruta creada para realizar el servicio CRUD respectivo.
- El archivo *./src/index.js* contiene la funcionalidad y configuración inicial de la aplicación.

Los elementos del front están distribuidos de la siguiente manera:

- La carpeta *./app tiene* el desarrollo de la interfaz por medio de React y el componente principal del mismo.
- La carpeta *./app/public* tiene los componentes que se consideran de acceso sin haber realizado log in en la página.
- La carpeta *./app/private* contiene los componentes que se consideran sólo de acceso para quien haya realizado log in.
- La carpeta *./app/private/components* tiene componentes extra usados por los componentes privados.

### Instrucciones del despliegue e instalación

1. npm install
2. npm start

### Instrucciones del uso

Las funcionalidades de uso público (sin haber hecho log in):

- **Visualizar página**: descripción de la página, contactos de los programadores, visualizar imágenes descriptivas y funcionalidades principales.
- **Sign Up**: en la pantalla de presentación de la aplicación puede realizarse la inscripción de una cuenta para poder usar la aplicación.
- **Log In**: en la pantalla de presentación de la aplicación puede realizarse el ingreso a una cuenta anteriormente creada.

as funcionalidades de uso público (habiendo hecho log in):

- **Inicio**: El inicio es una sección que unifica todas las publicaciones de los usuarios 'amigos'. Ofrece la funcionalidad de crear publicaciones
y dar 'likes' a las publicaciones ajenas. Pueden eliminarse las publicaciones propias.

- **Playlists**: La página ofrece la creación de listas personalizadas que pueden irse llenando de canciones cualquiera. Esta sección ofrece la creación y
eliminación de playlists. Además también ofrece la agregación de playlists a rooms creados.

- **Rooms**: La funcionalidad principal de la página es poder crear rooms en los que ligar contenido multimedia para reproducirlo. Puede agregarse Artistas,
Albums, Canciones o Playlists creadas anteriormente a rooms.

- **Exploración**: De aquí proviene la música y los elementos que poblarán los playlists y los rooms. Se puede realizar la búsqueda de elementos en esta sección
por nombre y se arrojarán resultados de Usuarios, Artistas, Albums y Canciones que correspondan a dicha búsqueda. Cada elemento encontrado se presenta con
su debida desripción. Los usuarios pueden agregarse de amigos con el fin de visualizar sus publicaciones en la sección de inicio e interactuar con ellas.
Los artistas y albums pueden agregarse a rooms y recibir likes. Las canciones pueden recibir likes, agregarse a rooms y agregarse a playlists.

- **Preferencias**: Esta sección permite visualizar los datos principales de la cuenta (nombre, correo electrónico, imagen de perfil, imagen de banner, etc.) y
realizar cambios sobre estos elementos si es necesario.

- **Log Out**: El usuario puede cerrar sesión en la aplicación web. Sólo basta con presionar el botón dispuesto para ello.

## Diseño

El diseño de la aplicación y mock ups se encuentran en la carpeta *./ui/mockups*.

## Pruebas

- La carpeta *./postman* tiene el archivo .json con las pruebas de postman funcionales.
- La carpeta *./ui/tests* contienen los resultados del ejercicio de card sorting y el respectivo análisis.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Configurations PostgreSQL

*(These steps are not for running this project, they are just for the development team. Do NOT follow these instructions.)*

1. Install sequelize
2. Install sequelize-auto-migrations
3. Install pg (npm install --save pg pg-hstore)
4. Inicializar Sequelize (../node_modules/.bin/sequelize init)
4. Create model files on /models
5. Create migrations (node ../node_modules/sequelize-auto-migrations/bin/makemigration)
6. [if PostgreSQL run on remote devices] Create Firewall Rule incoming to allow connections on port 5432.
7. [if PostgreSQL run on remote devices] C://program files/postgress/11/data and add: (host    all             all      0.0.0.0/0            md5)
8. [if PostgreSQL run on remote devices] Restart PostgreSQL: Open Run Window by Winkey + R -> Type services.msc -> Search PostgreSQL service -> Restart
9. Allow following privileges to user of postgres: Can login? & Create Databases
8. Run migrations (node ../node_modules/sequelize-auto-migrations/bin/runmigration)
