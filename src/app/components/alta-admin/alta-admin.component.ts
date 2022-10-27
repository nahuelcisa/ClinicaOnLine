import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  public grupoControles !: FormGroup;
  private foto : any;
  constructor(private fb : FormBuilder, public fs : FirestoreService, private toastr: ToastrService, private router : Router) { 
    this.grupoControles = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required]],
      'dni' : ['',[Validators.required]],
      'mail' : ['',[Validators.required]],
      'clave' : ['',[Validators.required]],
      'foto' : [],
    });
  }

  agregarAdministrador(){
    let admin = {
      nombre : this.grupoControles.get('nombre')?.value,
      apellido : this.grupoControles.get('apellido')?.value,
      edad : this.grupoControles.get('edad')?.value,
      dni : this.grupoControles.get('dni')?.value,
      mail : this.grupoControles.get('mail')?.value,
      clave : this.grupoControles.get('clave')?.value,
      foto : this.foto,
      perfil : 'administrador'
    }

    this.fs.agregarProfesional(admin);
    this.toastr.success('Confirme mail y el administrador deberá habilitarlo ahora!', 'Profesional registrado!');
    this.grupoControles.reset();
  }

  upload(event : any){
    this.foto = event.target.files[0];
  }

  ngOnInit(): void {
  }

}
