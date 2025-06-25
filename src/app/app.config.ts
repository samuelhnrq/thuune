import {
  type ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  REQUEST,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  initializeApp,
  initializeServerApp,
  provideFirebaseApp,
  FirebaseApp,
  type FirebaseOptions,
  type FirebaseServerApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  provideFirestore,
} from '@angular/fire/firestore';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';

const firebaseConfig: FirebaseOptions = {
  projectId: 'thuune-slva',
  appId: '1:937151099706:web:cfee98622d9f9cfdb9d603',
  storageBucket: 'thuune-slva.firebasestorage.app',
  apiKey: 'AIzaSyAQVogNxvGy4lp0YRbSROeSmQ7HRqufWgI',
  authDomain: 'thuune-slva.firebaseapp.com',
  messagingSenderId: '937151099706',
  measurementId: 'G-8L0KKYT40N',
};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      firebaseApp?: FirebaseServerApp;
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideFirebaseApp((i) => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(firebaseConfig);
      }
      const request = inject(REQUEST);
      const authIdToken = request?.headers
        .get('authorization')
        ?.split('Bearer ')[1];
      const app = initializeServerApp(firebaseConfig, {
        authIdToken,
        releaseOnDeref: i,
      });
      import('express').then((x) => {
        if (!x.response.locals) {
          x.response.locals = {};
        }
        x.response.locals.firebaseApp = app;
      });
      return app;
    }),
    provideAuth((i) => getAuth(i.get(FirebaseApp))),
    provideAnalytics((i) => getAnalytics(i.get(FirebaseApp))),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore((i) =>
      initializeFirestore(i.get(FirebaseApp), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    ),
    providePerformance((i) => getPerformance(i.get(FirebaseApp))),
    provideRemoteConfig((i) => getRemoteConfig(i.get(FirebaseApp))),
  ],
};
