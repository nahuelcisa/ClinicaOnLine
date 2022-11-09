import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public turnos : any = [];

  public msjCancelar : string = '';
  public closeResult : any;
  public turnoSeleccionado : any;
  public msjComentario : any;
  public msjDiagnostico : any;
  public slideEncuesta : any;
  public filtroEspecialista : any;
  public filtroEspecialidad : any;
  public filtroPaciente : any;
  public filtroSupremo : any;

  public altura : any;
  public peso: any;
  public temperatura : any;
  public presion : any;

  public clave1 : any = '';
  public valor1: any = '';

  public clave2 : any = '';
  public valor2: any = '';

  public clave3 : any = '';
  public valor3: any = '';

  public dinamico = 1;
  
  constructor(public as : AuthService, public fs : FirestoreService, private modalService: NgbModal, private toastr: ToastrService) {
    this.fs.ListaTurnos().subscribe((data)=>{
      this.turnos  = [];
      if(this.as.user.perfil == 'profesional'){
        data.forEach(element => {
          if(element.profesional.dni == this.as.user.dni){
            this.turnos.push(element);
          }
        });
      }else{
        data.forEach(element => {
          if(element.paciente.dni == this.as.user.dni){
            this.turnos.push(element);
          }
        });
      }
    });
  }

  agregarCampo(){
    this.dinamico++;
  }

  openCancelacion(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.turnoSeleccionado.comentario = result;
          this.turnoSeleccionado.estado = 'cancelado'
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id).then(()=>{
            this.toastr.error('Se cancelo el turno exitosamente', 'Turno cancelado!!');
          });
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  openFinalizacion(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.turnoSeleccionado.comentario = result;
          this.turnoSeleccionado.diagnostico = this.msjDiagnostico;
          this.turnoSeleccionado.estado = 'finalizado'
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id).then(()=>{
            this.toastr.warning('Se finalizo el turno exitosamente', 'Turno finalizado!!');
          });
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  openHistoriaClinica(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {

          let historia = {
            altura : this.altura,
            peso : this.peso,
            temperatura : this.temperatura,
            presion : this.presion,
            dinamico1: [this.clave1,this.valor1],
            dinamico2: [this.clave2,this.valor2],
            dinamico3: [this.clave3,this.valor3]
          }

          this.turnoSeleccionado.historia = historia;
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id).then(()=>{
            this.toastr.success('Se Cargo la historia', 'Historia cargada!!');
          });
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  openCalificarAtencion(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.turnoSeleccionado.calificacion = result;
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id);
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }
  
  openCompletarEncuesta(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          let encuesta = {
            mensaje : result,
            puntaje : this.slideEncuesta
          }
          this.turnoSeleccionado.encuesta = encuesta;
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id);
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  openComentario(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
    );
  }

  openDiagnostico(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
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

  btnCancelar(turno : any, modal : any){
    this.turnoSeleccionado = turno;
    this.openCancelacion(modal);
  }

  btnAceptar(turno : any){
    this.turnoSeleccionado = turno;
    this.turnoSeleccionado.estado = 'aceptado';
          this.fs.ModificarTurno(this.turnoSeleccionado, this.turnoSeleccionado.id);
  }

  btnVerHistoriaClinica(turno: any, modal : any){
    this.turnoSeleccionado = turno;
    this.openHistoriaClinica(modal);
  }

  btnFinalizar(turno : any, modal : any){
    this.turnoSeleccionado = turno;
    this.openFinalizacion(modal);
  }

  btnCompletarEncuesta(turno : any, modal : any){
    this.turnoSeleccionado = turno;
    this.openCompletarEncuesta(modal);
  }

  btnVerComentario(turno : any, modal : any){
    this.msjComentario = turno.comentario;
    this.openComentario(modal);
  }

  btnVerDiagnostico(turno : any, modal : any){
    this.msjComentario = turno.diagnostico;
    this.openComentario(modal);
  }

  btnCalificarAtencion(turno : any, modal : any){
    this.turnoSeleccionado = turno;
    this.openCalificarAtencion(modal);
  }

  ngOnInit(): void {
  }

}
