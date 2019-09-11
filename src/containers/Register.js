import React, {Component} from 'react'
import ApplicantService from "../services/ApplicantService"
import RecruiterService from "../services/RecruiterService"
import {history} from "../browser_history/history"

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            role:""
        }
        this.applicantService = new ApplicantService();
        this.recruiterService = new RecruiterService();
    }

    componentDidMount() {
        this.applicantService.logout();
    }

    usernameChanged = (event) => {
        this.setState(
            {
                username: event.target.value
            });
    };

    passwordChanged = (event) => {
        this.setState(
            {
                password: event.target.value
            });
    };

    confirmPasswordChanged = (event) => {
        this.setState(
            {
                confirmPassword: event.target.value
            });
    };

    roleChanged = (event) => {
        console.log(event.target.value)
        this.setState(
            {
                role: event.target.value
            });
    }

    register = () => {

        var json = {
            "username": this.state.username,
            "password": this.state.password
        }

        if((this.state.password !== this.state.confirmPassword) || this.state.password === ""){
            alert("Passwords don't match or are empty")
        }
        else if(this.state.role === ""){
            alert("Please select a role")
        }
        else {
            if(this.state.role == "RECRUITER"){
                this.recruiterService.createUser(json)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log("loggedIn");
                            alert("Recruiter successfully registered");
                            // history.push('/table');
                             this.props.recruiterLoggedIn();
                             this.props.props.history.push("/home");
                        }
                        else
                            alert("Username already taken");
                    })
            }
            else {
                this.applicantService.createUser(json)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log("loggedIn");
                            alert("Applicant successfully registered");
                            this.props.applicantLoggedIn();
                            this.props.setApplicantUsername(this.state.username)
                            this.props.props.history.push("/home");
                            // history.push('/table');
                            // this.props.history.push("/table");
                        }
                        else
                            alert("Username already taken");
                    })
            }
        }
    }

    render() {
        return(
            <div className="container">
                <h1>Register</h1>
                <form>
                    <div className="form-group row">
                        <label htmlFor="usernamefld"
                               className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   placeholder="alice"
                                   onChange={this.usernameChanged}
                                   id="usernamefld"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="passwordfld"
                               className="col-sm-2">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   type="password"
                                   placeholder="!@#$QWERzxc"
                                   onChange={this.passwordChanged}
                                   id="passwordfld"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="verifypasswordfld"
                               className="col-sm-2">
                            Verify Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   type="password"
                                   placeholder="!@#$QWERzxc"
                                   onChange={this.confirmPasswordChanged}
                                   id="verifypasswordfld"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="rolefld"
                               className="col-sm-2">
                            Role
                        </label>
                        <div className="col-sm-10">
                            <select className="form-control wbdv"
                                    onChange={this.roleChanged}
                                    id="rolefld">
                                <option disabled selected value> -- select an option -- </option>
                                <option value="APPLICANT">Applicant</option>
                                <option value="RECRUITER">Recruiter</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="button" id="register" onClick={ () => {this.register()}} className="btn btn-outline-primary btn-block">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
