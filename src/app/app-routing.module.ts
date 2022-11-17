import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from './components/graficos/graficos.component';
import { LoginComponent } from './components/login/login.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { NavComponent } from './components/nav/nav.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:LoginComponent},
  {path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
  {path: 'principal', component: PrincipalComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'turno', component: SolicitarTurnoComponent},
  {path: 'misturnos', component: MisTurnosComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'graficos', component: GraficosComponent},
  {path:'*', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
