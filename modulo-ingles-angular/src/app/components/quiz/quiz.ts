import { Component, computed, inject, signal } from "@angular/core";
import { VocabularioService } from "../../services/vocabulario";
import type { FeedbackQuiz } from "../../models/ingles.models";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.html",
  styleUrl: "./quiz.css",
})
export class Quiz {
  protected readonly preguntas = inject(VocabularioService).quiz;

  protected readonly indice = signal(0);
  protected readonly aciertos = signal(0);
  protected readonly feedback = signal<FeedbackQuiz | null>(null);
  protected readonly terminado = signal(false);
  // Cambia en cada respuesta para forzar el re-render del feedback
  // y reiniciar asi su animacion (pop / shake).
  protected readonly intentos = signal(0);

  protected readonly preguntaActual = computed(() => this.preguntas[this.indice()]);

  /** Procesa la opcion elegida: acierto avanza, fallo agita el feedback. */
  protected responder(opcion: string): void {
    const actual = this.preguntaActual();
    if (!actual) return;

    this.intentos.update((n) => n + 1);

    if (opcion === actual.correcta) {
      this.aciertos.update((n) => n + 1);
      this.feedback.set({ mensaje: "✨ Awesome! You got it right! ✨", tipo: "ok" });
      setTimeout(() => this.siguiente(), 900);
    } else {
      this.feedback.set({ mensaje: "Oops! Try again, you can do it! 🖍️", tipo: "error" });
    }
  }

  private siguiente(): void {
    if (this.indice() + 1 >= this.preguntas.length) {
      this.terminado.set(true);
    } else {
      this.indice.update((i) => i + 1);
      this.feedback.set(null);
    }
  }

  /** Reinicia el quiz desde la primera pregunta. */
  protected reiniciar(): void {
    this.indice.set(0);
    this.aciertos.set(0);
    this.feedback.set(null);
    this.terminado.set(false);
  }
}
