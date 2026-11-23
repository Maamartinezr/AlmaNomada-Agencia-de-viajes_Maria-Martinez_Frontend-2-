import { useEffect, useState } from "react";
export function useRemote(loader, key = "") {
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError("");
    setData(null);
    loader(controller.signal)
      .then((value) => {
        if (active) setData(value);
      })
      .catch((e) => {
        if (active && e.name !== "AbortError")
          setError(e.message || "No se pudo conectar con el backend.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [key, attempt]); // loader depende únicamente de key; el cierre anterior se cancela.
  return { data, error, loading, retry: () => setAttempt((n) => n + 1) };
}
