import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { IContact } from "src/modals/icontact";
import { ManageContactsService } from "src/services/manage-contacts/manage-contacts.service";
import { AuthentificationService } from "src/services/authentification/authentification.service";
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { FormGroup} from '@angular/forms';
@Component({
  selector: "app-contact-forms",
  templateUrl: "./contact-forms.component.html",
  styleUrls: ["./contact-forms.component.scss"],
})
export class ContactFormsComponent implements OnInit {
  Form= new FormGroup({
    nom:new FormControl(null),
    prenom:new FormControl(null),
    tel:new FormControl(null),
    email:new FormControl(null),


  })
  contact: IContact;
  contacts: Array<IContact>;
  buttonText = "AJOUTER";
  id = 0;
  keys = [];
  constructor(
    private manageContact: ManageContactsService,
    private authentificationService: AuthentificationService,
    private router: Router
  ) {
    this.contact = {
      lastname: null,
      firstname: null,
      phoneNumber: null,
      email: null,
      id: null,
    };
  }

  ngOnInit() {
    this.contacts = [];
    this.keys = [];
    console.log("ngOninit");
    this.authentificationService.isAuthenticated().then(async (uid: string) => {
      this.manageContact.getContactsOnFirebase().then(() => {});

      this.contacts = this.manageContact.contacts;
      this.manageContact.deleteListener();
      this.manageContact.updateListener();
    });
  }

  onEdit(contact: IContact) {
    this.buttonText = "MODIFIER";
    this.contact = contact;
    this.id = contact.id;
  }

  onDelete(id: number) {
    this.manageContact.deleteContact(id);
  }

  onSubmit(contact: IContact) {
    switch (this.buttonText) {
      case "AJOUTER":
        this.manageContact.addContactOnFirebase(contact);
        break;

      case "MODIFIER":
        this.manageContact.updateContactOnFirebase(this.contact, this.id);
        this.resetForm();
        break;
    }
  }

  resetForm() {
    this.buttonText = "AJOUTER";
    this.contact = {
      lastname: null,
      firstname: null,
      phoneNumber: null,
      email: null,
    };
  }
}
