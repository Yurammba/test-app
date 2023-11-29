import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'authorFormPipe'
})
export class AuthorFormPipe implements PipeTransform {

  transform(value: any): string {
    const [lastName, firstName, fatherName] = value;
    if (lastName && firstName && fatherName) {
      return `${lastName} ${firstName.charAt(0)}. ${fatherName.charAt(0)}.`;
    }
    return '';
  }
}
