import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  public palabras : any = [
    'captcha',
    'palabra',
    'perro',
    'gato',
    'hola',
    'chau'
  ];

  public palabra : any;

  constructor() {
    this.generarCaptcha();
  }

  generarCaptcha() {
    let index =  Math.floor(Math.random() * (5 - 0 + 1) + 0);

    this.palabra = this.palabras[index];
  }
  

}
