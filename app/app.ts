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
	totalCigarettes: String;
	budgetCigarettes: String;

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

		if (localStorage.getItem('cigarettes')) {
			this.totalCigarettes = localStorage.getItem('cigarettes');
		} else {
			this.totalCigarettes = 0;
		}
	}
	  
	updateWeekGoal($event) {
		this.weekGoal = $event.target.value;
		localStorage.setItem('week-goal', this.weekGoal);
	}

	updateDayGoal($event) {
		this.dayGoal = $event.target.value;
		localStorage.setItem('day-goal', this.dayGoal);
	}

	addACigarette() {
		this.totalCigarettes++;
		localStorage.setItem('cigarettes', this.totalCigarettes);
	}
}

bootstrap(App);
