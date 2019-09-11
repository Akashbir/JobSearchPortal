export default class JobService {

    constructor() {
        this.url = 'https://still-ravine-49283.herokuapp.com/api/job';

        // this.url = 'http://localhost:8080/api/job';
    }

    findAllJobs = () => {
        console.log("findAllJobs")
        return fetch(this.url + "/all", {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getJobsByLocationAndPostion = (location,title) => {
        console.log("getJobsByLocationAndPostion")
        return fetch(this.url + '?location=' + location + '&title=' + title, {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getJobsByCompany = (company) => {
        console.log("getJobsByCompany")
        return fetch(this.url + '?company=' + company,{
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    getJobsByType = () => {
        console.log("getJobsByType")
        return fetch(this.url + '?type=Full Time', {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

    deleteJob = (jobId) => {
        console.log("deleteJob")
        return fetch(this.url + '/' + jobId, {
            credentials: 'include',
            method: 'delete',
            headers: {'content-type': 'application/json'}
        }).catch(error => {console.log("error")});
    };

    updateJob = (job) => {
        console.log('updateJob')
        return fetch(this.url, {
            method: 'PUT',
            credentials: 'include',
            body : JSON.stringify(job),
            headers : {
                'content-type' : 'application/json'
            }
        }).then(res => res.json()).catch(err => console.log(err))
    }

    getapplicantsForJob = (jobId) => {
        console.log("getapplicantsForJob")
        return fetch(this.url + '/' + jobId + '/applicant', {
            method: 'GET',
            credentials: 'include'
        }).then(function(response) {
            console.log(response)
            return response.json();
        })
    }

}
