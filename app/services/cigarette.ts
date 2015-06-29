import {LocalStorage} from 'services/localstorage'

export class Cigarette{
    private localstorage:LocalStorage;
    private weekGoal: Number;
    private dayGoal: Number;
    private totalCigarettes: Number;
    private budgetCigarettes: Number;
    private nbPacks: Number;
    private pricePack: Number;
    private cigarettesLeft: Number;
    private cigarettePrice: Number;
    private todayCount: Number;
    private weekCount: Number;
    private beginDate: Date;

    constructor(){
        this.localstorage = new LocalStorage();
    }

    /*
        GETTERS
     */

    getWeekGoal(){
        if (this.localstorage.get('week-goal')) {
            this.weekGoal = parseInt(this.localstorage.get('week-goal'));
        } else {
            this.weekGoal = 0;
        }
        
        return this.weekGoal;
    }

    getDayGoal(){
        if (this.localstorage.get('day-goal')) {
            this.dayGoal = parseInt(this.localstorage.get('day-goal'));
        } else {
            this.dayGoal = 0;
        }

        return this.dayGoal;
    }

    getCigarettePrice(){
        if (this.localstorage.get('price')) {
            this.cigarettePrice = this.localstorage.get('price') / 20;
        } else {
            this.cigarettePrice = 0.35;
        }

        return this.pricePack;
    }

    getPricePack(){
        if (this.localstorage.get('price')) {
            this.pricePack = this.localstorage.get('price');
        } else {
            this.pricePack = 0;
        }

        return this.pricePack;
    }
    
    getNbPack(){
        if (this.localstorage.get('nb-packs')) {
            this.nbPacks = parseInt(this.localstorage.get('nb-packs'));
        } else {
            this.nbPacks = 0;
        }
        
        return this.nbPacks;
    }

    getWeekCount(){
        if (this.localstorage.get('week-count')) {
            let weekJsonReceived = JSON.parse(this.localstorage.get('week-count'));

            if (weekJsonReceived.week != moment().week()) {
                weekJsonReceived.week = moment().week();
                weekJsonReceived.nb = 0;

                this.localstorage.saveJson('week-count', JSON.stringify(weekJsonReceived));
            }

            this.weekCount = weekJsonReceived.nb;

        } else {
            this.weekCount = 0;
            let weekJsonSend = { 'week': moment().week(), 'nb': this.weekCount };

            this.localstorage.saveJson('week-count', JSON.stringify(weekJsonSend));
        }

        return this.weekCount;
    }

    getDayCount(){
        if (this.localstorage.get('day-count')) {
            let dayJsonReceived = JSON.parse(this.localstorage.get('day-count'));

            if (dayJsonReceived.day != moment().format("MM/DD/YYYY")) {
                dayJsonReceived.day = moment().format("MM/DD/YYYY");
                dayJsonReceived.nb = 0;

                this.localstorage.saveJson('day-count', JSON.stringify(dayJsonReceived));
            }

            this.todayCount = dayJsonReceived.nb;

        } else {
            this.todayCount = 0;
            let dayJsonSend = { 'day': moment().format("MM/DD/YYYY"), 'nb': this.todayCount };

            this.localstorage.saveJson('day-count', JSON.stringify(dayJsonSend));
        }

        return this.todayCount;
    }
    
    getTotalCigarette(){
        this.totalCigarettes = localStorage.getItem('total-cigarettes');
        this.budgetCigarettes = Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100;
        this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

        let cigarettes = {
            total:0,
            budget:0,
            left:0
        };

        if (this.localstorage.get('total-cigarettes')) {
            this.totalCigarettes = localStorage.getItem('total-cigarettes');
            this.budgetCigarettes = Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100;
            this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

            cigarettes.total = this.totalCigarettes;
            cigarettes.budget = this.budgetCigarettes;
            cigarettes.left = this.cigarettesLeft;
        }

        return cigarettes;
    }
    
    getBeginDate(){
        if (this.localstorage.get('begin-date')) {
            this.beginDate = moment(this.localstorage.get('begin-date')).format('DD/MM/YYYY');
        }

        return this.beginDate;
    }

    /*
        SETTERS
     */

    setWeekGoal(weekGoal){
        this.localstorage.saveNumber('week-goal', weekGoal);
    }

    setDayGoal(dayGoal){
        this.localstorage.saveNumber('day-goal', dayGoal);
    }

    setPricePack(price){
        this.localstorage.saveNumber('price', price);
    }
    setNbPacks(nbPacks){
        this.localstorage.saveNumber('nb-packs', nbPacks);
    }


    /*
        FONCTIONS
     */

    addACigarette(totalCigarettes:number, cigarettes:number, beginDate:Date = new Date()){
        this.totalCigarettes++;
        this.weekCount++;
        this.todayCount++;
        this.budgetCigarettes = parseFloat(Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100);
        this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

        this.localstorage.saveNumber('total-cigarettes', totalCigarettes);
        this.localstorage.saveNumber('cigarettes', cigarettes);

        let weekCount = JSON.parse( this.localstorage.get('week-count'));
        weekCount.nb = this.weekCount;
        this.localstorage.saveJson('week-count', JSON.stringify(weekCount));

        let dayCount = JSON.parse(this.localstorage.get('day-count'));
        dayCount.nb = this.todayCount;
        this.localstorage.saveJson('day-count', JSON.stringify(dayCount));

        if (localStorage.getItem('begin-date')) {
            // Date format
            let date = new Date(localStorage.getItem('begin-date'));
            this.beginDate = moment(date).format('DD/MM/YYYY');
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


        if (this.localstorage.get('begin-date')) {
            beginDate = this.localstorage.get('begin-date');
        } else {
            this.localstorage.saveDate('begin-date', beginDate);
        }

        return beginDate;
    }
    addAPack() {

    }
}