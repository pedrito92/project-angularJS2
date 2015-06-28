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
	nbPacks: String;
	pricePack: String;
	cigarettesLeft: String;
	cigarettePrice: String;

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

		if (localStorage.getItem('price')) {
			this.pricePack = localStorage.getItem('price');
		} else {
			this.pricePack = '';
		}

		if (localStorage.getItem('nb-packs')) {
			this.nbPacks = localStorage.getItem('nb-packs');
		} else {
			this.nbPacks = '';
		}

		if (localStorage.getItem('total-cigarettes')) {
			this.totalCigarettes = localStorage.getItem('total-cigarettes');

			if (localStorage.getItem('price')) {
				this.cigarettePrice = localStorage.getItem('price') / 20;
				this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);
			} else {
				this.budgetCigarettes = Math.round(0.35 * this.totalCigarettes);
			}

			this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		} else {
			this.totalCigarettes = 0;
			this.budgetCigarettes = 0;
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

	updatePricePack($event) {
		this.pricePack = $event.target.value;
		this.cigarettePrice = this.pricePack / 20;
		this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);

		localStorage.setItem('price', this.pricePack);
	}

	updateNbPacks($event) {
		this.nbPacks = parseFloat(this.nbPacks) + parseFloat($event.target.value);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('nb-packs', this.nbPacks);
	}

	addACigarette() {
		this.totalCigarettes++;
		this.budgetCigarettes += 0.35;

		localStorage.setItem('total-cigarettes', this.totalCigarettes);
		localStorage.setItem('cigarettes', this.totalCigarettes);

		if(this.totalCigarettes == (this.dayGoal - 2)){
			alert("Objectif bientôt atteint.");
		}
	}
}

bootstrap(App);
