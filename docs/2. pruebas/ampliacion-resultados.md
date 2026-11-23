# Pruebas de la ampliación

Fecha: 23 de noviembre de 2026. Entorno Windows, Node.js 24 y pnpm 11.25.0.

## Automatización

Compilación Vite completada. Suite: **29 pruebas aprobadas y 0 fallidas** antes de la entrega. Se actualizaron las pruebas anteriores al catálogo de nueve destinos y se añadieron reglas de fechas, tarifas, equipaje, regreso, ordenamiento, horarios, habitaciones y servicios. Los JSON de los destinos no se importan en los componentes React.

## Navegador integrado

| Comprobación | Resultado real |
|---|---|
| Catálogo | 9 destinos y 18 salidas visibles con botones por fecha |
| Fecha cliqueable | Atacama 10/12/2026 abre sus 4 vuelos; 08/04/2027 también tiene 4 |
| Clases y equipaje | Primera Clase y equipaje facturado actualizan importes |
| Solo ida | LATAM, Primera Clase y equipaje facturado: $495.600 por persona |
| Ida y vuelta | Mismo vuelo: $945.840 por persona, regreso 14/12/2026 |
| Nocturnos | Muestra salida 22:10 disponible |
| Orden de vuelos | Precio descendente observado y popularidad coloca JetSMART primero |
| Suite Deluxe | Cambia la tarifa por habitación y el total de estancia |
| Habitaciones | Incremento hasta 25; botón + deshabilitado en el máximo; recomendación vuelve a 1 para 2 viajeras |
| Orden de hoteles | Descendente y popularidad comprobados |
| Refugio Nómada | Seleccionable para Atacama 10/12 al 14/12 |
| Servicios | Traslado estándar + City Tour de 2 viajeras: $104.000 adicionales |
| Resumen | Total $2.621.880 CLP; muestra clase, equipaje, check-in, regreso, Suite Deluxe, habitación y servicios |
| Reserva | Ventana emergente; datos ficticios válidos y comentarios opcionales; confirmación de simulación |
| Persistencia | El resumen conserva $2.621.880 después de recargar |
| Móvil | Servicios a 390×844 con 13 opciones; contenido sin desbordamiento horizontal |
| Redes | Enlaces externos con target=_blank y rel=noopener noreferrer hacia los tres accesos de sesión |
| Consola | Sin errores en el registro consultado durante la revisión |

Ejemplo de cálculo: 2 × $945.840 + 4 noches × $156.550 × 1 habitación + $60.000 traslado + 2 × $22.000 City Tour = $2.621.880 CLP.

## Alcance

El informe Word fue regenerado con nueve capturas de la versión actual y validado estructuralmente. El motor de renderizado de documentos no está disponible en este entorno Windows, por lo que no se afirma una revisión automática de su paginación.

No se realizaron reservas comerciales ni inicio de sesión en redes sociales. Los enlaces de TikTok y YouTube se contrastaron con sus páginas de sesión; Instagram puede limitar consultas automatizadas. La verificación del navegador integrado no equivale a pruebas ejecutadas en Chrome, Firefox, Edge o Safari. GitHub Pages y backend público siguen pendientes.
