import React,{Component} from 'react'
import {Link} from "react-router-dom";
import ApplicantService from "../services/ApplicantService";
import RecruiterService from "../services/RecruiterService";


export default class RecruiterViewApplicants extends Component {
    constructor(props){
        super(props)

        this.state = {
            applicants: []
        }
        this.applicantService = new ApplicantService()
        this.recruiterService = new RecruiterService()
        this.renderApplicants = this.renderApplicants.bind(this);
        this.renderApplicant = this.renderApplicant.bind(this);
    }

    componentDidMount() {
        this.applicantService.getAllApplicants()
            .then(applicants => {
                this.setState({
                    applicants: applicants
                })
                console.log(applicants)
            })
    }

    renderApplicant(applicant) {
        return(
            <div className="border">
                <div className="form-row ml-2 mt-2">
                    <Link onClick={() => this.props.selectApplicant(applicant)}
                          to={`/profile/${applicant.username}`} className="font-weight-bold ml-2 float-right">
                        Username: {applicant.username}
                    </Link>
                </div>
                <div className="form-row ml-2">
                    <label className="font-weight-normal ml-2 float-right">Position: {applicant.position}</label>
                </div>
                <div className="form-row ml-2">
                    <label className="font-weight-normal ml-2 ">Location: {applicant.location}</label>
                </div>
            </div>
        );
    }

    renderApplicants(applicants) {
        let renderedApplicants = [];
        for(let i = 0; i < applicants.length; i = i + 3) {
            renderedApplicants.push(
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        {i < applicants.length && this.renderApplicant(applicants[i])}
                    </div>
                    <div className={"col-md-4"}>
                        {i + 1 < applicants.length && this.renderApplicant(applicants[i + 1])}
                    </div>
                    <div className={"col-md-4"}>
                        {i + 2 < applicants.length && this.renderApplicant(applicants[i + 2])}
                    </div>
                </div>
            );
            renderedApplicants.push(<br/>);
        }
        return renderedApplicants;
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <img className="img-fluid w-100" src ="https://picsum.photos/id/348/1200/300"/>
                    </div>
                </div>
                <div>
                    <h4 className="text-left mt-2 ml-2 font-weight-bold"> Showing {this.state.applicants.length} applicants</h4>
                    <div>
                        { this.state.applicants && this.renderApplicants(this.state.applicants)}
                    </div>
                </div>
            </div>
        )
    }
}
