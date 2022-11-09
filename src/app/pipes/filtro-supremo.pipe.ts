import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSupremo'
})
export class FiltroSupremoPipe implements PipeTransform {

  transform(values: any[], arg: any): any[]  {
    let result : any[] = [];

    if(!arg || arg?.length <1 || arg.trim() == ""){
      return values;    
    } 
    for (const value of values) {
      if(
        value.calificacion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.comentario.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.dia[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.dia[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.diagnostico.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value?.encuesta?.mensaje.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value?.encuesta?.puntaje).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.hora.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value?.historia?.altura.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.peso.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.temperatura.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.presion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico1[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico1[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico2[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico2[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico3[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historia?.dinamico3[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value?.paciente?.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value?.paciente?.dni).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value?.paciente?.edad).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.paciente?.mail.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.paciente?.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.paciente?.obraSocial.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value?.profesional?.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value?.profesional?.dni).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value?.profesional?.edad).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.profesional?.mail.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.profesional?.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.profesional?.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        result = [...result, value];
      }
    } 

    return result;
  }

}
