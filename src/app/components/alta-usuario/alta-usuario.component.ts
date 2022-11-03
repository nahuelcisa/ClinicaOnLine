import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CaptchaService } from 'src/app/services/captcha.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  public grupoControles !: FormGroup;
  private foto : any;
  public captcha : any;

  constructor(private fb : FormBuilder, public fs : FirestoreService, private toastr: ToastrService, private router : Router, public cs : CaptchaService) { 
    this.grupoControles = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required]],
      'obraSocial' : ['',[Validators.required]],
      'dni' : ['',[Validators.required]],
      'mail' : ['',[Validators.required]],
      'clave' : ['',[Validators.required]],
      'foto' : [],
      'captcha': ['',[Validators.required]]
    });
  }

  agregarUsuario(){
    let usuario = {
      nombre : this.grupoControles.get('nombre')?.value,
      apellido : this.grupoControles.get('apellido')?.value,
      edad : this.grupoControles.get('edad')?.value,
      obraSocial : this.grupoControles.get('obraSocial')?.value,
      dni : this.grupoControles.get('dni')?.value,
      mail : this.grupoControles.get('mail')?.value,
      clave : this.grupoControles.get('clave')?.value,
      perfil : 'paciente',
      foto : this.foto
    }
    if(this.captcha == this.cs.palabra){
    this.fs.agregarUsuario(usuario);
    this.toastr.success('Confirme mail ahora!', 'Usuario registrado!');
    this.grupoControles.reset();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
    }else{
      this.toastr.error('Verifique el captcha!', 'Error en captcha!');
    }
  }

  upload(event : any){
    this.foto = event.target.files[0];
  }
  ngOnInit(): void {
  }

}
