import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactFormsComponent } from './contact-forms.component';

const routes: Routes = [{ path: '', component: ContactFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactFormsRoutingModule { }
