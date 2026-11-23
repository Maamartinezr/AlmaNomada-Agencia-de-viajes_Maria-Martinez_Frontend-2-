# Ampliación de la planificación de Alma Nómada

La actualización conserva React, React Router, useState/useEffect, Express, REST de destinos y GraphQL real de vuelos/hoteles. No añade frameworks ni dependencias.

## Implementación

- 9 destinos: los 6 originales más Isla de Margarita, Riviera Maya y Marsella.
- 2 salidas exactas por destino, con regreso y noches de la tabla solicitada. Las fechas se reciben por REST y son botones que seleccionan el destino y abren sus vuelos.
- 4 vuelos por fecha, 72 en total. Cada fecha tiene 3 alternativas disponibles y una agotada. Hay alternativas disponibles por la mañana, tarde y noche.
- Nombres reales de aerolíneas referenciales, sin «Mock» en el nombre; las rutas, horarios, disponibilidad, popularidad y precios siguen siendo ficticios. Las categorías académicas no acreditan que cada aerolínea venda todas esas clases en una ruta real.
- Cada vuelo admite Económico, Ejecutivo y Primera Clase; bolso, bolso con carry-on de 10 kg o bolso/carry-on/maleta de 23 kg. Los precios y las opciones se obtienen en GraphQL.
- Ida y vuelta o solo ida. El regreso utiliza la fecha del calendario y una tarifa por tramo. En ida y vuelta, el equipaje se calcula para ambos tramos. Asientos elegidos al hacer Check-In.
- Orden por precio ascendente, descendente o popularidad en vuelos y hoteles; siempre sobre una copia de las listas.
- Habitación doble o Suite Deluxe, capacidad de 2 viajeras por habitación y controles de 1 a 25. La recomendación es ceil(viajeras / 2); el total permite elegir más habitaciones.
- Refugio Nómada · San Pedro de Atacama disponible para las nuevas fechas. Antes estaba deshabilitado porque sus datos indicaban disponible=false y una lista vacía de fechas; no era un bloqueo exigido por la evaluación.
- Servicios comunes a todos los destinos: 3 traslados, 7 alquileres y 3 actividades. Solo puede elegirse un tipo de traslado; las actividades se calculan por viajera y los alquileres como un vehículo durante un día.
- Ventana de reserva accesible, con validación y confirmación «Tu Reserva se realizó con éxito», acompañada de la aclaración de simulación local.
- Botones externos TikTok, Instagram y YouTube hacia inicio de sesión; no se inventan perfiles comerciales de la marca.

## Costo estimado

Vuelos = (tarifa de ida + regreso si se elige + equipaje por tramo) × viajeras.

Alojamiento = tarifa del tipo de habitación × noches × habitaciones.

Total = vuelos + alojamiento + servicios seleccionados. Moneda única CLP. Los importes no son cotizaciones comerciales reales.

En ida y vuelta, las noches están ligadas a las fechas de salida y regreso. En solo ida se pueden elegir de 1 a 14 noches. Las habitaciones se recomiendan automáticamente y pueden ajustarse. Una selección sin capacidad suficiente no permite confirmar una solicitud.

## Evidencias actuales

El informe Word y su versión HTML usan capturas nuevas de la versión ampliada. Las verificaciones están en docs/pruebas/ampliacion-resultados.md. Los informes anteriores de pruebas describen revisiones históricas y no reemplazan este registro.

## Fuentes de referencia

Nombres de aerolíneas con actividad en Chile: [JAC 2026](https://www.jac.gob.cl/wp-content/uploads/2026/05/202604-Informe.pdf) y [FNE](https://www.fne.gob.cl/wp-content/uploads/2026/06/inpu_F446_2025.pdf). Estas fuentes no respaldan los itinerarios ficticios del aplicativo. Fotografías y atribuciones en docs/recursos.md.

Enlaces de redes: [TikTok](https://www.tiktok.com/login), [Instagram](https://www.instagram.com/accounts/login/) y [YouTube](https://www.youtube.com/signin). El acceso final depende de la disponibilidad del proveedor y puede requerir cookies o inicio de sesión.
