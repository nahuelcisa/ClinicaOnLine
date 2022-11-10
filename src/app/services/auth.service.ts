import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = 
  /* {
    apellido
: 
"admin",
clave
: 
"123456789",
dni
: 
23599591,
edad
: 
32,
foto
: 
"https://firebasestorage.googleapis.com/v0/b/clinicaonline-1e39f.appspot.com/o/3140366.png?alt=media&token=d3eab96e-779f-4265-a8a2-0fbed1d7647c",
id
: 
"BOGHIPl64dzPkrA6Ia3o",
mail
: 
"jeyesis426@adroh.com",
nombre
: 
"admin",
perfil
: 
"administrador"
  } */{
    apellido
: 
"oggioni",
clave
: 
"123456789",
dni
: 
34987153,
edad
: 
34,
foto
: 
"https://firebasestorage.googleapis.com/v0/b/clinicaonline-1e39f.appspot.com/o/3774299.png?alt=media&token=9d1cc56d-88cc-444e-821b-c77075f0fb59",
id
: 
"XRXRE3g0cszwJWNSDFHF",
mail
: 
"yekicox853@dmtubes.com",
nombre
: 
"Ezequiel",
obraSocial
: 
"Osde",
perfil
: 
"paciente"
  }
  /* { apellido
  : 
  "Valentino",
  clave
  : 
  "123456789",
  dni
  : 
  10946789,
  edad
  : 
  54,
  especialidad
  : 
  "Clinico",
  foto
  : 
  "https://firebasestorage.googleapis.com/v0/b/clinicaonline-1e39f.appspot.com/o/paciente.png?alt=media&token=13f55ca4-a36d-437a-920a-47e366bac5ca",
  habilitado
  : 
  true,
  id
  : 
  "mIxat8NVwsKUacTs9HCv",
  mail
  : 
  "podok52828@harcity.com",
  nombre
  : 
  "Valentin",
  perfil
  : 
  "profesional"} */
  /*  = {
    apellido
: 
"Cisa",
clave
: 
"123456789",
dni
: 
43259236,
edad
: 
21,
foto
: 
"https://firebasestorage.googleapis.com/v0/b/clinicaonline-1e39f.appspot.com/o/3774299.png?alt=media&token=2febcf15-de01-4df5-82f5-adb536890d60",
id
: 
"neP8AdhtNyazFUijO9Cw",
mail
: 
"nahuelcisa17@gmail.com",
nombre
: 
"Daniel",
obraSocial
: 
"osde",
perfil
: 
"paciente"
  };  */
  userDateFirebase: any;

  constructor(public afAuth: AngularFireAuth, private router : Router) { }

  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );      
      this.userDateFirebase = result;
      console.log(this.user);
      return result;

    } catch (error) {      
      console.log(error);
      return error;
    }
  }

  async register(email: string, password: string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.sendVerificationEmail();
    } catch (error) {
      console.log(error);
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut().then(()=>{
        this.router.navigateByUrl('/login');
      });
    } catch (error) {
      console.log(error);
    }
  }
}
