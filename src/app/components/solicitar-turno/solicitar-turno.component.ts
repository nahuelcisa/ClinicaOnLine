import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  especialidades : any = [];
  especialidadElegida : any = undefined;
  especialistas : any = [];
  especialistaElegido : any = undefined;
  tablaDias : any = [];

  admin = false;

  diaElegido : any = undefined;

  horaElegida : any;

  pacienteSeleccionado : any;

  horasLunVie : any = [
    '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
    '17:30','18:00','18:30','19:00'
  ];

  horasSab : any = [
    '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'
  ];

  turnos : any;

  usuarios : any = [];

  constructor(public as : AuthService, public fs : FirestoreService, private toastr: ToastrService) { 
    if(this.as.user.perfil == 'administrador'){
      this.admin = true;
    }
    this.fs.ListaUsuarios().subscribe((data)=>{
      this.usuarios = [];
      data.forEach((usuario)=>{
        if(usuario.perfil == 'paciente'){
          this.usuarios.push(usuario);
        }
      })
    })
    this.fs.ListaEspecialistas().subscribe((data)=>{
      this.especialistas = data;
      this.especialistas.forEach((especialidad: any) => {
        this.especialidades.push(especialidad.especialidad);
      });
      this.especialidades = this.especialidades.filter(function(elem: any,index: any,self: any){
        return index === self.indexOf(elem);
      });
    });
    this.fs.ListaTurnos().subscribe((data)=>{
      this.turnos = data;
    });
  }

  capturarEspecialidad(especialidad : any){
    this.especialistaElegido = false;
    this.diaElegido = false;
    this.tablaDias = [];
    this.especialidadElegida = especialidad;
  }
  
  capturarPaciente(paciente : any){
    this.especialistaElegido = false;
    this.diaElegido = false;
    this.tablaDias = [];
    this.pacienteSeleccionado = paciente;
  }

  capturarEspecialista(especialista : any){
    this.diaElegido = false;
    this.especialistaElegido = especialista;
    this.tablaDias = [];
    this.armarTablaDias();
  }

  generarDias(dias : any){

    let fechaActual = new Date();

    fechaActual.setDate(fechaActual.getDate() + dias);

    return fechaActual;
  }

  armarTablaDias(){

    for(let index = 0; index < 15; index++){
      let fechaArray = [ 
      this.generarDias(index).toLocaleDateString('es-ES'),
      this.generarDias(index).toLocaleDateString('es-ES', {weekday:'long'})];

      this.tablaDias.push(fechaArray);
    }

    this.tablaDias = this.tablaDias.filter((dia : any)=>{
      return dia[1] != 'domingo';
    })

  }

  capturarDia(dia : any){
      this.cargarHoras();
      this.diaElegido = dia;
      this.turnos.forEach((turno: any) => {
        if(turno.profesional.mail == this.especialistaElegido.mail && (turno.estado != 'finalizado' && turno.estado != 'cancelado' ) && turno.dia[0] == this.diaElegido[0]){
          let indice = this.horasLunVie.indexOf(turno.hora);
          if(indice != -1){
            this.horasLunVie.splice(indice,1);
          }
        }
      });
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

  seleccionarTurno(hora : any){

    let turno = {
      profesional : this.especialistaElegido,
      paciente : this.as.user,
      hora : hora,
      dia : this.diaElegido,
      estado : 'pendiente',
      comentario : '',
      encuesta: '',
      calificacion: '',
      diagnostico : ''
    }

    if(this.admin){
      turno.paciente = this.pacienteSeleccionado;
    }

    this.fs.agregarTurno(turno).then(()=>{
      this.diaElegido = false;
      this.especialidadElegida = false;
      this.especialistaElegido = false;
      this.toastr.success('Se solicito correctamente!', 'Turno solicitado!');
    }).catch((error)=>{
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
