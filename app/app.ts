/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';

@Component({
  selector: 'app',
})

@View({
	templateUrl: 'templates/main.html',
	directives: [NgFor, NgIf]
})

class App {

	weekGoal: int;
	dayGoal: int;
	totalCigarettes: int;
	budgetCigarettes: String;
	nbPacks: int;
	pricePack: String;
	cigarettesLeft: int;
	cigarettePrice: String;
	beginDate: String;

	constructor() {

		if (localStorage.getItem('week-goal')) {
			this.weekGoal = parseInt(localStorage.getItem('week-goal'));
		} else {
			this.weekGoal = 0;
		}

		if (localStorage.getItem('day-goal')) {
			this.dayGoal = parseInt(localStorage.getItem('day-goal'));
		} else {
			this.dayGoal = 0;
		}

		if (localStorage.getItem('price')) {
			this.pricePack = localStorage.getItem('price');
		} else {
			this.pricePack = '';
		}

		if (localStorage.getItem('nb-packs')) {
			this.nbPacks = parseInt(localStorage.getItem('nb-packs'));
		} else {
			this.nbPacks = 0;
		}

		if (localStorage.getItem('begin-date')) {
			this.beginDate = localStorage.getItem('begin-date');
		}

		if (localStorage.getItem('total-cigarettes')) {
			this.totalCigarettes = localStorage.getItem('total-cigarettes');

			if (localStorage.getItem('price')) {
				this.cigarettePrice = parseInt(localStorage.getItem('price')) / 20;
				this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);
			} else {
				this.budgetCigarettes = Math.round(0.35 * this.totalCigarettes);
			}

			this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		} else {
			this.totalCigarettes = 0;
			this.budgetCigarettes = '0';
		}
	}
	  
	updateWeekGoal($event) {
		this.weekGoal = $event.target.value;
		localStorage.setItem('week-goal', this.weekGoal.toString());
	}

	updateDayGoal($event) {
		this.dayGoal = $event.target.value;
		localStorage.setItem('day-goal', this.dayGoal.toString());
	}

	updatePricePack($event) {
		this.pricePack = $event.target.value;
		this.cigarettePrice = this.pricePack / 20;
		this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);

		localStorage.setItem('price', this.pricePack);
	}

	updateNbPacks($event) {
		this.nbPacks = this.nbPacks + parseFloat($event.target.value);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('nb-packs', this.nbPacks.toString());
	}

	addACigarette() {
		this.totalCigarettes++;
		this.budgetCigarettes += 0.35;
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('total-cigarettes', this.totalCigarettes.toString());
		localStorage.setItem('cigarettes', this.totalCigarettes.toString());

		if (localStorage.getItem('begin-date')) {
			this.beginDate = localStorage.getItem('begin-date');
		} else {
			this.beginDate = new Date();
			localStorage.setItem('begin-date', this.beginDate);
		}

		// Alerts
		if(this.totalCigarettes == (this.dayGoal - 2)){
			alert("Objectif bientôt atteint.");
		}
		if((this.nbPacks * 20) - this.totalCigarettes == 5){
			alert("Vous n'avez bientôt plus de cigarettes dans votre paquet. Il va falloir penser à en racheter.")
		}
	}

	addAPack() {
		this.nbPacks++;
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;
		
		localStorage.setItem('nb-packs', this.nbPacks.toString());
	}
}

bootstrap(App);
