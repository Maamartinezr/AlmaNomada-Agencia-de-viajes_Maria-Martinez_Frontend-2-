import "dotenv/config";
import express from "express";
import cors from "cors";
import { graphql } from "graphql";
import { schema } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { destinosRoutes } from "./routes/destinosRoutes.js";
export const app = express();
const origins = (
  process.env.CORS_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((v) => v.trim());
app.use(cors({ origin: origins }));
app.use(express.json({ limit: "32kb" }));
app.get("/health", (_req, res) => res.json({ status: "ok", mode: "mock" }));
app.use("/api/destinos", destinosRoutes);
app.post("/graphql", async (req, res, next) => {
  try {
    const { query, variables, operationName } = req.body || {};
    if (typeof query !== "string")
      return res
        .status(400)
        .json({ errors: [{ message: "Se requiere una consulta GraphQL." }] });
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
      operationName,
    });
    res.status(result.errors && !result.data ? 400 : 200).json(result);
  } catch (error) {
    next(error);
  }
});
app.use((_req, res) =>
  res.status(404).json({ message: "Ruta no encontrada." }),
);
app.use((error, _req, res, _next) =>
  res
    .status(error.status || 500)
    .json({
      message:
        error.status === 400
          ? "JSON inválido."
          : "No se pudo procesar la solicitud.",
    }),
);
