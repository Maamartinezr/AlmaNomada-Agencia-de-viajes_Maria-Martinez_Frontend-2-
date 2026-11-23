import { Router } from "express";
import { destinos } from "../data/catalog.js";
export const destinosRoutes = Router();
destinosRoutes.get("/", (_req, res) => res.json(destinos));
destinosRoutes.get("/:id", (req, res) => {
  const destino = destinos.find((d) => d.id === req.params.id);
  return destino
    ? res.json(destino)
    : res.status(404).json({ message: "El destino solicitado no existe." });
});
