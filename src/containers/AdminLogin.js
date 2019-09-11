import React, {Component} from 'react'
import UserService from "../services/AdminService"
import {history} from "../browser_history/history"

class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:""
        }
        this.userService = new UserService();
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

    login = () => {

        var json = {
            "username": this.state.username,
            "password": this.state.password
        }
        if( !(this.state.username === "" || this.state.password === "")) {
            this.userService.login(json)
                .then((response) => {
                    if (response.status === 200) {
                        // console.log("loggedIn");
                        alert("Login successful");
                        // history.push('/table');
                        // this.props.history.push("/table");
                    }
                    else
                        alert("Invalid credentials");
                })
        }
        else{
            alert("Empty username or password");
        }
    }

    render() {
        return(
            <div className="container">
                <h1>Admin Login</h1>
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
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button id="login"
                                    onClick={ () => {this.login()}}
                                    type="button"
                                    className="btn btn-primary btn-block">Sign in</button>
                            <div className="row">
                                <div className="col-6">
                                </div>
                                <div id="signup" className="col-6">
                                    <a href="/register" className="float-right">Sign
                                        up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminLogin;