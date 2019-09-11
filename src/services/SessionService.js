export default class SessionService {

    constructor() {
       this.url = 'https://still-ravine-49283.herokuapp.com/api/session';

         // this.url = 'http://localhost:8080/api/session';
    }

    sessionStatus = () => {

        return fetch(this.url + '/status', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'content-type': 'text'
            }
        }).then(function (response) {
            return response.json();
        });
    }

    logout = () => {
        return fetch(this.url + "/logout", {
            method: 'POST',
            credentials: 'include'
        })
    }
}
