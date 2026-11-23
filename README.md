# ALMA NÓMADA

Actualización de planificación: [funcionalidades ampliadas](docs/AMPLIACION.md), [pruebas actuales](docs/pruebas/ampliacion-resultados.md) e [informe Word](docs/Informe%20de%20evidencias%20Alma%20Nomada.docx).

Revisión de las recomendaciones de la evaluación anterior y esquema de responsabilidades: [aplicación de la retroalimentación](docs/retroalimentacion-profesor.md).

**Viaja libre. Vive a tu manera.** Plataforma académica de planificación de viajes para mujeres, evaluación «Integrando nuestro frontend con backend», Frontend II, 9.º bimestre.

La aplicación permite elegir destino → vuelo → hotel → resumen y solicitar una reserva **simulada**. El catálogo se obtiene por HTTP REST; vuelos y hoteles se consultan por HTTP POST a un servidor GraphQL real. Los datos son ficticios. No hay pagos, reservas comerciales ni envíos de correos.

## Tecnologías y arquitectura

React 19, JavaScript JSX, HTML5, CSS Grid/Flexbox, Vite, React Router DOM (HashRouter), Fetch, Context API, useState y useEffect. Backend Node.js con Express, CORS y GraphQL.js (`buildSchema`, validación y ejecución del esquema). No se utiliza Next.js ni una simulación GraphQL dentro del navegador.

```text
React → destinosService → GET /api/destinos → Express → destinos.json
React → graphqlService → POST /graphql → esquema/resolvers → vuelos.json/hoteles.json
```

```text
frontend/
  public/images/       Fotografías locales, logo original y variantes SVG
  src/components/     layout, destinations, flights, hotels, common
  src/context/        TravelContext (useState + sessionStorage)
  src/hooks/          useRemote (useEffect + AbortController)
  src/pages/          Vistas React Router
  src/services/       HTTP, REST y GraphQL
  src/styles/         Paleta Terracota & Arena y responsive
  src/utils/          Fechas, disponibilidad y costos
backend/
  data/               Datos JSON separados del frontend
  graphql/            Esquema y resolvers por destinoId
  routes/             REST de destinos
  app.js              Express, CORS y manejo de errores
  server.js           Inicio del servidor
tests/                Pruebas HTTP y cálculo
docs/                 Informe, matriz, guía y resultados
.github/workflows/    Build, tests y publicación de Pages
```

## Instalación y ejecución local

Requisitos: Node.js **24** y pnpm **11.25.0**. Si tienes npm pero no pnpm, ejecuta `npm install -g pnpm@11.25.0`. También puedes usar Corepack si está disponible. Desde la carpeta raíz del proyecto:

```powershell
pnpm install
pnpm dev
```

