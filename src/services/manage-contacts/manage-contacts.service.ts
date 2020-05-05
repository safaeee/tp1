import { Injectable } from "@angular/core";
import { IContact } from "src/modals/icontact";

import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class ManageContactsService {
  contacts: Array<IContact> = [];
  database = firebase.database();
  i = 0;
  constructor() {}

  addContactOnFirebase(contact: IContact): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
       this.database
        .ref(`contacts/${this.contacts.length}`)
        .set({
          lastname: contact.lastname,
          firstname: contact.firstname,
          phoneNumber: contact.phoneNumber,
          email: contact.email,
        })
        .then(() => {})
        .catch(() => {
          reject("Erreur");
        });
    });
  }

  addContact(contact: IContact): Array<IContact> {
    this.contacts.push(contact);
    return this.contacts;
  }

  getContactsOnFirebase(): Promise<Array<IContact>> {
    return new Promise((resolve, reject) => {
      this.database.ref("contacts").on(
        "child_added",
        (snapshot) => {
          let obj = snapshot.val();
          obj.id = snapshot.key;
          this.contacts.push(obj);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateContactOnFirebase(contact: IContact, id: number) {
    let update = {};
    update["/contacts/" + id] = contact;

    this.database.ref().update(update);
  }

  deleteContact(id: number) {
    this.database.ref(`/contacts/${id}`).remove();
  }

  deleteListener() {
    this.database.ref("contacts").on("child_removed", (child_removed) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_removed.key)) {
          console.log("dele");
          this.contacts.splice(i, 1);
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }
  updateListener() {
    this.database.ref("contacts").on("child_changed", (child_change) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_change.key)) {
          console.log("dele");
          this.contacts[i].email = child_change.val().email;
          this.contacts[i].firstname = child_change.val().firstname;
          this.contacts[i].lastname = child_change.val().lastname;
          this.contacts[i].phoneNumber = child_change.val().phoneNumber;
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }
}
