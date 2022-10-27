import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public grupoControles !: FormGroup;
  public usuarios : any;
  constructor(private fb : FormBuilder, public as : AuthService, private router : Router, private fs : FirestoreService, private toastr: ToastrService) { 
    this.grupoControles = this.fb.group({
      'email': ['',[Validators.required]],
      'clave' : ['',[Validators.required]]
    });
    this.fs.ListaUsuarios().subscribe((data)=>{
      this.usuarios = data;
    });
  }

  iniciarSesion(){
    let usuario = {
      email : this.grupoControles.get('email')?.value,
      clave : this.grupoControles.get('clave')?.value
    }
    let correo = this.usuarios.filter((usu: { mail: any; }) => usu.mail == usuario.email);
    if(correo.length == 1){
      this.as.user = correo[0];
      console.log(this.as.user);
      this.as.login(usuario.email,usuario.clave).then(()=>{
        if (this.as.userDateFirebase.user.emailVerified == true) {   
                  if(this.as.user.perfil == 'profesional'){
                    if(this.as.user.habilitado){
                      this.toastr.success('disfrute del sistema!', 'Bienvenido!');
                    }else{
                        //Usuario No habilitado por un Administrador
                        this.toastr.error('Espere la habilitacion del administrador!', 'profesional NO HABILITADO!');
                    }
                  }else{
                    this.toastr.success('disfrute del sistema!', 'Bienvenido!');
                  }
                }else{
                  this.toastr.error('Verifique su casilla de correo!', 'Correo NO CONFIRMADO!');
                }
      });
    }else{
      this.toastr.error('Verifique si los datos son correctos!', 'ERROR EN LOS DATOS!');
    }
  }

  ngOnInit(): void {
  }

}
