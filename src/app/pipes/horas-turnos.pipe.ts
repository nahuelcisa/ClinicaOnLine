import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasTurnos'
})
export class HorasTurnosPipe implements PipeTransform {

  transform(values: any, args: any[]): any {

    let result: any[] = []

    let espElegido = args[0];

    let turnos = args[1];

    let diaElegido = args[2];

    let horas = args[3];

      turnos.forEach((turno: any) => {
        if(turno.profesional.mail == espElegido.mail  && turno.dia[0] == diaElegido[0]){
          let indice = horas.indexOf(turno.hora);
          console.log(indice);
          if(indice != -1)
          horas.splice(indice,1);
          result = [...result, horas];
        }else{
          console.log("else");
        }
      });
    

    return result[0];
  }

  
}
