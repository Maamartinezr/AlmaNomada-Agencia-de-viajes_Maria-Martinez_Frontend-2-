import { readFile, writeFile } from "node:fs/promises";
const edit = async (path, fn) => {
  const url = new URL("../" + path, import.meta.url);
  await writeFile(url, fn(await readFile(url, "utf8")));
};
await edit("package.json", (s) => {
  const p = JSON.parse(s);
  p.packageManager = "pnpm@11.25.0";
  p.engines.node = ">=24";
  return JSON.stringify(p, null, 2) + "\n";
});
await edit("frontend/src/services/destinosService.js", (s) =>
  s
    .replace(
      "import {request} from './http';",
      "import {request} from './http';\nimport {validDestination} from './validation';",
    )
    .replace(
      "data.some(d=>!d.id || !d.nombre || !d.pais)",
      "data.some(d=>!validDestination(d))",
    ),
);
await edit("frontend/src/services/graphqlService.js", (s) =>
  s
    .replace(
      "import {request} from './http';",
      "import {request} from './http';\nimport {validOption} from './validation';",
    )
    .replace(
      "data.some(x=>!x.id || x.destinoId!==destinoId || x.moneda!=='CLP' || typeof x.disponible!=='boolean' || !Number.isFinite(x.precio ?? x.precioPorNoche))",
      "data.some(x=>!validOption(x,tipo,destinoId))",
    ),
);
await edit("frontend/src/pages/DestinationDetail.jsx", (s) =>
  s
    .replace(
      "import {request} from '../services/http';",
      "import {request} from '../services/http';\nimport {validDestination} from '../services/validation';",
    )
    .replace(
      "signal=>request(`/api/destinos/${encodeURIComponent(id)}`,{signal})",
      "signal=>request(`/api/destinos/${encodeURIComponent(id)}`,{signal}).then(d=>{if(!validDestination(d))throw new Error('El destino contiene datos incompletos.');return d})",
    ),
);
await edit("scripts/prepare-assets.mjs", (s) =>
  s
    .replace(
      "photo-1464822759023-fed622ff2c3b",
      "photo-1578147872305-53e7cf8bdf80",
    )
    .replace(
      "photo-1533050487297-09b450131914",
      "photo-1714686495394-73e2bb1bbd39",
    ),
);
console.log("Versiones, validaciones y recursos actualizados.");
