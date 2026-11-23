# Alma Nómada

**Viaja libre. Vive a tu manera.**

Aplicación académica de planificación de viajes para mujeres, desarrollada con React y JavaScript. Integra un backend Node.js mediante una API REST para destinos y una API GraphQL para vuelos y hoteles.

**Evaluación:** Sumativa 2 — Integrando nuestro frontend con backend

## Objetivo del proyecto

Permitir que una usuaria construya una planificación de viaje mediante un recorrido que integra selección de destino, vuelo, hotel y servicios adicionales opcionales.

El proyecto demuestra navegación con React Router, consultas HTTP, manejo de estado, validación de formularios, cálculo de importes y una interfaz adaptable a distintos tamaños de pantalla.

Los datos y las solicitudes de reserva son de demostración. No se realizan pagos, reservas comerciales ni envíos de correos electrónicos.

## Flujo principal

1. Seleccionar un destino y una fecha disponible.
2. Consultar y seleccionar un vuelo.
3. Consultar y seleccionar un hotel.
4. Elegir servicios adicionales o continuar sin agregarlos.
5. Revisar el resumen y el importe estimado.
6. Completar una solicitud de reserva simulada.

El resumen permite modificar y eliminar elementos. Los importes se actualizan según las selecciones que permanecen en el viaje.

## Funcionalidades

### Inicio y navegación

- Encabezado que permanece visible durante el desplazamiento.
- Menú adaptable a escritorio y dispositivos móviles.
- Accesos individuales a las cinco experiencias de la marca.
- Navegación interna mediante React Router.
- Página de recuperación para rutas inexistentes.

### Experiencias

La aplicación presenta cinco modalidades:

| Experiencia | Público y propuesta |
|---|---|
| Alma Solo | Mujeres que desean viajar solas, con libertad e independencia. |
| Alma Friends | Grupos de amigas que desean compartir aventuras y recuerdos. |
| Alma Club | Mujeres que buscan conocer nuevas compañeras en viajes grupales. |
| Alma Plenitud | Mujeres mayores que desean continuar explorando a su ritmo. |
| Alma Wellness | Mujeres que buscan descanso, bienestar y contacto con la naturaleza. |

Cada modalidad incluye información propia y un acceso al catálogo de destinos filtrado.

Las modalidades orientan la experiencia y no constituyen restricciones de acceso por edad o estado civil.

### Destinos

- Catálogo obtenido mediante una consulta HTTP a la API REST.
- Nueve destinos con información descriptiva.
- Búsqueda por nombre y filtros por país y modalidad.
- Detalle individual de cada destino.
- Dos salidas disponibles por destino.
- Selección de fecha para comenzar la planificación.

### Vuelos

- Consulta HTTP POST a la API GraphQL.
- Opciones relacionadas con el destino y la fecha seleccionados.
- Viajes de solo ida o de ida y vuelta.
- Categorías Económico, Ejecutivo y Primera Clase.
- Selección de equipaje.
- Cantidad de viajeras.
- Filtros de horario.
- Ordenamiento por precio o popularidad de demostración.
- Validación de disponibilidad y cupos.

### Hoteles

- Consulta de alojamientos mediante GraphQL.
- Selección de habitación doble o Suite Deluxe.
- Ajuste entre una y veinticinco habitaciones.
- Recomendación de habitaciones según la cantidad de viajeras.
- Validación de disponibilidad durante la estancia.
- Cálculo del alojamiento según tarifa, noches y habitaciones.

### Servicios adicionales

La página disponible desde el menú principal es informativa. Presenta fotografías, descripciones y precios de referencia.

La selección de servicios se realiza dentro del flujo del viaje, después de escoger el hotel.

Las opciones incluyen:

- Transporte desde y hacia el aeropuerto.
- Alquiler de motos, autos y bicicletas.
- Centro histórico y City Tour.
- Naturaleza, historia y arte.
- Tour nocturno y zona de bares.

