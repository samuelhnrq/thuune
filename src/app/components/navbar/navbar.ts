import { Component, inject } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  type User,
} from "@angular/fire/auth";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatCardAvatar } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { concat, type Observable, of } from "rxjs";

const provider = new GoogleAuthProvider();

@Component({
  selector: "app-navbar",
  imports: [
    MatIconButton,
    MatToolbar,
    MatProgressSpinnerModule,
    MatIcon,
    RouterLink,
    MatCardAvatar,
    CommonModule,
  ],
  templateUrl: "./navbar.html",
})
export class Navbar {
  private auth: Auth = inject(Auth);
  protected user$: Observable<User | null | undefined> = concat(
    of(undefined),
    user(this.auth),
  );

  protected async login() {
    await signInWithPopup(this.auth, provider);
  }

  protected async logout() {
    await signOut(this.auth);
  }
}
