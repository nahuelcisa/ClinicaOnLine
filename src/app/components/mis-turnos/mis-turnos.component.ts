import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public turnos : any = [];

  public modalCancelar = document.getElementById('myModal');

  constructor(public as : AuthService, public fs : FirestoreService) {
    this.fs.ListaTurnos().subscribe((data)=>{

      if(this.as.user.perfil == 'administrador'){
        this.turnos = data;
      }else{
        data.forEach(element => {
          if(element.paciente.dni == this.as.user.dni){
            this.turnos.push(element);
          }
        });
      }
    
      console.log(this.turnos);
    });

  }

  btnCancelar(turno : any){
    this.modalCancelar?.addEventListener('shown.bs.modal', () => {
      this.modalCancelar?.focus()
    })
  }

  ngOnInit(): void {
  }

}
