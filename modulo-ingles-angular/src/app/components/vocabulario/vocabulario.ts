import { Component, inject, signal } from "@angular/core";
import { VocabularioService } from "../../services/vocabulario";
import { Voz } from "../../services/voz";
import type { TemaVocabulario } from "../../models/ingles.models";

@Component({
  selector: "app-vocabulario",
  templateUrl: "./vocabulario.html",
  styleUrl: "./vocabulario.css",
})
export class Vocabulario {
  private readonly voz = inject(Voz);
  protected readonly temas = inject(VocabularioService).temas;

  protected readonly seleccionado = signal<TemaVocabulario | null>(null);
  protected readonly animando = signal(false);

  /** Elige un tema: muestra la palabra, la pronuncia y la anima. */
  protected elegir(tema: TemaVocabulario): void {
    this.seleccionado.set(tema);
    this.voz.pronunciar(tema.palabra);
    this.animando.set(true);
    setTimeout(() => this.animando.set(false), 200);
  }
}
