import { Injectable } from "@angular/core";

import * as firebase from "firebase";
import { LoginUser } from "src/modals/login-user";

@Injectable({
  providedIn: "root",
})
export class AuthentificationService {
  constructor() {}

  onLogin(loginUser: LoginUser) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(loginUser.email, loginUser.password);
  }

  onRegister(loginUser: LoginUser) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(loginUser.email, loginUser.password);
  }

  isAuthenticated(): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          resolve(user.uid);
        } else {
          reject("Utilisateur non identifié");
        }
      });
    });
  }
}
