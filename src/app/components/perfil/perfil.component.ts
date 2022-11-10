import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public usuarios : any = [];
  public turnos : any;

  public usuarioSeleccionado : any;
  public historiaClinica : any = [];

  public listaTurnos : any;
  
  public msjCancelar : string = '';
  public closeResult : any;

  horasLunVie : any = [
    '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
    '17:30','18:00','18:30','19:00'
  ];

  public horaDesdeLun : any;
  public horaHastaLun : any;

  horasSab : any = [
    '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'
  ];



  constructor(private fs : FirestoreService, public as: AuthService, private modalService: NgbModal) { 
    this.fs.ListaTurnos().subscribe((data)=>{

      this.turnos = data;

      this.listaTurnos = data;

      this.turnos.forEach((element: { profesional: { dni: any; }; paciente: any; estado : any}) => {
        if(element.profesional.dni == this.as.user.dni && element.estado == 'finalizado'){
          this.usuarios.push(element.paciente);
        }
      });

      this.turnos = this.turnos.filter((element: any,index: any)=>{
        return this.turnos.indexOf(element) === index;
      });
    });
  }

  verHistoriaClinica(usuario : any, modal : any){
    this.usuarioSeleccionado = usuario;
    this.historiaClinica = [];
    this.listaTurnos.forEach((element: any) => {
      if(element.paciente.dni == this.usuarioSeleccionado.dni){
        this.historiaClinica.push(element.historia);
      }
    });
    console.log(this.historiaClinica);
    this.openHistoriaClinica(modal);
  }

  openHistoriaClinica(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  mostrar(){
    console.log(this.horaDesdeLun);
    console.log(this.horaHastaLun);
  }

  cargarHoras(){
    this.horasLunVie = [
      '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
      '17:30','18:00','18:30','19:00'
    ];
    this.horasSab  = [
      '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'
    ];
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    
  }

}
