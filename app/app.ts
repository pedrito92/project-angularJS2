/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'app',
  //appInjector: [Deezer]
})

@View({
	templateUrl: 'templates/main.html',
	//directives: [Player, NgFor]
})

class App {

	constructor() {
		console.log("I work !");
	}
}

bootstrap(App);
