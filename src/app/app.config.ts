import {
  ApplicationConfig,
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
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';

const firebaseConfig = {
  projectId: 'thuune-slva',
  appId: '1:937151099706:web:cfee98622d9f9cfdb9d603',
  storageBucket: 'thuune-slva.firebasestorage.app',
  apiKey: 'AIzaSyAQVogNxvGy4lp0YRbSROeSmQ7HRqufWgI',
  authDomain: 'thuune-slva.firebaseapp.com',
  messagingSenderId: '937151099706',
  measurementId: 'G-8L0KKYT40N',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        console.log('Initializing Firebase App in Browser');
        return initializeApp(firebaseConfig);
      }
      console.log('Initializing Firebase App in Server');
      // Optional, since it's null in SSG
      const request = inject(REQUEST, { optional: true });
      if (!request) {
        console.warn(
          'No request found, Firebase App will not be initialized with authIdToken'
        );
      }
      const authIdToken = request?.headers
        .get('authorization')
        ?.split('Bearer ')[1];

      return initializeServerApp(firebaseConfig, {
        authIdToken,
        releaseOnDeref: request || undefined,
      });
    }),
    provideAuth((i) => getAuth(i.get(FirebaseApp))),
    provideAnalytics((i) => getAnalytics(i.get(FirebaseApp))),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore((i) => getFirestore(i.get(FirebaseApp))),
    providePerformance((i) => getPerformance(i.get(FirebaseApp))),
    provideRemoteConfig((i) => getRemoteConfig(i.get(FirebaseApp))),
  ],
};
