export default class AdminService {

    constructor() {
        // this.url = 'http://localhost:8080/api/admin';

        this.url = 'https://still-ravine-49283.herokuapp.com/api/admin';
    }

    createUser = (user, callback) => {
        console.log(user);
        return fetch(this.url + '/register', {
            method : 'post',
            body : JSON.stringify(user),
            credentials: 'include',
            headers : {
                'content-type' : 'application/json'
            }
        });

    }



    login = (user) => {
        console.log(user);
        return fetch(this.url + "/login", {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    logout = () => {
        return fetch(this.url + "/logout", {
            method: 'POST',
            credentials: 'include'
        })
    }

    profile = () => {
        return fetch(this.url + "/profile", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        })
    }

}