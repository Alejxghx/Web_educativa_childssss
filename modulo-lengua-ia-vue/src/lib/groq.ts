import type { CuentoIA } from "../types";

// Servicio de llamada a la API de Groq Vision.
// La key se inyecta desde el .env como VITE_GROQ_KEY (no versionado).

const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODELO = "meta-llama/llama-4-scout-17b-16e-instruct";

const PROMPT = `Eres un maestro de primaria. Analiza este dibujo hecho por un niño de 7-10 años \
y responde SOLO con JSON válido, sin markdown ni texto extra, con esta estructura exacta:
{
  "cuento": "Un cuento corto de 80-100 palabras inspirado en lo que ves en el dibujo. Usa presente. Incluye un personaje con nombre.",
  "pregunta": "Una pregunta de comprensión lectora sobre el cuento, dirigida al niño."
}`;

/** Envia el dibujo a la IA y devuelve el cuento + la pregunta. */
export async function generarCuento(
  base64: string,
  mediaType: string,
): Promise<CuentoIA> {
  const key = import.meta.env.VITE_GROQ_KEY ?? "";
  if (!key) {
    throw new Error(
      "Falta la API key. Crea un archivo .env con VITE_GROQ_KEY (ver .env.example).",
    );
  }

  const respuesta = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:${mediaType};base64,${base64}` },
            },
            { type: "text", text: PROMPT },
          ],
        },
      ],
    }),
  });

  if (!respuesta.ok) {
    throw new Error(`La IA respondió con un error (${respuesta.status}).`);
  }

  const datos = await respuesta.json();
  const crudo: string = datos.choices?.[0]?.message?.content ?? "";
  const limpio = crudo.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(limpio) as CuentoIA;
  } catch {
    throw new Error("La IA no devolvió un formato válido. Intenta de nuevo.");
  }
}