El paso incluye el botón **Continuar sin servicios adicionales**. Esta acción permite avanzar al resumen sin cargos por servicios.

### Resumen y eliminación de elementos

El resumen muestra destino, vuelo, alojamiento, servicios e importes estimados.

Permite:

- Modificar las selecciones.
- Eliminar un servicio individual.
- Eliminar todos los servicios adicionales.
- Eliminar el hotel y sus servicios asociados.
- Eliminar el vuelo, el hotel y los servicios asociados.
- Eliminar el destino y vaciar la planificación.

Cuando falta un elemento obligatorio, se conserva la información restante y se muestra el subtotal seleccionado. La solicitud de reserva queda deshabilitada hasta completar los pasos pendientes.

### Formularios y reserva

- Validación compartida entre contacto y reserva.
- Validación de nombre, correo y campos requeridos.
- Mensajes de error asociados a los campos.
- Solicitud de reserva mediante una ventana modal.
- Confirmación identificada expresamente como simulación.

## Tecnologías utilizadas

| Área | Tecnologías |
|---|---|
| Frontend | React 19, JavaScript, JSX, HTML5 y CSS |
| Construcción | Vite |
| Navegación | React Router DOM con HashRouter |
| Estado | Context API, useState y sessionStorage |
| Efectos y consultas | useEffect, Fetch y AbortController |
| Backend | Node.js y Express |
| API REST | Rutas Express con respuestas JSON |
| API GraphQL | GraphQL.js, esquema, resolvers y variables |
| Configuración | dotenv y CORS |
| Iconografía | Lucide y símbolos de redes sociales |
| Tipografías | Playfair Display, Montserrat y Caveat |
| Dependencias | pnpm y configuración de workspace |
| Pruebas | Ejecutor de pruebas de Node.js |

## Arquitectura

El frontend consulta los servicios del backend mediante HTTP:

```text
React
 ├── destinosService
 │    └── GET /api/destinos
 │         └── Express → datos de destinos
 │
 └── graphqlService
      └── POST /graphql
           └── Esquema y resolvers → vuelos y hoteles
```

Los datos de destinos, vuelos y hoteles se mantienen separados del código de presentación.

La implementación GraphQL utiliza un servidor con esquema, validación y ejecución de consultas. No consiste en una simulación de consultas dentro del navegador.

## Organización del proyecto

```text
backend/
├── data/                  Datos de demostración
├── graphql/               Esquema y resolvers
├── routes/                Rutas REST
├── .env.example           Ejemplo de configuración
├── app.js                 Express, CORS y manejo de errores
├── package.json           Dependencias del backend
└── server.js              Inicio del servidor

frontend/
├── public/                Imágenes, logotipos y recursos
├── src/
│   ├── components/        Componentes reutilizables
│   ├── context/           Estado de la planificación
│   ├── data/              Experiencias y servicios adicionales
│   ├── hooks/             Consultas y estados remotos
│   ├── pages/             Páginas del aplicativo
│   ├── services/          Clientes HTTP, REST y GraphQL
│   ├── styles/            Estilos y adaptación responsive
│   ├── utils/             Cálculos y reglas de selección
│   └── App.jsx            Configuración de rutas
├── .env.example           Ejemplo de configuración
├── index.html             Entrada HTML
├── package.json           Dependencias del frontend
└── vite.config.js         Configuración de Vite

docs/                      Informe y evidencias
scripts/                   Herramientas de preparación del proyecto
tests/                     Pruebas automatizadas
.gitignore                 Exclusiones del repositorio
.node-version              Versión de Node.js
iniciar.cmd                Inicio local en Windows
package.json               Configuración principal
pnpm-lock.yaml             Versiones de dependencias
pnpm-workspace.yaml        Relación entre frontend y backend
README.md                  Documentación del proyecto
```

Las carpetas `node_modules` y `dist` no forman parte de la entrega del código fuente. Se generan durante la instalación y la compilación.

## Requisitos de ejecución local

