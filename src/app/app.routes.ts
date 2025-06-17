import type { Routes } from "@angular/router";
import { PageGameSelect } from "./components/page-game-select/page-game-select";

export const routes: Routes = [
  { path: "", redirectTo: "games", pathMatch: "full" },
  { path: "games", component: PageGameSelect },
];
