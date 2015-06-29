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

	weekGoal: Number;
	dayGoal: Number;
	totalCigarettes: Number;
	budgetCigarettes: Number;
	nbPacks: Number;
	pricePack: Number;
	cigarettesLeft: Number;
	cigarettePrice: Number;
	beginDate: Date;

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
			this.pricePack = 0;
		}

		if (localStorage.getItem('nb-packs')) {
			this.nbPacks = parseInt(localStorage.getItem('nb-packs'));
		} else {
			this.nbPacks = 0;
		}

		if (localStorage.getItem('begin-date')) {
			date = new Date(localStorage.getItem('begin-date'));
			this.beginDate = moment(date).format('DD/MM/YYYY');
		}

		if (localStorage.getItem('price')) {
			this.cigarettePrice = parseInt(localStorage.getItem('price')) / 20;
			
		} else {
			this.cigarettePrice = 0.35;
		}

		if (localStorage.getItem('total-cigarettes')) {
			this.totalCigarettes = localStorage.getItem('total-cigarettes');
			this.budgetCigarettes = Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100;
			this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;
		} else {
			this.totalCigarettes = 0;
			this.budgetCigarettes = 0;
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
		console.log(this.cigarettePrice);
		this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);

		localStorage.setItem('price', this.pricePack.toString());
	}

	updateNbPacks($event) {
		this.nbPacks = this.nbPacks + parseFloat($event.target.value);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('nb-packs', this.nbPacks.toString());
	}

	addACigarette() {
		this.totalCigarettes++;
		this.budgetCigarettes = parseFloat(Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100);
		console.log(this.cigarettePrice);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('total-cigarettes', this.totalCigarettes.toString());
		localStorage.setItem('cigarettes', this.totalCigarettes.toString());

		if (localStorage.getItem('begin-date')) {
			date = new Date(localStorage.getItem('begin-date'));
			this.beginDate = moment(date).format('DD/MM/YYYY');
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
