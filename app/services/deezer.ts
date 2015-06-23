/**
 * Created by Pierre on 21/06/15.
 */
export class Deezer{
    url:String = 'https://api.deezer.com';
    urlUser:String = '/user';
    urlPlaylist:String = '/playlists';
    urlSearch:String = '/search/playlist?q=';

    searchPlaylist(search){
        let url:String = this.url+this.urlSearch+search;
        return new Promise((resolve, reject) => {
            fetch(url)
            //fetch('data/search.json')
            //fetch('https://api.deezer.com/album/302127')
            .then(response => response.json())
            .then(response => {
                    resolve(response); // resolve promise with response if it fetch succeded
                }).catch(() => {
                    reject(); // reject promise if we catch a fetch error
                });
        });
    }

    getUserDetails(id = null){
        let url:String = (this.url+this.urlUser+id).toString();

        return new Promise((resolve, reject) => {
            fetch(url)
                //fetch('data/playlist.json')
                .then(response => response.json())
                .then(response => {
                    resolve(response); // resolve promise with response if it fetch succeded
                }).catch(() => {
                    reject(); // reject promise if we catch a fetch error
                });
        });
    }

    getPlaylist(url = null){
        let regex: RegExp = /'https:\/\/api.deezer.com\/playlist\/[0-9]+\/tracks'/;
        if(regex.test(url)){
            return new Promise((resolve, reject) => {
                fetch(url)
                    //fetch('data/playlist.json')
                    .then(response => response.json())
                    .then(response => {
                        resolve(response); // resolve promise with response if it fetch succeded
                    }).catch(() => {
                        reject(); // reject promise if we catch a fetch error
                    });
            });
        }else{
            return {'error':'L\'url fournit ne correspond pas'};
        }

    }
}