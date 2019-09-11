import React, {Component} from 'react'
import RecruiterService from "../services/RecruiterService"
import {Link} from "react-router-dom";

export default class CreateJob extends Component {
    constructor(props){
        super(props)

        this.recruiterService  = new RecruiterService();

        this.state = {
            job : {id: "", title : "" , location: "" , type: "Full Time" , company: "" , email: "", description: "", company_url: ""},
            title: "",
            location: "",
            type: "Full Time",
            company: "",
            email: "",
            description: "",
            company_url: "",
            preview: false
        }
    }

    componentDidMount() {
        // this.props.recruiterLoggedIn()
    }

    jobTypeChanged = (event) => {
        console.log(event.target.value)
        this.setState(
            {
                type: event.target.value
            });
    }

    jobTitleChanged = (event) => {
        this.setState(
            {
                title: event.target.value
            });
    }

    jobEmailChanged = (event) => {
        this.setState(
            {
                email: event.target.value
            });
    }

    descriptionChanged = (event) => {
        this.setState(
            {
                description: event.target.value
            });
    }

    jobLocationChanged = (event) => {
        this.setState(
            {
                location: event.target.value
            });
    }

    companyNameChanged = (event) => {
        this.setState(
            {
                company: event.target.value
            });
    }

    companyUrlChanged = (event) => {
        this.setState(
            {
                company_url: event.target.value
            });
    }

    setPreview = () => {
        this.setState({
            preview: !this.state.preview,
            job: {
                id: (new Date()).getTime(),
                title: this.state.title,
                location: this.state.location,
                type: this.state.type,
                company: this.state.company,
                email: this.state.email,
                description: this.state.description,
                company_url: this.state.company_url
            }
        })
    }

    publishJob = () => {
        // console.log("publishJob")
        this.recruiterService.createJobOpening(this.state.job)
            .then(job => this.props.props.history.push("/recruiter"))
    }

    render(){
        return(
            <div className="container mt-4">
                <div className="border ml-2 mb-2">
                    <h2 className="ml-2">Create Job</h2>
                    <div className="ml-2 mr-2">
                        <div className="form-group row">
                            <div className="col-sm-2">
                                {!this.state.preview && <input className="form-control" placeholder="Company Name"  value={this.state.company}
                                                               onChange={this.companyNameChanged} id="company"/>}
                                {this.state.preview && <label>{this.state.job.company}</label>}
                            </div>
                            <div className="col-sm-4">
                                {!this.state.preview && <input className="form-control" placeholder="Company URL"  value={this.state.company_url}
                                                               onChange={this.companyUrlChanged} id="companyURL"/>}
                                {this.state.preview &&
                                <label>{this.state.job.company_url}</label>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                {!this.state.preview && <select className="form-control" onChange={this.jobTypeChanged}>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                    </select>}
                                {this.state.preview && <label>{this.state.job.type}</label>}
                            </div>
                            <div className="col-sm-4">
                                {!this.state.preview && <input className="form-control" placeholder="Job Location"  value={this.state.location}
                                                               onChange={this.jobLocationChanged} id="jobLocation"/>}
                                {this.state.preview &&
                                <label>{this.state.job.location}</label>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                {!this.state.preview && <input className="form-control" placeholder="Job title"  value={this.state.title}
                                                               onChange={this.jobTitleChanged} id="jobTitle"/>}
                                {this.state.preview &&
                                <label>{this.state.job.title}</label>}
                                </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                {!this.state.preview && <input className="form-control" placeholder="Email (for receipt)"  value={this.state.email}
                                                               onChange={this.jobEmailChanged} id="jobEmail"/>}
                                {this.state.preview &&
                                <label>{this.state.job.email}</label>}
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="col-sm-12">
                                {!this.state.preview && <textarea className="form-control" rows="10"

                              placeholder="Job description"
                                      id="description" onChange={this.descriptionChanged}/>}

                                {this.state.preview &&
                                <label>{this.state.job.description}</label>}
                            </div>
                        </div>
                        {!this.state.preview && <button onClick={this.setPreview}
                            className="btn btn-secondary mb-2">Preview Job</button>}
                        {this.state.preview && <div>
                        <button className="btn btn-secondary mb-2" onClick={this.setPreview}>Modify Job</button>
                            <Link onClick={this.publishJob}>
                                <button className="btn btn-secondary ml-2 mb-2">Publish Job</button>
                            </Link>
                        </div>
                       }
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
