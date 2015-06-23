/// <reference path='../typings/tsd.d.ts' />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {Deezer} from 'services/deezer';

@Component({
  selector: 'app',
  appInjector: [Deezer]
})
@View({
  template: `<h1>Welcome !</h1>
  <p>{{data}}</p>
  <p>
  {{playlist}}
      <!--<ul>-->
        <!--<li *ng-for='#element of playlist'>{{element}}</li>-->
      <!--</ul>-->
  </p>
  `,
  directives: [NgFor]
})
class App {
  data: String;
  deezer: Deezer;
  user: Array<Object>;
  playlist: String;
  constructor(deezer: Deezer){
    this.deezer = deezer;

    this.deezer.searchPlaylist('thomye').then(response => {
      console.log(response);
      if(response!=null)
        this.data = "Data received. Take a look in the console.";
      //this.user = response; // This first function is called if promise is fullfilled
    }, response => {
      console.warn('research failed'); // This second function is called if promise is rejected
    });
    //this.getPlaylist();
  }

  getPlaylist(){
    this.playlist = this.deezer.getPlaylist(this.user.name).then(response => {
      console.log(response);

      //this.user = response; // This first function is called if promise is fullfilled
    }, response => {
      console.warn('Playlist loading failed'); // This second function is called if promise is rejected
    });;
    console.log(this.playlist);
  }
}

bootstrap(App);
