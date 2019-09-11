
const proxy_url = "https://cors-anywhere.herokuapp.com/";

export default class AnonymousUserService {

    constructor() {
    }

    fetchJobs = (jobDescription, location) =>
        fetch(proxy_url + 'https://jobs.github.com/positions.json?description=' +
            jobDescription + '&location=' + location, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());

    findJobsByCompany = (company) => {
        console.log("findJobsByCompany");
        return fetch(proxy_url + 'https://jobs.github.com/positions.json?description=' + company, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        }).then(response => response.json())

    };

    findJobsByType = () => {
        console.log("findJobsByType");
        return fetch(proxy_url + 'https://jobs.github.com/positions.json?description=Full Time', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        }).then(response => response.json())
    };

    fetchAllJobs = () => {
        console.log("fetchAllJobs");
        return fetch(proxy_url + 'https://jobs.github.com/positions.json', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        }).then(response => response.json())
    }
}
