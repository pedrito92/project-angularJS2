/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';

@Component({
  selector: 'app',
  //appInjector: [Deezer]
})

@View({
	templateUrl: 'templates/main.html',
	directives: [NgFor, NgIf]
})

class App {

	weekGoal: String;
	dayGoal: String;

	constructor() {
		if (localStorage.getItem('week-goal')) {
			this.weekGoal = localStorage.getItem('week-goal');
		} else {
			this.weekGoal = '';
		}

		if (localStorage.getItem('day-goal')) {
			this.dayGoal = localStorage.getItem('day-goal');
		} else {
			this.dayGoal = '';
		}
	}
	  
	doneTypingWeek($event) {
		this.weekGoal = $event.target.value;
		localStorage.setItem('week-goal', this.weekGoal);
	}

	doneTypingDay($event) {
		this.dayGoal = $event.target.value;
		localStorage.setItem('day-goal', this.dayGoal);
	}
}

bootstrap(App);
