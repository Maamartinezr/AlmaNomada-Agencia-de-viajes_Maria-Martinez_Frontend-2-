import { writeFile, appendFile } from "node:fs/promises";
const files = [
  [
    "atacama",
    "photo-1578147872305-53e7cf8bdf80",
    "José Pablo Domínguez",
    "https://unsplash.com/photos/NPiIgu5x50o",
  ],
  [
    "cartagena",
    "photo-1714686495394-73e2bb1bbd39",
    "Ricky Beron",
    "https://unsplash.com/photos/acH94SHbWS4",
  ],
];
for (const [id, title, author, license] of files) {
  const url = `https://images.unsplash.com/${title}?auto=format&fit=crop&w=1600&q=85`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  await writeFile(
    new URL(`../frontend/public/images/${id}.jpg`, import.meta.url),
    Buffer.from(await r.arrayBuffer()),
  );
  await appendFile(
    new URL("../docs/recursos.md", import.meta.url),
    `\n\nImagen definitiva ${id}: [fotografía de ${author}](${license}), [archivo](${url}). Licencia Unsplash. Encuadre mediante CSS object-fit. Sustituye la referencia anterior para este destino.`,
  );
  console.log("Fotografía corregida:", id);
}
