const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, options);
  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(
      "El servicio no devolvió JSON válido. Revisa la URL del backend.",
    );
  }
  if (!response.ok)
    throw new Error(
      body.message ||
        body.errors?.[0]?.message ||
        "No pudimos consultar el servicio.",
    );
  return body;
}
