# Registro de pruebas

Registro histórico de la primera versión. Para la versión ampliada vigente, consultar [resultados de la ampliación](ampliacion-resultados.md), con 29 pruebas y capturas actualizadas.

Sesión de desarrollo: 22 de noviembre de 2026, zona America/Santiago. Entorno: Windows, Node.js 24.22.1, pnpm 11.25.0.

## Compilación

`pnpm build`: compilación Vite de producción completada correctamente. Se incluyen recursos gráficos y tipografías locales. La compilación por sí sola no demuestra que exista un backend público.

## API y cálculo

`node --test --test-reporter=tap tests/api.test.js`: **14 aprobadas, 0 fallidas** en la ejecución autorizada. El primer intento dentro del sandbox impidió conexiones a 127.0.0.1 (`EACCES`); se repitió fuera de ese aislamiento y todas pasaron. Esa incidencia fue del entorno y no se oculta como prueba exitosa inicial.

Pruebas: REST listado de 6 destinos, detalle y 404 JSON; CORS; selección de campos GraphQL y filtro de vuelos; hoteles con fechas y servicios; listas vacías; errores por campos desconocidos; variables obligatorias; consulta ausente; JSON inválido; relaciones coherentes para los seis destinos; total con habitaciones dobles; rechazo de mezcla de monedas; estancia y checkout.

## Interfaz: navegador integrado

Ejecutado mediante controles reales del navegador integrado de Codex. **No equivale a haber ejecutado Chrome, Firefox o Edge.**

| Comprobación | Resultado observado |
|---|---|
| Inicio y catálogo | Renderizado, 6 destinos y datos REST visibles |
| Filtros combinados | Chile + Alma Wellness devuelve Atacama |
| Detalle y selección | Ruta dinámica y paso a vuelos correctos |
| GraphQL vuelos | Precios, fechas, cupos y opción agotada visible/deshabilitada |
| GraphQL hoteles | 3 opciones del destino, servicios y hotel sin disponibilidad deshabilitado |
| Flujo completo | Atacama → vuelo → hotel → resumen |
| Cálculo | 3 viajeras × 189.000 + 3 noches × 65.000 × 2 habitaciones = 957.000 CLP |
| Cambio dinámico | 2 viajeras y 4 noches = 638.000 CLP; salida 19/02/2027 |
| Reserva simulada | Confirmación local sin reserva ni envío comercial |
| Recarga | Estado del resumen conservado por sessionStorage |
| Móvil | Inicio a 390×844; menú abre/cierra al navegar a Contacto |
| Contacto | Campos vacíos inválidos; datos ficticios válidos muestran confirmación |
| Etapa sin selección compatible | `/vuelos/bali` muestra paso pendiente |
| 404 | `/ruta-inexistente` muestra recuperación al inicio |
| Tablet | Catálogo a 768×1024; ancho de contenido sin desbordamiento |

## Compatibilidad pendiente

| Navegador | Estado |
|---|---|
| Google Chrome | No completado: el control nativo se detuvo porque no pudo identificar con confianza la URL actual |
| Microsoft Edge | Instalación detectada; prueba pendiente |
| Mozilla Firefox | No localizado en la ruta estándar; prueba pendiente |
| Safari | No ejecutado; no disponible en este entorno Windows |

No se instalaron navegadores adicionales. La compatibilidad completa de la pauta sigue pendiente hasta ejecutar las pruebas en los navegadores requeridos.

## Incidencias corregidas y límites

- Instalación: se autorizó el script de esbuild en `pnpm-workspace.yaml`.
- Selección de vuelo: se propagó el número de viajeras a la validación de cupos.
- Se corrigió el cierre del formulario al actualizar la cantidad de viajeras.
- Revisión visual: sustituidas dos fotos genéricas por imágenes verificadas de Atacama y Cartagena; se estilizó la etiqueta de país.
- Algunas capturas de página completa del navegador integrado fallaron; no se inventaron archivos ni se atribuyeron esas capturas a otros navegadores.
- Pruebas de error de red, respuesta incompleta y limpieza al cambiar de destino tienen pasos documentados para revisión adicional; no se marcan como pruebas manuales realizadas si solo se inspeccionó su implementación.
- GitHub y Pages: preparados, sin publicación remota verificada. No existe URL pública de backend configurada en esta entrega.
