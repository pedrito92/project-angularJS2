/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {Deezer} from 'services/deezer';
import {Player} from 'components/player';

@Component({
  selector: 'app',
  appInjector: [Deezer]
})

@View({
	templateUrl: 'templates/main.html',
	directives: [Player, NgFor]
})

class App {
	source: Array<Object>;
	deezer: Deezer;
  	user: Array<Object>;
  	playlist: String;
  	data: String;

	constructor(deezer: Deezer) {
		console.log("I work !");

		this.source = [
			{ src: 'http://static.videogular.com/assets/videos/videogular.mp4', type: 'video/mp4' },
			{ src: 'http://static.videogular.com/assets/videos/videogular.webm', type: 'video/webm' },
			{ src: 'http://static.videogular.com/assets/videos/videogular.ogg', type: 'video/ogg' }
		];

		this.deezer = deezer;

		this.deezer.searchPlaylist('06Mart22').then(response => {
			console.log(response);
			if (response != null) {
				this.data = "Data received. Take a look in the console.";
				//this.user = response; // This first function is called if promise is fullfilled
			}
		}, response => {
			console.warn('research failed'); // This second function is called if promise is rejected
		});
		
		//this.get Playlist();
	}
		   
	getPlaylist(){
	  	this.playlist = this.deezer.getPlaylist(this.user.name).then(response => {
	 	    console.log(response);
 
		    //this.user = respons e; // This first function is called if promise is fullfilled
		}, response => {
     		console.warn('Playlist loading failed'); // This second function is called if promise is rejected
    	});
		
		console.log(this.playlist);
	}
}

bootstrap(App);
