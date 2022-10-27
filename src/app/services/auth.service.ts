import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = '';
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
