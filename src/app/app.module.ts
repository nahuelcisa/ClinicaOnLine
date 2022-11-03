import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/alta-profesional/alta-profesional.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PrincipalComponent } from './components/principal/principal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { AltaAdminComponent } from './components/alta-admin/alta-admin.component';
import { NavComponent } from './components/nav/nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { EspecialistasPipe } from './pipes/especialistas.pipe';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSliderModule} from '@angular/material/slider';
import { EspecialistaPipe } from './pipes/especialista.pipe';
import { EspecialidadPipe } from './pipes/especialidad.pipe';
import { PacientePipe } from './pipes/paciente.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AltaUsuarioComponent,
    AltaProfesionalComponent,
    PrincipalComponent,
    UsuariosComponent,
    TablaUsuariosComponent,
    AltaAdminComponent,
    NavComponent,
    PerfilComponent,
    SolicitarTurnoComponent,
    EspecialistasPipe,
    MisTurnosComponent,
    EspecialistaPipe,
    EspecialidadPipe,
    PacientePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