- Node.js 24.
- pnpm 11.25.0.
- Navegador web.
- Conexión a Internet durante la instalación inicial de dependencias.

El frontend y el backend deben permanecer en ejecución para utilizar el flujo completo.

## Descargar el proyecto desde GitHub

1. Abrir el repositorio.
2. Seleccionar **Code → Download ZIP**.
3. Extraer el archivo ZIP.
4. Abrir la carpeta que contiene el `package.json` principal, junto con las carpetas `frontend` y `backend`.

No se debe ejecutar la aplicación directamente desde el archivo comprimido.

## Ejecutar en Windows

Con Node.js y pnpm instalados:

1. Abrir la carpeta principal del proyecto.
2. Hacer doble clic en `iniciar.cmd`.
3. Esperar la instalación inicial de dependencias, si corresponde.
4. Mantener abierta la ventana de ejecución.
5. Abrir en el navegador:

   http://127.0.0.1:5173/

El archivo de inicio ejecuta frontend y backend. Al detenerlos, las direcciones locales dejan de estar disponibles.

## Ejecución manual para revisión técnica

Desde la carpeta principal:

```bash
pnpm install
pnpm dev
```

Direcciones locales:

| Servicio | Dirección |
|---|---|
| Frontend | http://127.0.0.1:5173 |
| Backend | http://127.0.0.1:4000 |
| Estado del backend | http://127.0.0.1:4000/health |
| Destinos REST | http://127.0.0.1:4000/api/destinos |
| GraphQL | POST http://127.0.0.1:4000/graphql |

Estas direcciones funcionan en la computadora donde se ejecuta el proyecto. No son enlaces públicos de una aplicación desplegada.

## Configuración

Se incluyen archivos `.env.example` como referencia.

Durante el desarrollo local, Vite redirige las solicitudes `/api` y `/graphql` al backend del puerto 4000.

El backend utiliza:

| Variable | Función |
|---|---|
| `PORT` | Puerto del servidor; por defecto, 4000. |
| `CORS_ORIGINS` | Orígenes autorizados para consultar la API. |

El frontend admite `VITE_API_URL` para configurar otro origen del backend cuando sea necesario.

Los archivos `.env` y `.env.local` no deben publicarse en el repositorio.

## API REST

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/health` | Estado del servidor |
| GET | `/api/destinos` | Catálogo de destinos |
| GET | `/api/destinos/:id` | Detalle de un destino |

Los identificadores inexistentes devuelven una respuesta JSON con estado HTTP 404.

## API GraphQL

El endpoint recibe solicitudes POST en `/graphql`.

Ejemplo de consulta:

```graphql
query Opciones($destinoId: ID!) {
  vuelosPorDestino(destinoId: $destinoId) {
    id
    aerolinea
    fechaSalida
    precio
    moneda
    disponible
  }
  hotelesPorDestino(destinoId: $destinoId) {
    id
    nombre
    precioPorNoche
    moneda
    disponible
  }
}
```

Variables de ejemplo:

```json
{
  "destinoId": "atacama"
}
```

La solicitud envía `query` y `variables` en un cuerpo JSON. El servidor valida campos, tipos y variables mediante GraphQL.js.

## Rutas principales

La aplicación utiliza HashRouter. Por ejemplo, la ruta `/destinos` se visualiza como `/#/destinos`.

| Ruta | Función |
|---|---|
| `/` | Inicio |
| `/destinos` | Catálogo y filtros |
| `/destinos/:id` | Detalle de destino |
| `/vuelos/:destinoId` | Selección de vuelo |
| `/hoteles/:destinoId` | Selección de hotel |
| `/mi-viaje/servicios` | Selección de servicios opcionales |
| `/resumen` | Resumen, modificaciones y eliminaciones |
| `/experiencias` | Información de las cinco modalidades |
| `/experiencias/:id` | Detalle de una modalidad |
| `/servicios` | Catálogo informativo de servicios |
| `/nosotras` | Información de la marca |
| `/contacto` | Formulario de contacto |

