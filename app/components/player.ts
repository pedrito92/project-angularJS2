import {Component, View, NgFor} from 'angular2/angular2';

// @Component({
// 	selector: "player", // element with this attributes will get the directive
// 	templateUrl: 'templates/player.html',
// 	hostListeners: {
// 		'mouseover': 'onMouseEnter()', // automatically call functions depending on specific event on targeted element
// 		'mouseleave': 'onMouseLeave()'
// 	}
// })
@Component({
	selector: 'player',
	properties: [
        'files': 'files'
    ]
})
@View({
	templateUrl: 'templates/player.html',
    directives: [NgFor]
})

export class Player {
    isPlaying: Boolean = false;
    element: HTMLElement;

    

    constructor() {
        this.element = document.querySelector("player audio");
        
        this.element.addEventListener('ended' ,function(e){
            
        });
    }

    playPause() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) this.element.play();
        else this.element.pause();
    }
}
