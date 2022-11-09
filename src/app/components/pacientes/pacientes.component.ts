import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  public usuarios : any = [];
  public turnos : any;

  public usuarioSeleccionado : any;
  public historiaClinica : any = [];

  public listaTurnos : any;
  
  public msjCancelar : string = '';
  public closeResult : any;

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
