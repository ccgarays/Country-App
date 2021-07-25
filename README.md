# Project - Country App

<p align="left">
  <img height="200" src="./countries.png" />
</p>

## Comenzando

El proyecto tiene dos carpetas: api y client. En estas carpetas estará el código del back-end y el front-end respectivamente. En api complete el archivo llamado .nev_example con las credenciales de la base de datos. Adicionalmente será necesario que creen desde psql una base de datos llamada `countries`. El contenido de `client` fue creado usando: Create React App.

## About

La idea general es crear una aplicación en la cual se pueda ver información de  distintos paises utilizando la api externa [restcountries](https://restcountries.eu/) y a partir de ella poder, entre otras cosas:

  - Buscar paises
  - Filtrarlos / Ordenarlos
  - Crear actividades turísticas

#### Tecnologías usadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

La aplicación se desarrolla usando React/Redux y contiene las siguientes pantallas/rutas.

__Pagina inicial__: 
- [ ] Imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__:
- [ ] Input de búsqueda para encontrar países por nombre
- [ ] Área donde se observa el listado de países. Al iniciar se cargan los primeros resultados obtenidos desde la ruta `GET /countries` y mostrara:
  - Imagen de la bandera
  - Nombre
  - Continente
- [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
- [ ] Paginado para ir buscando y mostrando los siguientes paises

__Ruta de detalle de país__:
- [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
- [ ] Código de país de 3 letras (id)
- [ ] Capital
- [ ] Subregión
- [ ] Área (Mostrarla en km2 o millones de km2)
- [ ] Población
- [ ] Actividades turísticas con toda su información asociada

__Ruta de creación de actividad turística__:
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Dificultad
  - Duración
  - Temporada
- [ ] Posibilidad de seleccionar/agregar varios países en simultaneo
- [ ] Botón/Opción para crear una nueva actividad turística

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] País con las siguientes propiedades:
  - ID (Código de 3 letras) *
  - Nombre *
  - Imagen de la bandera *
  - Continente *
  - Capital *
  - Subregión
  - Área
  - Población
- [ ] Actividad Turística con las siguientes propiedades:
  - ID
  - Nombre
  - Dificultad (Entre 1 y 5)
  - Duración
  - Temporada (Verano, Otoño, Invierno o Primavera)

#### Backend

Se desarrolla un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /countries__:
  - Inicialmente traen todos los países desde restcountries y guardan en la DB para luego utilizarlos desde allí
  - Obtiene un listado de los primeros 10 países
- [ ] __GET /countries/{idPais}__:
  - Obtiene el detalle de un país en particular
  - Trae solo los datos pedidos en la ruta de detalle de país
  - Incluye los datos de las actividades turísticas correspondientes
- [ ] __GET /countries?name="..."__:
  - Obtiene los países que coinciden con el nombre pasado como query parameter
  - Si no existe ningún país se muestra un mensaje adecuado
- [ ] __POST /activity__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
  - Crea una actividad turística en la base de datos
