import { readFileSync } from "node:fs";
const read = (name) =>
  JSON.parse(readFileSync(new URL(`./${name}.json`, import.meta.url)));
export const destinos = read("destinos");
export const vuelos = read("vuelos");
export const hoteles = read("hoteles");
