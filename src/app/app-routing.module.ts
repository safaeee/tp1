import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contact-forms'
  },
   {
     path: 'contact-forms',
    loadChildren: () => import('./contact-forms/contact-forms.module').then(m => m.ContactFormsModule)
   },

  { path: 'contact-form', loadChildren: () => import('./contact-forms/contact-forms.module').then(m => m.ContactFormsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
