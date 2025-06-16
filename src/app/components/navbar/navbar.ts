import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-navbar',
  imports: [MatIconButton, MatToolbar, MatIcon, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  private auth: Auth = inject(Auth);
  private user$ = user(this.auth);
  protected userSignal = toSignal(this.user$, {
    equal: (a, b) => !!a && !!b && a.uid === b.uid,
  });

  protected async login() {
    await signInWithPopup(this.auth, provider);
  }

  protected async logout() {
    await signOut(this.auth);
  }
}
