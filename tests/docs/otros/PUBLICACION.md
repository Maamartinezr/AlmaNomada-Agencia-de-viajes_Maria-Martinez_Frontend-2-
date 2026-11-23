# Publicación de Alma Nómada

Estado: proyecto preparado localmente. No se declara una URL pública existente.

## Backend Node.js

1. Crea un repositorio GitHub vacío para este proyecto. No subas node_modules, .env ni credenciales.
2. Publica la fuente desde esta carpeta (si aún no hay commit, realiza `git add .` y `git commit -m "Implementa Alma Nomada con REST y GraphQL"`):

```powershell
git branch -M main
git remote add origin https://github.com/TU_USUARIO/alma-nomada.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu usuario real. También puedes crear y subir el repositorio con GitHub Desktop. Si ya existe un remoto, revísalo antes de añadirlo.

3. Despliega Express en un hosting compatible con Node.js (se incluye `render.yaml` como ejemplo de configuración). Usa Node 24, `pnpm install --frozen-lockfile` y `node backend/server.js` desde la raíz. El hosting debe asignar `PORT`. Establece `CORS_ORIGINS=https://TU_USUARIO.github.io` (sin ruta del repositorio ni barra final).
4. Verifica la URL HTTPS real: `/health`, `/api/destinos` y POST `/graphql`. No uses una URL ficticia ni localhost en la versión pública.

## GitHub Pages

1. En Settings → Pages selecciona GitHub Actions.
2. En Settings → Secrets and variables → Actions → Variables añade la variable de repositorio `VITE_API_URL` con la URL HTTPS del backend (sin `/api` ni `/graphql`). Es una URL pública, no una credencial.
3. Ejecuta `.github/workflows/pages.yml` desde Actions o sube cambios a main. El workflow comprueba tests, requiere una URL HTTPS, compila y despliega el directorio `frontend/dist`.
4. La URL esperada sigue el patrón `https://TU_USUARIO.github.io/alma-nomada/`, pero **solo debe añadirse como enlace publicado al README tras verificar un despliegue real**.
5. Recorre destino → vuelo → hotel → resumen desde Pages y comprueba en Network las llamadas al backend público, CORS, ausencia de mixed content y recarga en `/#/resumen`.

Vite utiliza `base: './'`, los recursos incluyen BASE_URL y React Router usa HashRouter; así el frontend funciona bajo la subruta de un repositorio. Pages no ejecuta Express. Sin el backend público, el build estático puede verse pero la integración no está completa.

## Cierre de la evaluación

Añade al README la URL real del repositorio y de Pages, capturas de ejecución pública y resultados específicos de Chrome, Firefox y Edge. Actualiza la matriz del informe únicamente cuando dichas pruebas y publicaciones se hayan completado.