## Estado y persistencia

`TravelContext` administra la planificación con `useState` y conserva los datos en `sessionStorage`.

La selección puede mantenerse al recargar durante la misma sesión del navegador. No se almacena en una cuenta de usuario ni se sincroniza con un servidor.

Las reglas de eliminación y sus dependencias se centralizan en `tripSelection.js`.

Las consultas utilizan `useRemote`, que administra carga, errores y reintentos. `AbortController` permite cancelar solicitudes anteriores.

## Cálculo de importes

Todos los importes se expresan en pesos chilenos, CLP.

```text
Total estimado =
  vuelos según categoría, equipaje, tramos y viajeras
  + alojamiento según tarifa, noches y habitaciones
  + servicios adicionales seleccionados
```

Las actividades se calculan por viajera. Los traslados se calculan por vehículo y los alquileres consideran un día, según la unidad indicada en la interfaz.

Al eliminar un elemento, su importe deja de incluirse en el total.

## Pruebas y compilación

Para ejecutar las pruebas:

```bash
pnpm test
```

Para compilar el frontend:

```bash
pnpm build
```

La última verificación registrada aprobó 33 pruebas automatizadas y la compilación de Vite.

Los archivos de pruebas cubren:

| Archivo | Cobertura |
|---|---|
| `api.test.js` | REST, GraphQL, errores, relaciones y cálculos |
| `formValidation.test.js` | Reglas compartidas de contacto y reserva |
| `planning.test.js` | Fechas, vuelos, equipajes, hoteles y servicios |
| `tripSelection.test.js` | Eliminación de elementos, dependencias y subtotales |

También se verificaron en el navegador integrado el flujo de cinco etapas, la opción de continuar sin servicios, las eliminaciones, la persistencia, la reserva simulada y los enlaces de experiencias.

Las comprobaciones realizadas no equivalen a una certificación de compatibilidad en todas las versiones de Chrome, Firefox y Edge.

## Accesibilidad y presentación

- Estructura HTML semántica.
- Enlace para saltar al contenido.
- Etiquetas asociadas a los campos.
- Estados de carga, error y confirmación.
- Gestión del foco al navegar.
- Ventana modal de reserva.
- Controles utilizables mediante teclado.
- Diseño adaptable a escritorio y móvil.
- Paleta Terracota y Arena, coherente con la identidad de Alma Nómada.

## Documentación y evidencias

La carpeta `docs` contiene el informe y los materiales de respaldo de la entrega.

Incluye el informe Word:

[Informe de evidencias de Alma Nómada](docs/Informe%20de%20evidencias_Alma%20Nomada_Maria%20Martinez.docx)

Las capturas documentan funcionalidades y recorridos del aplicativo. Deben interpretarse junto con las limitaciones y verificaciones indicadas en el informe.

## Alcance de la entrega

La entrega consiste en disponibilizar el código fuente completo, el backend, los datos de demostración, las pruebas y la documentación en un repositorio de GitHub.

El proyecto está preparado para ejecutarse localmente. Esta entrega no requiere configurar GitHub Pages ni contratar un alojamiento del backend.

Subir los archivos a GitHub permite revisar y descargar el proyecto; no inicia automáticamente el servidor ni convierte el repositorio en una aplicación pública en funcionamiento.

## Limitaciones

- Los destinos, vuelos, hoteles, tarifas y disponibilidades corresponden a datos de demostración.
- Los nombres de aerolíneas se utilizan como referencia y no acreditan itinerarios comerciales reales.
- Las fotografías son ilustrativas.
- Contacto y reserva son simulaciones locales.
- No se procesan pagos ni se envían correos.
- No existe autenticación de usuarias.
- La planificación se conserva en la sesión del navegador.
- El backend debe estar activo para consultar destinos, vuelos y hoteles.

## Autoría

María Alejandra Martínez Reverol

Proyecto desarrollado para la asignatura **Frontend II**.
