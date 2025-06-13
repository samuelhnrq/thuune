import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Navbar } from './components/navbar/navbar';

const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App {
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
