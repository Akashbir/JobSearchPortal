import React, {Component} from 'react'
import RecruiterService from "../services/RecruiterService"
import {history} from "../browser_history/history"

export default class RecruiterProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                dob: ""
            }
        }
        this.userService = new RecruiterService();
    }

    componentDidMount() {
        this.userService.profile()
            .then((user) => {
                this.setState({user:user});
                console.log(user);
                console.log(this.state.user);
            })
    }

    firstNameChanged = (event) => {
        let user = this.state.user;
        user.firstName = event.target.value
        this.setState({user: user});
    }

    lastNameChanged = (event) => {
        let user = this.state.user;
        user.lastName = event.target.value
        this.setState({user: user});
    }

    emailChanged = (event) => {
        let user = this.state.user;
        user.email = event.target.value
        this.setState({user: user});
    }


    dobChanged = (event) => {
        let user = this.state.user;
        user.dob = event.target.value
        this.setState({user: user});
    }

    update = () => {
        this.userService.updateUser(this.state.user.id, this.state.user)
            .then((response) => {
                console.log(response);
                alert("Successfully updated")
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Profile</h1>
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
                                   readOnly
                                   value={this.state.user.username}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="firstNamefld"
                               className="col-sm-2">
                            First Name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   placeholder="First Name"
                                   onChange={this.firstNameChanged}
                                   value={this.state.user.firstName}
                                   id="firstNamefld"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="lastNamefld"
                               className="col-sm-2">
                            Last Name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   placeholder="Last Name"
                                   onChange={this.lastNameChanged}
                                   value={this.state.user.lastName}
                                   id="lastNamefld"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="emailfld"
                               className="col-sm-2">
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   placeholder="Email"
                                   onChange={this.emailChanged}
                                   value={this.state.user.email}
                                   id="emailfld"/>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="datefld"
                               className="col-sm-2">
                            Date of Birth
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv"
                                   value={this.state.user.dob}
                                   onChange={this.dobChanged}
                                   type="date"
                                   id="datefld"/>
                        </div>
                    </div>


                    <button type="button" onClick={this.update} id="updatebtn" className="btn btn-outline-success btn-block">Update</button>


                </form>
            </div>
        )
    }
}