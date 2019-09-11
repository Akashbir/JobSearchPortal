import React, {Component} from 'react'
import {Link} from "react-router-dom";
import ApplicantService from "../services/ApplicantService";

export default class AppliedJobs extends Component{

    constructor(props){
        super(props)

        this.applicantService = new ApplicantService();

        this.state = {
            jobs: []
        }
    }

    componentDidMount() {
        this.fetchAppliedJobs()
    }

    fetchAppliedJobs = () => {
        // console.log("fetchAppliedJobs");
        this.applicantService.fetchAppliedJobs()
            .then(jobs => {
                 this.setState({
                     jobs: jobs
                 });
                console.log(jobs)
            })
    }

    render(){
        return(
            <div className="container-fluid">
            <div className="">
                <h4 className="text-left mt-2 ml-2 font-weight-bold"> Showing {this.state.jobs.length} jobs</h4>
                <div className="mt-4">
                    { this.state.jobs && this.state.jobs.map((job, index) => {
                            return (
                                <div className="border">
                                    <div className="form-row">
                                        <div className="col-md-2">
                                            <img className="img-fluid w-100" src ={"https://picsum.photos/175/130/?job " + index}/>
                                        </div>
                                        <div className="col-10">
                                            <div className="form-row ml-2">
                                                <Link onClick={() => this.props.selectJob(job)}
                                                      to={`/job`} className="font-weight-bold">
                                                    {job.title}
                                                </Link>
                                            </div>
                                            <div>
                                                <Link onClick={() => this.props.findJobsByCompany(job.company)}
                                                      to={`/`} className="text-dark ml-2">
                                                    {job.company}
                                                </Link>
                                            </div>
                                            <div className="form-row ml-1">
                                                <div className="col-6">
                                                    <label>{job.location}</label>
                                                    <label className="ml-2 text-success">{job.type}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
            </div>
        )
    }
}
