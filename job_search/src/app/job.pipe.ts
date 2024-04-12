import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'job'
})
export class JobPipe implements PipeTransform {

  transform(value: any): string {
    return JSON.stringify(value, null, 2); 
  }

}
// json-format.pipe.ts

