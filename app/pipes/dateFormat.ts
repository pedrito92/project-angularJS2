import {Pipe} from 'angular2/angular2';

export class DateFormat extends Pipe {
  supports(): boolean {
    return true;
  }

  transform(value): string {

    return value.toString();

  }

  create(): Pipe {
    return this;
  }
}