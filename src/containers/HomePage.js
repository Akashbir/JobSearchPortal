
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import Switch from "react-router/es/Switch";
import {history} from '../browser_history/history'
import Job from "./Job";
import AnonymousUser from "./AnonymousUser";
import {Nav, Navbar} from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import ApplicantProfile from "./ApplicantProfile";
import RecruiterProfile from "./RecruiterProfile";
import ApplicantService from "../services/ApplicantService"
import AnonymousUserService from "../services/AnonymousUserService"
import SessionService from "../services/SessionService"
import Recruiter from "./Recruiter"
import CreateJob from "./CreateJob";
import AppliedJobs from "./AppliedJobs"
import JobService from "../services/JobService"
import RecruiterViewApplicants from "./RecruiterViewApplicants";
import UpdateJob from "./UpdateJob";
import RecruiterViewInterestedApplicants from "./RecruiterViewInterestedApplicants";
import RecruiterService from "../services/RecruiterService";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Profile from "./Profile"

class HomePage extends Component{

    constructor(props){
        super(props);

        this.applicantService = new ApplicantService();
        this.anonymousUserService = new AnonymousUserService();
        this.sessionService = new SessionService();
        this.jobService = new JobService();

        this.state = {
            location: "new york",
            jobDescription: "python",
            jobs: [],
            selectedJob: "",
            loggedIn: false,
            applicants: [],
            selectedApplicant: "",
            appliedJobs: [],
            applicantUsername: ""
        }
    }

    componentDidMount() {
        this.fetchJobs();
        this.sessionService.sessionStatus()
            .then(res => {
                console.log(res)
                if(res == 2) {
                    this.applicantService.profile()
                        .then((user) => {
                            this.setState({
                                applicantUsername: user.username
                            })
                            if(user.location != null)
                                this.setState({location:user.location});
                            if(user.position != null)
                                this.setState({jobDescription:user.position});
                        })
                        .then(e =>{
                            this.applicantService.fetchAppliedJobs()
                                .then(appliedJobs => this.setState({appliedJobs: appliedJobs}))
                                .then(e => this.fetchJobs())
                        })
                        .then(e => this.fetchJobs())
                }
                if(res != 0) {
                    this.setState({loggedIn: res})
                }
            })
    }

    selectJob = (job) => {
        this.setState({
            selectedJob: job
        })

        if(this.state.loggedIn === 3)
            this.getapplicantsForJob(job)
    };

    selectApplicant = (applicant) => {
        console.log("selectApplicant")
        this.setState({
            selectedApplicant: applicant
        })
    }

    setApplicantUsername = (username) => {
        this.setState({
            applicantUsername: username
        })

    }

    jobDescriptionChanged = (event) =>
        this.setState(
            {
                jobDescription: event.target.value
            });

    locationChanged = (event) =>
        this.setState(
            {
                location: event.target.value
            });

    search = () => {
          this.fetchJobs()
    };

    logout = () => {
        this.sessionService.logout()
            .then(res => this.setState({loggedIn: false}))
    };

    applicantLoggedIn = () => {
        this.setState({loggedIn: 2})
    };

    recruiterLoggedIn = () => {
        this.setState({loggedIn: 3 })
    };

    fetchJobs = () => {
        // console.log('fetchJobs');
        // var createdJobs = [];
        this.jobService.getJobsByLocationAndPostion(this.state.location,this.state.jobDescription).then(createdJobs =>
        {
            console.log(createdJobs);
            this.anonymousUserService.fetchJobs(this.state.jobDescription, this.state.location)
                .then(jobs => {
                    console.log(jobs)
                    let j = []
                    if(createdJobs)
                        j = createdJobs
                    if(jobs)
                        j = [...j, ...jobs]
                    this.setState({
                        jobs: j
                    });
                    console.log(this.state.jobs)
                })
                .then(e => {
                    let filteredJobs = [];
                    console.log(this.state.appliedJobs)
                    if(this.state.appliedJobs && this.state.appliedJobs.length > 0) {
                        this.state.jobs.forEach(j => {
                                // if (!this.state.appliedJobs.find(j2 => {return j2.id == j.id}))
                                //     filteredJobs.push(j)
                                // console.log(j.id)
                                var found = this.state.appliedJobs.find(function(element)  {return element.id == j.id})
                                if(found === undefined) {
                                    filteredJobs.push(j)
                                }

                            }
                        )
                        this.setState({jobs: filteredJobs})
                    }
                })
                })
    };

