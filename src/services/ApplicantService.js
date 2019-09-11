export default class ApplicantService {

    constructor() {
       this.url = 'https://still-ravine-49283.herokuapp.com/api/applicant';

         // this.url = 'http://localhost:8080/api/applicant';
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

    sessionInactive = () => {

        return fetch(this.url + '/status', {
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        });
    }

    applyToJobs = (job) => {
        delete job.company_logo
        delete job.description
        console.log(job);
        //return fetch('https://still-ravine-49283.herokuapp.com/api/job/apply', {
            return fetch('http://localhost:8080/api/job/apply', {
            method: 'POST',
            body: JSON.stringify(job),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    fetchAppliedJobs = ()  => {
        console.log("fetchAppliedJobs....")
        return fetch(this.url + "/jobs", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
 }

    getAllApplicants = () => {
        console.log("getAllApplicants")
        return fetch(this.url, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getJobsForApplicant = (username) => {
        console.log("getJobsForApplicant")
        return fetch(this.url + '/' + username + '/jobs', {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getUserByUsernameService = (username) => {
        console.log("getUserByUsernameService")
        return fetch(this.url + '/username/' + username, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    followUser = (username) => {
        console.log("followUser");
        return fetch(this.url + '/follow/' + username, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    unfollowUser = (username) => {
        console.log("unfollowUser");
        return fetch(this.url + '/unfollow/' + username, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getFollowing = (username) => {
        console.log("getFollowing")
        return fetch(this.url + '/following/' + username, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getFollowed = (username) => {
        console.log("getFollowed")
        return fetch(this.url + '/followed/' + username, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    isFollowing = (username) => {
        console.log("isFollowing")
        return fetch(this.url + '/isFollowing/' + username, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }
}
