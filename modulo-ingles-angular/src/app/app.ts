import { Component } from "@angular/core";
import { Vocabulario } from "./components/vocabulario/vocabulario";
import { Quiz } from "./components/quiz/quiz";

@Component({
  selector: "app-root",
  imports: [Vocabulario, Quiz],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}
