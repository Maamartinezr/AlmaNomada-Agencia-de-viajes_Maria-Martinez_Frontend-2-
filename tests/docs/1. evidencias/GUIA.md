# Guía de evidencias actualizada

Versión ampliada del 23 de noviembre de 2026. Ejecutar `pnpm dev` y abrir `http://127.0.0.1:5173/`. Los archivos 01 a 06, 08, 09, 10 y 11 corresponden a capturas de la versión ampliada; la captura 07 registra una revisión previa de validaciones y no se utiliza en el informe nuevo.

## Recorrido de referencia

1. En Destinos, pulsa la salida del 10/12/2026 de San Pedro de Atacama. Debe abrir Vuelos con esa fecha y regreso el 14/12/2026, 4 noches.
2. Selecciona 2 viajeras, ida y vuelta, Primera Clase y bolso con carry-on y maleta facturada. Ordena de menor a mayor. El primer vuelo LATAM debe mostrar $945.840 por persona.
3. Consulta Nocturnos: debe quedar la opción de las 22:10. Restablece todos los horarios y elige el primer vuelo.
4. En Hoteles selecciona Suite Deluxe. Prueba incrementar habitaciones hasta 25; no debe permitir 26. Usa la recomendación de 1 habitación y elige Refugio Nómada.
5. Al elegir el hotel se abre el paso Servicios en /#/mi-viaje/servicios. Elige traslado Estándar y Centro histórico y City Tour y pulsa Agregar servicios y ver resumen: debe mostrar **$2.621.880 CLP**. También se puede usar Continuar sin servicios adicionales; debe guardar cero extras y abrir el resumen.
6. Recarga y comprueba persistencia. Solicita reserva, completa nombre y correo ficticios, deja comentarios vacíos y confirma. La ventana debe mostrar «Tu Reserva se realizó con éxito» y la aclaración de simulación.

## Evidencias de los criterios académicos

| Evidencia | Acción | Resultado que se debe mostrar |
|---|---|---|
| 1 Inicio | Abrir /#/ | Marca, menú actualizado y hero original |
| 2 Responsive | Probar 390×844 y escritorio | Menú móvil y controles sin desbordamiento |
| 3 Catálogo | Abrir /#/destinos | 9 destinos, filtros y 18 salidas |
| 4 REST | GET /api/destinos | JSON con fechas, actividades y categorías |
| 5 Vuelos GraphQL | POST /graphql | Query, variables, tarifas y equipajes |
| 6 Hoteles GraphQL | POST /graphql | Tipos de habitación, precios y disponibilidad |
| 7 Selección de destino | Pulsar una fecha del catálogo | Se conserva destino y fecha al abrir vuelos |
| 8 Selección de vuelo | Cambiar clase, equipaje y tipo | Precios variables, horario y disponibilidad |
| 9 Selección de hotel | Elegir Suite Deluxe y cantidad | Precio total de estancia actualizado |
| 10 Resumen | Completar paquete | Fechas, vuelo, habitación, servicios y total |
| 11 React Router | Navegar y recargar resumen | Rutas dinámicas y persistencia |
| 12 useState | Revisar TravelContext y formularios | Actualización de selección y errores |
| 13 useEffect | Revisar useRemote | HTTP, dependencias y cancelación |
| 14 Modularidad | Mostrar carpetas | UI, datos, servicios y reglas separados |
| 15 Repositorio | Publicar fuente | URL real, archivos y commits |
| 16 Pages | Configurar backend público y desplegar | URL real con REST y GraphQL operativos |
| 17 Navegadores | Repetir en Chrome, Firefox y Edge | Versión, captura y resultado real |

Las evidencias REST y GraphQL actuales también están guardadas en `rest-actual.json` y `graphql-actual.json`, con solicitudes y respuestas reales. Esos archivos no se presentan como capturas de Network. Las capturas de GitHub, Pages y los navegadores específicos siguen pendientes hasta ejecutar esas acciones.


Actualización posterior: el informe Word contiene diecisiete capturas actuales, incluido el menú móvil reordenado y 12-redes-sociales.jpg con los logos de TikTok, Instagram y YouTube. Ver docs/actualizacion-menu-redes.md.


## Flujo y experiencias actualizados
- /servicios desde el menú es informativa: no contiene casillas ni total; /mi-viaje/servicios permite seleccionar después de elegir hotel.
- El recorrido y la portada muestran cinco etapas: destino, vuelo, hotel, servicios opcionales y resumen.
- El resumen permite eliminar destino, vuelo, hotel, servicios individuales o todos. Hotel y vuelo limpian sus dependencias; los subtotales se actualizan y la reserva se deshabilita si faltan pasos obligatorios.
- Verificar eliminación individual: 701.100 CLP con extras para una viajera; 641.100 CLP al quitar traslado; 619.100 CLP sin extras; 359.100 CLP al quitar hotel. Recargar conserva los cambios.
- Inicio presenta cinco enlaces Explorar Alma Solo/Friends/Club/Plenitud/Wellness hacia sus rutas individuales. Experiencias incluye público y dos beneficios de cada modalidad. Ver destinos conserva el filtro correspondiente.
- Compilación Vite aprobada y 33 pruebas aprobadas, incluidas cuatro reglas de eliminación y cálculo parcial. No se repitieron las pruebas de cálculo por los cambios posteriores de texto; sí se compiló y se verificaron los cinco enlaces y textos en navegador.
- Capturas nuevas: 15 informativa, 16 paso opcional, 17 servicios móvil, 18 eliminación, 19 resumen móvil, 20 enlaces Inicio, 21 y 22 información de experiencias, 23 experiencias móvil. Se reemplazaron 04, 05, 06, 08 y 09 en el informe.