    findJobsByCompany = (company) => {
        // console.log("findJobsByCompany");
        var createdJobs = [];
        this.jobService.getJobsByCompany(company).then(res =>
        {
            createdJobs = res;
            console.log(createdJobs);
            this.anonymousUserService.findJobsByCompany(company)
                .then(jobs => {
                    console.log(jobs)
                    let j = []
                    if(createdJobs)
                        j = createdJobs
                    if(jobs)
                        j = [...j, ...jobs]
                    this.setState({
                        jobs: j
                    });
                    console.log(this.state.jobs)
                })
        })
    };

    findJobsByType = () => {
        // console.log("findJobsByType");
        var createdJobs = [];
        this.jobService.getJobsByType().then(jobs =>
        {
            createdJobs = jobs;
            console.log(createdJobs);
            this.anonymousUserService.findJobsByType()
                .then(jobs => {
                    console.log(jobs)
                    let j = []
                    if(createdJobs)
                        j = createdJobs
                    if(jobs)
                        j = [...j, ...jobs]
                    this.setState({
                        jobs: j
                    });
                    console.log(this.state.jobs)
                })
        })
    };

    fetchAllJobs = () => {
        // console.log("fetchAllJobs");
        var createdJobs = [];
        this.jobService.findAllJobs().then(jobs => {
            createdJobs = jobs;
            console.log(createdJobs);
            this.anonymousUserService.fetchAllJobs()
                .then(jobs =>
                {
                    console.log(jobs)
                    let j = []
                    if(createdJobs)
                        j = createdJobs
                    if(jobs)
                        j = [...j, ...jobs]
                    this.setState({
                        jobs: j
                    });
                    console.log(this.state.jobs)
                })
        })
    };

    applyToJob = (job) => {
        console.log(job)
        this.applicantService.applyToJobs(job).then(response => {
            if(response.status === 200)
                alert("Job applied successfully!")
            else if (response.status === 204)
                alert("Job already applied")
            else
                alert("Error!")
        })
    }

    getapplicantsForJob = (job) =>{
        this.jobService.getapplicantsForJob(job.id).then(applicants => {
            this.setState({
                applicants: applicants
            })
            console.log(applicants)
            }
        )
    }

