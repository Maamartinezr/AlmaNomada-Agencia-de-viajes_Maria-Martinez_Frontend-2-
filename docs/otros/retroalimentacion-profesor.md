# Aplicación de la retroalimentación del profesor

La revisión se aplica a Alma Nómada según las tecnologías y responsabilidades presentes. Las recomendaciones proceden de una evaluación anterior de inventario y compra; no añaden requisitos de framework CSS, carrito o inventario a esta evaluación de REST y GraphQL.

## Decisiones de aplicación

| Recomendación | Situación en Alma Nómada | Decisión |
|---|---|---|
| Reducir CSS propio y fortalecer el framework | Solo se usa CSS tradicional, permitido por la pauta actual. No se usa un framework CSS. | No se migra ni se añade Tailwind o Bootstrap. Se conservan estilos de marca y componentes compartidos. |
| Unificar Bootstrap, Tailwind y CSS | No existen Bootstrap ni Tailwind en las dependencias. | No aplica la corrección de solapamientos. |
| Separar carrito e inventario | No hay carrito ni inventario. El catálogo está en el backend y la selección está en TravelContext. | No aplica. |
| Simplificar InventoryContext | No existe InventoryContext, navigator.locks ni migraciones de productos. TravelContext solo conserva y actualiza la planificación. | Se mantiene el contexto sencillo actual. |
| Reducir búsquedas y manipulación del DOM | App y Header buscaban el contenido con getElementById. | Se utiliza useRef; NavigationEffects concentra el cambio de título y la solicitud de enfoque al navegar. El enlace de salto comparte el mismo manejador. |
| Reutilizar Filters entre dos listados | Solo Destinations tiene búsqueda, país y modalidad. Home muestra destacados sin repetir controles. | No se crea una abstracción sin reutilización real. |
| Convertir el catálogo en ruta real | El catálogo usa la ruta /destinos con React Router. | Ya se cumple. HashRouter sirve para alojar rutas en Pages; no equivale a un ancla #catalogo. |
| Centralizar validaciones | ContactForm compartía UI entre contacto y reserva, pero declaraba reglas y límites dentro del componente. | formValidation.js reúne reglas, límites y errores. Ambos formularios usan la misma función y sus atributos HTML leen esas constantes. |

## Esquema de responsabilidades

| Área | Responsable | Alcance |
|---|---|---|
| Rutas | App.jsx y React Router | Elegir la página; conservar las rutas existentes del flujo. |
| Accesibilidad al navegar | NavigationEffects.jsx y referencia del contenido en App | Enfocar el contenido y volver al inicio al cambiar página; actualizar el título. |
| Presentación de navegación | Header.jsx y estilos CSS | Menú responsive, encabezado sticky y botón Explorar destinos. |
| Catálogo | Express, destinosService.js y Destinations.jsx | Entregar destinos por REST, gestionar carga y filtrar sin modificar datos originales. |
| Vuelos y hoteles | graphqlService.js y esquema/resolvers del backend | Consultar opciones por HTTP GraphQL y relacionarlas con destinoId. |
| Planificación compartida | TravelContext.jsx | Selecciones, noches, viajeras y sessionStorage; limpiar opciones incompatibles. |
| Cálculo | utils/travel.js | Fechas, estancia, habitaciones y costo estimado sin mezclar monedas. |
| Datos recibidos | services/validation.js | Revisar la forma de respuestas REST y GraphQL. |
| Formularios | utils/formValidation.js y ContactForm.jsx | Centralizar reglas; mostrar errores por campo y enfocar el primero con useRef. |

## Cambios concretos

La validación conserva el mensaje obligatorio de contacto y los comentarios opcionales de reserva. Ahora limita las viajeras a los cupos del vuelo seleccionado y al máximo general de ocho. Los errores tienen mensajes específicos, aria-invalid y aria-describedby; el foco se dirige al primer campo inválido mediante referencias de React. La confirmación sigue siendo local y simulada.

La lectura de document.title y window.scrollTo son efectos de navegación explícitos, no búsquedas de nodos ni modificaciones del estado de React. El getElementById de main.jsx se conserva únicamente para montar la aplicación en el nodo root de Vite.

Se conservan el menú sticky y los últimos cambios: no aparecen Nuestros viajes ni el enlace duplicado Destinos; el acceso al catálogo es Explorar destinos. No se cambia la paleta, las fotografías ni la distribución del sitio.

## Verificación

Las pruebas nuevas de formValidation.test.js cubren reglas comunes, mensajes opcionales, límites de longitud, cupos, normalización sin mutación y campos incompletos. El resultado de la ejecución y las limitaciones de la revisión se registran en docs/pruebas/retroalimentacion-resultados.md.