Abre [Alma Nómada local](http://127.0.0.1:5173). Mantén la terminal abierta. `Ctrl+C` detiene ambos servicios. El script ejecuta frontend y backend simultáneamente. También puedes usar `iniciar.cmd` en Windows.

Para ejecutarlos en terminales separadas:

```powershell
# Terminal 1, desde la raíz
pnpm --dir backend dev
# Terminal 2, desde la raíz
pnpm --dir frontend dev
```

Frontend: puerto 5173. Backend: puerto 4000. Vite redirige `/api` y `/graphql` a Express durante desarrollo. Para otros orígenes o un backend público, copia los `.env.example` como `.env` en la carpeta correspondiente y ajusta `VITE_API_URL`, `PORT` y `CORS_ORIGINS`. Las variables del backend se leen al ejecutarlo desde su carpeta (`pnpm --dir backend start`). Reinicia después de cambiar variables. No publiques `.env` ni credenciales.

```powershell
pnpm test
pnpm build
# Vista del build con API local configurada en frontend/.env:
pnpm --dir frontend exec vite preview --host 127.0.0.1
```

El preview de producción no tiene proxy: configura antes `VITE_API_URL=http://127.0.0.1:4000` y añade `http://127.0.0.1:4173` a `CORS_ORIGINS` para usarlo con Express local.

## API REST

| Método | Endpoint | Respuesta |
|---|---|---|
| GET | `/health` | Estado del mock |
| GET | `/api/destinos` | 9 destinos JSON |
| GET | `/api/destinos/atacama` | Destino individual |
| GET | `/api/destinos/no-existe` | 404 JSON |

```powershell
Invoke-RestMethod http://localhost:4000/api/destinos
Invoke-RestMethod http://localhost:4000/api/destinos/bali
```

El frontend no importa los JSON del backend. Buscar por nombre, país y modalidad filtra la respuesta REST obtenida, sin duplicar manualmente el catálogo.

## API GraphQL

Endpoint: `POST http://localhost:4000/graphql`. Cabecera `Content-Type: application/json`. Las variables viajan junto a `query` en JSON.

```graphql
query Opciones($destinoId: ID!) {
  vuelosPorDestino(destinoId: $destinoId) {
    id destinoId aerolinea origen destino fechaSalida
    horaSalida horaLlegada precio moneda disponible cuposDisponibles
  }
  hotelesPorDestino(destinoId: $destinoId) {
    id destinoId nombre ciudad categoria precioPorNoche moneda
    servicios fechasDisponibles disponible imagen
  }
}
```

Variables: `{"destinoId":"atacama"}`. Para demostrar selección de campos:

```powershell
$body = @{ query = 'query($id:ID!){vuelosPorDestino(destinoId:$id){aerolinea precio moneda}}'; variables = @{ id = 'atacama' } } | ConvertTo-Json -Depth 5
Invoke-RestMethod http://localhost:4000/graphql -Method Post -ContentType 'application/json' -Body $body
```

El servidor valida campos, tipos y variables con GraphQL.js. Un ID desconocido devuelve listas vacías. Consultas inválidas responden con `errors`; cuerpos inválidos y JSON mal formado tienen HTTP 400.

## Navegación y estado

Rutas de React Router: `/`, `/destinos`, `/destinos/:id`, `/vuelos/:destinoId`, `/hoteles/:destinoId`, `/resumen`, `/experiencias`, `/nosotras`, `/contacto`, `/servicios` y `*` (404). En el navegador se representan como `/#/destinos`, etc. HashRouter evita errores de recarga en GitHub Pages; todos los enlaces internos usan Link/NavLink o useNavigate.

`TravelContext` conserva la selección en sessionStorage. Cambiar destino limpia vuelo y hotel; cambiar vuelo limpia hotel. Las etapas incompletas explican qué falta y ofrecen regresar. `useRemote` utiliza useState/useEffect y AbortController, cancela respuestas antiguas y permite reintentar. Hay estados de carga, error y resultados vacíos.

Datos de ejemplo: 9 destinos, 18 salidas entre diciembre de 2026 y septiembre de 2027 y 72 alternativas de vuelo. El calendario solicitado y la ampliación se describen en [AMPLIACION.md](docs/AMPLIACION.md). El checkout no consume una noche adicional.

## Costo y solicitudes

`total = (tarifa ida + regreso opcional + equipaje por tramo) × viajeras + tarifa de habitación × noches × habitaciones + servicios`.

El vuelo se calcula por persona para solo ida o ida y vuelta. Cada habitación admite hasta 2 viajeras; se recomienda ceil(viajeras/2), con ajuste entre 1 y 25. Se elige habitación doble o Suite Deluxe. El resumen revalida GraphQL y muestra clase, equipaje, fechas, check-in y servicios. Los importes son demostrativos. Reserva y contacto son simulaciones locales; los pagos siguen en proceso.

## Identidad y recursos

Paleta Terracota & Arena, Playfair Display, Montserrat y Caveat instaladas localmente. El encabezado usa el isotipo original aportado. Se incluye el logotipo completo original y variantes SVG principal/horizontal/isotipo/favicon/monocromática; las versiones vectoriales son aproximaciones, no una reproducción exacta. Procedencia de fotografías y licencias: [recursos](docs/recursos.md).

## Pruebas y evidencias

`pnpm test` ejecuta pruebas de integración HTTP REST/GraphQL y cálculo. Consultar [resultados reales](docs/pruebas/resultados.md), [guía de evidencias](docs/evidencias/GUIA.md) e [informe y matriz](docs/informe-academico.html). Las capturas disponibles se guardan en `docs/evidencias/`. No se presentan pruebas pendientes como realizadas.

## GitHub y GitHub Pages

**Repositorio remoto y URL de Pages: pendientes de crear/publicar.** El conector disponible permite consultar GitHub, pero no crear repositorios ni configurar Pages. No se afirma publicación. Desde la carpeta final, crea un repositorio vacío llamado `alma-nomada` en tu cuenta y ejecuta:

```powershell
git init -b main
git add .
git commit -m "Implementa Alma Nómada con REST y GraphQL"
git remote add origin https://github.com/TU_USUARIO/alma-nomada.git
git push -u origin main
```

Si la entrega ya tiene un repositorio Git inicializado, omite `git init`. Si ya hay un commit, crea uno nuevo únicamente para tus cambios. Los node_modules, builds y .env quedan excluidos.

En el repositorio: Settings → Pages → Source: **GitHub Actions**. El workflow `.github/workflows/pages.yml` compila, prueba y publica `frontend/dist`. Agrega en Settings → Secrets and variables → Actions → Variables la variable `VITE_API_URL` con el origen HTTPS de tu backend. No es un secreto. Ejecuta el workflow o sube un commit para publicar.

GitHub Pages solo aloja el frontend estático. El backend debe alojarse en un servicio Node.js por separado: instalar desde la raíz con `pnpm install --frozen-lockfile`, iniciar `pnpm --dir backend start` y definir `PORT` según el proveedor y `CORS_ORIGINS=https://TU_USUARIO.github.io`. Configura la variable de Vite **antes del build**. La URL esperada será `https://TU_USUARIO.github.io/alma-nomada/`, que es un patrón de configuración, no un enlace publicado.

## Limitaciones conocidas

- Publicación y backend público pendientes; el build estático aislado no puede responder REST/GraphQL.
- No hay autenticación, cobros, correos, reservas reales ni número WhatsApp inventado.
- Las categorías orientan experiencias; no restringen edad ni estado civil.
- Los hoteles, rutas y tarifas son ficticios; los nombres de aerolíneas son referenciales y las fotos ilustrativas. Solo se suman las actividades y servicios seleccionados.
- Las fechas del mock son fijas para una demostración reproducible; no es un buscador comercial en tiempo real.
- Revisar el registro de pruebas para conocer los navegadores ejecutados realmente.
