export class LocalStorage{
    saveNumber(key:string, value:Number){
        localStorage.setItem(key, value.toString());
    }

    saveDate(key:string, date:Date){
        localStorage.setItem(key, date.toString());
    }

    saveJson(key:string, json:string){
        localStorage.setItem(key, json);
    }

    get(key:string){
        return localStorage.getItem(key);
    }
}