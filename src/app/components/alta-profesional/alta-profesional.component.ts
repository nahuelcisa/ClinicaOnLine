import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaptchaService } from 'src/app/services/captcha.service';

@Component({
  selector: 'app-alta-profesional',
  templateUrl: './alta-profesional.component.html',
  styleUrls: ['./alta-profesional.component.scss']
})
export class AltaProfesionalComponent implements OnInit {

  public grupoControles !: FormGroup;
  private foto : any;
  public captcha : any;

  constructor(private fb : FormBuilder, public fs : FirestoreService, private toastr: ToastrService, private router : Router, public cs : CaptchaService) { 
    this.grupoControles = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required]],
      'esp' : ['',[Validators.required]],
      'dni' : ['',[Validators.required]],
      'mail' : ['',[Validators.required]],
      'clave' : ['',[Validators.required]],
      'captcha': ['',[Validators.required]],
      'foto' : [],
    });
  }

  agregarProfesional(){
    let profesional = {
      nombre : this.grupoControles.get('nombre')?.value,
      apellido : this.grupoControles.get('apellido')?.value,
      edad : this.grupoControles.get('edad')?.value,
      especialidad : this.grupoControles.get('esp')?.value,
      dni : this.grupoControles.get('dni')?.value,
      mail : this.grupoControles.get('mail')?.value,
      clave : this.grupoControles.get('clave')?.value,
      foto : this.foto,
      perfil : 'profesional',
      horaDesdeLun : '8:00',
      horaHastaLun : '19:00',
      horaDesdeSab : '8:00',
      horaHastaSab : '14:00',
      habilitado : false
    }
    if(this.captcha == this.cs.palabra){
      this.fs.agregarProfesional(profesional);
      this.toastr.success('Confirme mail y el administrador deberá habilitarlo ahora!', 'Profesional registrado!');
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
