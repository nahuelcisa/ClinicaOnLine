import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

  transform(values: any[], arg: string): any[]{
    let result : any[] = [];
      if(arg != ''){
        result = values.slice(values.indexOf(arg) + 1, values.length);
      }
    return result;
  }

}
