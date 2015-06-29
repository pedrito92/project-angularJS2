/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
//import {Moment} from 'moment';

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
	todayCount: Number;
	weekCount: Number;

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
			// var day = new Date(2011, 9, 16);
			// var dayWrapper = moment().format('DD/MM/YYYY');
			// console.log(dayWrapper);
			// console.log(moment());
			this.beginDate = localStorage.getItem('begin-date');
		}

		if (localStorage.getItem('week-count')) {
			let weekJsonReceived = JSON.parse(localStorage.getItem('week-count'));
			
			if (weekJsonReceived.week != moment().week()) {
				weekJsonReceived.week = moment().week();
				weekJsonReceived.nb = 0;

				localStorage.setItem('week-count', JSON.stringify(weekJsonReceived));
			}

			this.weekCount = weekJsonReceived.nb;

		} else {
			this.weekCount = 0;
			let weekJsonSend = { 'week': moment().week(), 'nb': this.weekCount };

			localStorage.setItem('week-count', JSON.stringify(weekJsonSend));
		}


		if (localStorage.getItem('day-count')) {
			let dayJsonReceived = JSON.parse(localStorage.getItem('day-count'));
	
			if (dayJsonReceived.day != moment().format("MM/DD/YYYY")) {
				dayJsonReceived.day = moment().format("MM/DD/YYYY");
				dayJsonReceived.nb = 0;
				
				localStorage.setItem('day-count', JSON.stringify(dayJsonReceived));
			}
			
			this.todayCount = dayJsonReceived.nb;

		} else {
			this.todayCount = 0;
			let dayJsonSend = { 'day': moment().format("MM/DD/YYYY"), 'nb': this.todayCount };
			
			localStorage.setItem('day-count', JSON.stringify(dayJsonSend));
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
		this.weekCount++;
		this.todayCount++;
		this.budgetCigarettes = parseFloat(Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		localStorage.setItem('total-cigarettes', this.totalCigarettes.toString());
		localStorage.setItem('cigarettes', this.totalCigarettes.toString());
		
		let weekCount = JSON.parse(localStorage.getItem('week-count'));
		weekCount.nb = this.weekCount;
		localStorage.setItem('week-count', JSON.stringify(weekCount));

		let dayCount = JSON.parse(localStorage.getItem('day-count'));
		dayCount.nb = this.todayCount;
		localStorage.setItem('day-count', JSON.stringify(dayCount));

		if (localStorage.getItem('begin-date')) {
			this.beginDate = localStorage.getItem('begin-date');
		} else {
			this.beginDate = new Date();
			localStorage.setItem('begin-date', this.beginDate);
		}
		
		// Alerts
		if (this.totalCigarettes == (this.dayGoal - 2)) {
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

	resetAll() {
		localStorage.clear();

		this.weekGoal = undefined;
		this.dayGoal = undefined;
		this.totalCigarettes = undefined;
		this.budgetCigarettes = undefined;
		this.nbPacks = undefined;
		this.pricePack = undefined;
		this.cigarettesLeft = undefined;
		this.cigarettePrice = undefined;
		this.beginDate = undefined;
		this.todayCount = undefined;
		this.weekCount = undefined;

		location.reload();
	}
}

bootstrap(App);
