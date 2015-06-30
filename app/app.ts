/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor, NgIf, defaultPipes, PipeRegistry, bind} from 'angular2/angular2';
import {Cigarette} from 'services/cigarette'
import {DateFormat} from 'pipes/dateFormat';


@Component({
  	selector: 'app'
})

@View({
	templateUrl: 'templates/main.html',
	directives: [NgFor, NgIf]
})

class App {
	cigarette: Cigarette;

	messageSuggestion: String;
	weekGoal: Number = 0;
	dayGoal: Number = 0;
	totalCigarettes: Number = 0;
	budgetCigarettes: Number = 0;
	nbPacks: Number = 0;
	pricePack: Number = 0;
	cigarettesLeft: Number = 0;
	cigarettePrice: Number = 0;
	beginDate: Date;
	todayCount: Number = 0;
	weekCount: Number = 0;

	constructor() {
		this.cigarette = new Cigarette();

		this.weekGoal = this.cigarette.getWeekGoal();
		this.dayGoal = this.cigarette.getDayGoal();
		this.pricePack = this.cigarette.getPricePack();
		this.nbPacks = this.cigarette.getNbPack();
		this.beginDate = this.cigarette.getBeginDate();
		this.cigarettePrice = this.cigarette.getCigarettePrice();
		this.weekCount = this.cigarette.getWeekCount();
		this.todayCount = this.cigarette.getDayCount();

		let cigarettes = this.cigarette.getTotalCigarette();
		if(typeof cigarettes == undefined){
			this.totalCigarettes = cigarettes.total;
			this.budgetCigarettes = cigarettes.budget;
			this.cigarettesLeft = cigarettes.left;
		}

		console.log(this.todayCount);
		this.addASuggestion(this.budgetCigarettes);

	}

	// Suggestion de loisirs à partir d'un certain montant passé dans les cigarettes
	addASuggestion(value) {
		switch (true) {
			case (value >= 10 && value < 20):
		        this.messageSuggestion = "Vous avez manqué l'occasion d'aller au cinéma...";
		        break;
		    case (value >= 20 && value < 30):
		        this.messageSuggestion = "Dommage ! Vous auriez pu inviter votre copine au MacDo.";
		        break;
		    case (value >= 30 && value < 70):
		        this.messageSuggestion = "Vous auriez pu aller au restaurant...";
		        break;
		    case (value >= 70 && value < 150):
		        this.messageSuggestion = "Vous n'allez pas agrandir votre cave à vin de si tôt...";
		        break;
		    case (value >= 150 && value < 300):
		        this.messageSuggestion = "Vous auriez pu compléter votre garde-robe..";
		        break;
		    case (value >= 300):
		        this.messageSuggestion = "Vous auriez pu vous faire un petit week-end en amoureux...";
		        break;

		}

		localStorage.setItem('message-suggestion', this.messageSuggestion);
	}
	  
	updateWeekGoal($event) {
		this.weekGoal = $event.target.value;
		this.cigarette.setWeekGoal($event.target.value);
	}

	updateDayGoal($event) {
		this.dayGoal = $event.target.value;
		this.cigarette.setDayGoal($event.target.value);
	}

	updatePricePack($event) {
		this.pricePack = $event.target.value;
		this.cigarettePrice = this.pricePack / 20;
		this.budgetCigarettes = Math.round(this.cigarettePrice * this.totalCigarettes);

		this.cigarette.setPricePack($event.target.value);
	}

	updateNbPacks($event) {
		this.nbPacks = this.nbPacks + parseFloat($event.target.value);
		this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

		this.cigarette.setNbPacks($event.target.value);
	}

	addACigarette() {
		console.log(this.todayCount);
		this.totalCigarettes++;
		this.weekCount++;
		this.todayCount++;
		this.budgetCigarettes = parseFloat(Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100);

		this.addASuggestion(this.budgetCigarettes);

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
			this.beginDate = moment();
			localStorage.setItem('begin-date', this.beginDate);
		}
		
		// Alerts
		if (this.todayCount == (this.dayGoal - 2)) {
			alert("Objectif quotidien bientôt atteint.");
		}

		if (this.weekCount == (this.weekGoal - 2)) {
			alert("Objectif de la semaine bientôt atteint.");
		} 

		if ((this.nbPacks * 20) - this.totalCigarettes == 5){
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

		this.messageSuggestion = undefined;
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

	getTodayClass() {
		if (this.dayGoal && this.todayCount >= this.dayGoal) {
			return true;
		} 
	}
	
	getWeekClass() {
		if (this.weekGoal && this.weekCount >= this.weekGoal) {
			return true;
		} 
	}
}

export var pipes = Object.assign({}, defaultPipes, {
	format: [
		new DateFormat()
	]
});

bootstrap(App, bind(PipeRegistry).toValue(new PipeRegistry(pipes)));