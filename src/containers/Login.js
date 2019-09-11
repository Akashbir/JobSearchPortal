import React, {Component} from 'react'
import ApplicantService from "../services/ApplicantService"
import RecruiterService from "../services/RecruiterService"
import {history} from "../browser_history/history"

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:"",
            role:""
        }
        this.applicantService = new ApplicantService();
        this.recruiterService = new RecruiterService();
    }


    usernameChanged = (event) => {
        this.setState(
            {
                username: event.target.value
            });
    }

    passwordChanged = (event) => {
        this.setState(
            {
                password: event.target.value
            });
    }

    roleChanged = (event) => {
        console.log(event.target.value)
        this.setState(
            {
                role: event.target.value
            });
    }

    login = () => {

        var json = {
            "username": this.state.username,
            "password": this.state.password,
        }
        if( !(this.state.username === "" || this.state.password === "" || this.state.role === "")) {

            if(this.state.role == "RECRUITER"){
                this.recruiterService.login(json)
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log("loggedIn");
                            // alert("Login successful");
                            this.props.recruiterLoggedIn();
                            this.props.props.history.push("/home");
                        }
                        else
                            alert("Invalid credentials");
                    })
            }
            else {
                this.applicantService.login(json)
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log("loggedIn");
                            // alert("Login successful");
                            this.props.setApplicantUsername(this.state.username)
                            this.props.applicantLoggedIn();
                            this.props.props.history.push("/home");
                        }
                        else
                            alert("Invalid credentials");
                    })
            }
        }
        else{
            alert("Empty username or password or role");
        }
    }

    render() {
        return(
            <div className="container">
                <h1>Login</h1>
                <form>
                    <div className="form-group row">
                        <label htmlFor="usernamefld"
                               className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   placeholder="alice"
                                   id="usernamefld"
                                   onChange={this.usernameChanged}
                            />
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
                            <button id="login"
                                    onClick={ () => {this.login()}}
                                    type="button"
                                    className="btn btn-outline-primary btn-block">Sign in</button>
                            <div className="row">
                                <div className="col-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
