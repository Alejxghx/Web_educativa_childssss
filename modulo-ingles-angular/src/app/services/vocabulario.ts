import { Injectable } from "@angular/core";
import type { PreguntaQuiz, TemaVocabulario } from "../models/ingles.models";

// Datos del modulo (mock). En el Hito 4 podrian venir de Supabase.
@Injectable({ providedIn: "root" })
export class VocabularioService {
  readonly temas: TemaVocabulario[] = [
    { tema: "Animals", palabra: "Dragon", traduccion: "Dragón", emoji: "🐉" },
    { tema: "Colors", palabra: "Green", traduccion: "Verde", emoji: "🟢" },
    { tema: "Numbers", palabra: "Three", traduccion: "Tres", emoji: "3️⃣" },
    { tema: "Family", palabra: "Sister", traduccion: "Hermana", emoji: "👧" },
    { tema: "Food", palabra: "Apple", traduccion: "Manzana", emoji: "🍎" },
    { tema: "Body", palabra: "Hand", traduccion: "Mano", emoji: "✋" },
    { tema: "Nature", palabra: "Tree", traduccion: "Árbol", emoji: "🌳" },
  ];

  readonly quiz: PreguntaQuiz[] = [
    {
      pregunta: "How do you say «Manzana» in English?",
      opciones: ["Apple", "Dragon", "Tree", "Hand"],
      correcta: "Apple",
    },
    {
      pregunta: "What does «Sister» mean?",
      opciones: ["Hermana", "Hermano", "Madre", "Amiga"],
      correcta: "Hermana",
    },
    {
      pregunta: "How do you say «Verde» in English?",
      opciones: ["Green", "Blue", "Red", "Three"],
      correcta: "Green",
    },
    {
      pregunta: "What does «Dragon» mean?",
      opciones: ["Dragón", "Gato", "Árbol", "Mano"],
      correcta: "Dragón",
    },
    {
      pregunta: "How do you say «Tres» in English?",
      opciones: ["Three", "Tree", "Free", "Green"],
      correcta: "Three",
    },
  ];
}
