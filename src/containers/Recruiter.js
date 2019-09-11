import React, {Component} from 'react'
import {Link} from "react-router-dom";
import RecruiterService from "../services/RecruiterService"
import AnonymousUserService from "../services/AnonymousUserService"
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import JobService from "../services/JobService";

export default class Recruiter extends Component {

    constructor(props){
        super(props);

        this.recruiterService = new RecruiterService();
        this.anonymousUserService = new AnonymousUserService();
        this.jobService = new JobService()
        this.state = {
            jobs: [],
            selectedJob: ""
        };
        this.renderCard = this.renderCard.bind(this);
        this.renderJobs = this.renderJobs.bind(this);
    }

    componentDidMount() {
        // console.log("Recruiter componentDidMount")
        this.getJobByRecuiter()
    }

    selectJob = (job) => {
        this.setState({
            selectedJob: job
        })
    };

    getJobByRecuiter = () =>
    {
        // console.log("asjhd")
        this.recruiterService.getJobByRecuiter().then(jobs => {
            console.log(jobs)
            this.setState({
                jobs: jobs
            })
        })

    }


    deleteJob = (job) => {
        // console.log("delete job called")
        if(window.confirm('Are you sure you wish to delete this job?'))
        this.jobService.deleteJob(job.id).then(res => console.log(res))
            .then(res => {
                this.getJobByRecuiter()
            })
    }

    updateJob = (job) => {
        this.jobService.updateJob(job).then(res => console.log(res))
    }

    renderCard(job) {
        return(
            <div className="card">
                <img className="card-img-top"
                     src="https://picsum.photos/id/392/400/300"/>
                <div className="card-body bg-light">
                    <div className={"row"}>
                        <div className={"col-md-8"}>
                            <div className={"row"}>
                                <Link onClick={() => this.props.selectJob(job)}
                                      to={`/job`}>
                                    <h5>{job.title}</h5>
                                </Link>
                            </div>
                            <div className={"row"}>
                                <Link onClick={() => this.anonymousUserService.findJobsByCompany(job.company)}
                                      to={`/recruiter`}>
                                    {job.company}
                                </Link>
                            </div>
                            <div className={"row"}>
                                <label>{job.location}</label>
                            </div>
                            <div className={"row"}>
                                <label>{job.type}</label>
                            </div>
                        </div>
                        <div className={"col-md-4"}>
                                <span className="float-right">
                                    <Link onClick={() => this.props.selectJob(job)} to={`/updateJob`}><i className=" mr-1 fa fa-pencil"></i></Link>
                                    <Link onClick={() => this.deleteJob(job)} to={`/recruiter`}><i className=" mb-1 fa fa-trash"></i></Link>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderJobs(jobs) {
        let jobsRendered = [];
        for(let z = 0; z < jobs.length; z = z + 4) {
            jobsRendered.push(
                <div className={"row"}>
                    <div className="col-md-3">
                        {z < jobs.length && this.renderCard(jobs[z])}
                    </div>
                    <div className="col-md-3">
                        {z + 1 < jobs.length && this.renderCard(jobs[z+1])}
                    </div>
                    <div className="col-md-3">
                        {z + 2 < jobs.length && this.renderCard(jobs[z+2])}
                    </div>
                    <div className="col-md-3">
                        {z + 3 < jobs.length && this.renderCard(jobs[z+2])}
                    </div>
                </div>
            );
            jobsRendered.push(<br/>);
        }
        return jobsRendered;
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="mt-2 mb-2">
                    <h3>Published Jobs</h3>
                </div>
                { this.state.jobs && this.renderJobs(this.state.jobs)}
            </div>
        )
    }
}
