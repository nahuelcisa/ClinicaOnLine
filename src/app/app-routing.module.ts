import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:LoginComponent},
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
  {path: 'principal', component: PrincipalComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path:'*', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
