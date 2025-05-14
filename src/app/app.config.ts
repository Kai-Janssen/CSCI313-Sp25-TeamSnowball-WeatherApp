import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
// Import the functions you need from the SDKs you need
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-WTIufTOyQUtJlz4L-LwO1d4F1rkFCd8",
  authDomain: "weather-app-authenticate.firebaseapp.com",
  projectId: "weather-app-authenticate",
  storageBucket: "weather-app-authenticate.firebasestorage.app",
  messagingSenderId: "283027224914",
  appId: "1:283027224914:web:d68ab6155cc6445267628b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),

  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore())
  ]

};
