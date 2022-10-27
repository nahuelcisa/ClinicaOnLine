import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaProfesionalComponent } from '../components/alta-profesional/alta-profesional.component';
import { AltaUsuarioComponent } from '../components/alta-usuario/alta-usuario.component';
import { RegistroComponent } from './registro.component';

const routes: Routes = [
  {path:'', component:RegistroComponent},
  { path: 'profesional', component: AltaProfesionalComponent },
  { path: 'paciente', component: AltaUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
