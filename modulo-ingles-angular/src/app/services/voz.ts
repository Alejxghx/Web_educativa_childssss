import { Injectable } from "@angular/core";

// Servicio que pronuncia palabras en ingles con la voz del navegador.
@Injectable({ providedIn: "root" })
export class Voz {
  /** Pronuncia una palabra en ingles, con un tono agudo y claro para ninos. */
  pronunciar(palabra: string): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = "en-US";
    utterance.pitch = 1.3; // tono ligeramente agudo, ideal para ninos
    utterance.rate = 0.9; // un poco mas lento para que sea claro
    window.speechSynthesis.cancel(); // corta lo anterior si seguia hablando
    window.speechSynthesis.speak(utterance);
  }
}
