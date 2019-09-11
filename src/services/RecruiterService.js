export default class RecruiterService {

    constructor() {
       this.url = 'https://still-ravine-49283.herokuapp.com/api/recruiter';

         // this.url = 'http://localhost:8080/api/recruiter';
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

    };

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
    };

    logout = () => {
        return fetch(this.url + "/logout", {
            method: 'POST',
            credentials: 'include'
        })
    };

    profile = () => {
        return fetch(this.url + "/profile", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        })
    }

    getJobByRecuiter = () => {
        return fetch(this.url + "/job", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        })
    }

    createJobOpening = (job) => {
        return fetch(this.url + "/job", {
            method: 'POST',
            body: JSON.stringify(job),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).catch(err => console.log(err))
    }

    updateUser = (userId, user, callback) => {

        return fetch(this.url + '/' + userId, {
            method : 'put',
            body : JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        });
    }

    getInterestedApplicants = () => {
        return fetch(this.url + "/interestedApplicants", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        })
    }
}
