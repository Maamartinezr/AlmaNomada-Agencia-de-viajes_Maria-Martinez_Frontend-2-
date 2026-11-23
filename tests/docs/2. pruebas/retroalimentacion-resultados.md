# Verificación de las mejoras por retroalimentación

Fecha de revisión: 23 de noviembre de 2026, America/Santiago.

## Compilación

`pnpm build`: completado correctamente después de aplicar las mejoras. No se añadieron dependencias.

## Pruebas automáticas

`pnpm test`: **20 aprobadas, 0 fallidas**. Se conservaron las 14 pruebas de REST, GraphQL y cálculo y se añadieron 6 pruebas de validación de formularios. Estas cubren nombre y correo comunes, contacto con mensaje obligatorio, reserva con comentarios opcionales, límites de texto, cantidades según cupos, espacios externos sin mutación y campos incompletos.

## Verificación en el navegador integrado

| Recorrido | Resultado observado |
|---|---|
| Enviar contacto vacío | Aparecen errores específicos en los tres campos y el foco pasa a Nombre. |
| Accesibilidad de errores | aria-invalid y aria-describedby relacionan cada campo con su mensaje. |
| Corregir y enviar contacto | Confirmación de demostración con datos ficticios. |
| Navegar a Explorar destinos | Se abre /destinos y el foco pasa a main con id contenido. |
| Activar el enlace de salto con Enter | El foco pasa al contenido sin cambiar la ruta a un ancla interpretada como página. |
| Atacama y segundo vuelo | Se muestran 5 cupos disponibles y hoteles del mismo destino. |
| Elegir hotel y solicitar reserva | El formulario ofrece cantidades de 1 a 5, conforme a los cupos del vuelo. |
| Reserva sin comentarios | El envío válido muestra la confirmación simulada. |
| Menú | Se conservan Inicio, Experiencias, Nosotras, Contacto y Explorar destinos. |

Captura real de validación: `docs/evidencias/07-validacion-formulario.jpg`.

Estas comprobaciones se realizaron en el navegador integrado. No equivalen a completar las pruebas pendientes en Chrome, Firefox y Edge, ni a publicar el proyecto en GitHub Pages. Las capturas anteriores y el informe Word previo conservan los resultados del momento en que se generaron; este registro documenta la revisión posterior.
