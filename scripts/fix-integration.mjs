import { readFileSync, writeFileSync } from "node:fs";
const fix = (p, fn) =>
  writeFileSync(
    new URL("../" + p, import.meta.url),
    fn(readFileSync(new URL("../" + p, import.meta.url), "utf8")),
  );
fix("frontend/src/pages/Flights.jsx", (s) =>
  s.replace(
    "flight={v} onSelect",
    "flight={v} travelers={trip.viajeras} onSelect",
  ),
);
fix("frontend/src/pages/Summary.jsx", (s) =>
  s
    .replace("import {useEffect,useState}", "import {useState}")
    .replace(
      " useEffect(()=>{setReserve(false)},[trip.viajeras,trip.noches]);",
      "",
    ),
);
