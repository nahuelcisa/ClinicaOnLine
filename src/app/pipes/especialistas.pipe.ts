import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialistas'
})
export class EspecialistasPipe implements PipeTransform {

  transform(values: any, arg: any[]): any {
    let result: any[] = []
    console.log(arg);
    for (const value of values) {
        if(value.especialidad.indexOf(arg) > -1){
          result = [...result, value];
        }
    }
    return result;
  }

}
