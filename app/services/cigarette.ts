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
    private messageSuggestion: String;

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
            this.cigarettePrice = parseFloat(this.localstorage.get('price') / 20);
        } else {
            this.cigarettePrice = 0.35;
        }

        return this.cigarettePrice;
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

            if (dayJsonReceived.day != moment().format("DD/MM/YYYY")) {
                dayJsonReceived.day = moment().format("DD/MM/YYYY");
                dayJsonReceived.nb = 0;

                this.localstorage.saveJson('day-count', JSON.stringify(dayJsonReceived));
            }

            this.todayCount = dayJsonReceived.nb;

        } else {
            this.todayCount = 0;
            let dayJsonSend = { 'day': moment().format("DD/MM/YYYY"), 'nb': this.todayCount };

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
            this.beginDate = this.localstorage.get('begin-date');
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

    addACigarette(){
        this.totalCigarettes++;
        this.weekCount++;
        this.todayCount++;
        this.budgetCigarettes = parseFloat(Math.round((this.cigarettePrice * this.totalCigarettes)*100)/100);
        this.cigarettesLeft = (this.nbPacks * 20) - this.totalCigarettes;

        this.localstorage.saveNumber('total-cigarettes', this.totalCigarettes);

        let weekCount = JSON.parse( this.localstorage.get('week-count'));
        weekCount.nb = this.weekCount;
        this.localstorage.saveJson('week-count', JSON.stringify(weekCount));

        let dayCount = JSON.parse(this.localstorage.get('day-count'));
        dayCount.nb = this.todayCount;
        this.localstorage.saveJson('day-count', JSON.stringify(dayCount));

        if (!this.beginDate) {
            this.beginDate = moment().format('DD/MM/YYYY');
            this.localstorage.saveDate('begin-date', this.beginDate);
            return this.beginDate;
        }
    }
    addAPack(pack:Number) {
        this.nbPacks = pack;
        this.localstorage.saveNumber('nb-packs', pack);

    }

    addASuggestion(value){
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
                this.messageSuggestion = "Vous auriez pu compléter votre garde-robe...";
                break;
            case (value >= 300):
                this.messageSuggestion = "Vous auriez pu vous faire un petit week-end en amoureux...";
                break;

        }

        this.localstorage.saveString('message-suggestion', this.messageSuggestion);

        return this.messageSuggestion;
    }
}