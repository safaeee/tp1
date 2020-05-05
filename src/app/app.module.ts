import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import * as firebase from "firebase";

/**
 * Put your firebase configurations to replace 'YOUR_FIREBASE_CONFIG'
 */

const firebaseConfig = {
  apiKey: "AIzaSyD7r6cIxghzEL4b3tEv5BPD9CTZysVYBa0",
  authDomain: "projet7-6095c.firebaseapp.com",
  databaseURL: "https://projet7-6095c.firebaseio.com",
  projectId: "projet7-6095c",
  storageBucket: "projet7-6095c.appspot.com",
  messagingSenderId: "617563179578",
  appId: "1:617563179578:web:86829aa0b39ede34850303",
  measurementId: "G-V83T852C7L"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