    render() {
        return(
            <div className="container-fluid bg-light">
                <div className="container-fluid">
                    <Navbar className="navbar" bg="secondary" text="light" expand="lg">
                        <div className="container-fluid">
                            <Navbar.Brand href="/"><div className="text-white font-weight-bold"><i className="fas fa-home"></i>Home</div></Navbar.Brand>
                            <div className="float-right">
                            <Navbar.Brand id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    {this.state.loggedIn == 2  && <Nav.Link href={`/profile/${this.state.applicantUsername}`}><div className="text-white">Public</div></Nav.Link>}
                                    {<Nav.Link href="/recruiterViewApplicants"><div className="text-white">Users</div></Nav.Link>}
                                    {this.state.loggedIn == 2  && <Nav.Link href="/appliedJobs"><div className="text-white">Applied jobs</div></Nav.Link>}
                                    {!this.state.loggedIn && <Nav.Link className="float-right" href="/login"><div className="text-white"> Login</div></Nav.Link>}
                                    {!this.state.loggedIn && <Nav.Link className="float-right" href="/register"><div className="text-white">Register</div></Nav.Link>}
                                    {this.state.loggedIn && <Nav.Link className="float-right" href="/private_profile"><div className="text-white">Profile</div></Nav.Link>}
                                    {/*{this.state.loggedIn == 3 && <Nav.Link className="float-right" href="/recruiterViewApplicants"><div className="text-white"> Applicant</div></Nav.Link>}*/}
                                    {this.state.loggedIn == 3 && <Nav.Link className="float-right" href="/recruiterViewInterestedApplicants"><div className="text-white">Interested applicants</div></Nav.Link>}
                                    {this.state.loggedIn == 3 && <Nav.Link className="float-right" href="/createJob"><div className="text-white">Post a job</div></Nav.Link>}
                                    {this.state.loggedIn && <Nav.Link className="float-right" onClick={this.logout} href="/"><div className="text-white">Logout</div></Nav.Link>}
                                </Nav>
                            </Navbar.Brand>
                            </div>
                        </div>
                    </Navbar>
                </div>

                <Router history={history}>

                    <Switch>
                        <Redirect exact path="/" to="/home"/>
                    <Route exact={true} path='/home'
                           render={(props) => {
                               if (this.state.loggedIn == 3)
                                   return <Recruiter  selectJob={this.selectJob}
                                                      recruiterLoggedIn={this.recruiterLoggedIn}
                                                      props={props}/>

                                else
                                   return <AnonymousUser
                                       jobDescriptionChanged={this.jobDescriptionChanged}
                                       locationChanged={this.locationChanged}
                                       search={this.search}
                                       jobs={this.state.jobs}
                                       location={this.state.location}
                                       jobDescription={this.state.jobDescription}
                                       selectJob={this.selectJob}
                                       findJobsByCompany={this.findJobsByCompany}
                                       findJobsByType={this.findJobsByType}
                                       loggedIn={this.state.loggedIn}
                                       applyToJob={this.applyToJob}
                                       fetchAllJobs={this.fetchAllJobs}
                                   />
                           }}/>

                    <Route exact={true} path='/job'
                           render={() => <Job job={this.state.selectedJob}
                                              fetchAllJobs={this.fetchAllJobs}
                                              loggedIn={this.state.loggedIn}
                                              applicants={this.state.applicants}
                           />} />

                    <Route exact={true} path='/login'
                           render={(props) =>
                               <Login applicantLoggedIn={this.applicantLoggedIn}
                                      recruiterLoggedIn={this.recruiterLoggedIn}
                                      setApplicantUsername={this.setApplicantUsername}
                                      props={props}/>
                           }/>

                    <Route exact={true} path='/private_profile'
                           render={(props) => {
                               if (this.state.loggedIn == 2)
                                   return <ApplicantProfile props={props}/>;
                               else if (this.state.loggedIn == 3)
                                   return <RecruiterProfile props={props}/>;

                           }
                           }/>

                        <Route exact={true} path='/register'
                               render={(props) =>
                                   <Register applicantLoggedIn={this.applicantLoggedIn}
                                             recruiterLoggedIn={this.recruiterLoggedIn}
                                             setApplicantUsername={this.setApplicantUsername}
                                             props={props}/>
                               }/>

                        <Route exact={true} path='/recruiter'
                               render={(props) =>
                                   <Recruiter  getapplicantsForJob={this.getapplicantsForJob}
                                       selectJob={this.selectJob}

                                               props={props}/>
                               }/>

                        <Route exact={true} path='/createJob'
                               render={(props) =>
                                   <CreateJob
                                       props={props}/>
                               }/>

                        <Route exact={true} path='/updateJob'
                               render={(props) =>
                                   <UpdateJob selectedJob={this.state.selectedJob}
                                              props={props}/>
                               }/>

                        <Route exact={true} path='/appliedJobs'
                               render={(props) =>
                                   <AppliedJobs jobs={this.state.jobs}
                                                location={this.state.location}
                                                selectJob={this.selectJob}
                                                jobDescription={this.state.jobDescription}
                                                findJobsByCompany={this.findJobsByCompany}
                                                findJobsByType={this.findJobsByType}
                                       props={props}/>
                               }/>

                        <Route exact={true} path='/recruiterViewApplicants'
                               render={(props) =>
                                   <RecruiterViewApplicants selectApplicant={this.selectApplicant}
                                                props={props}/>
                               }/>

                        <Route exact={true} path='/recruiterViewInterestedApplicants'
                               render={(props) =>
                                   <RecruiterViewInterestedApplicants selectApplicant={this.selectApplicant}
                                       props={props}/>
                               }/>

                        <Route exact={true} path='/profile/:username'
                               render={(props) =>
                                   <Profile selectedApplicant={this.state.selectedApplicant}
                                            selectJob={this.selectJob}
                                            props={props}/>
                               }/>

                    </Switch>

                </Router>
            </div>
        )}
}

export default HomePage
