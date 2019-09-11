import React, {Component} from 'react'
import ApplicantService from "../services/ApplicantService";
import SessionService from "../services/SessionService";
import {Link} from "react-router-dom";
import {history} from "../browser_history/history"

export default class Profile extends Component {
     constructor(props){
         super(props);
         console.log(props)
         this.username =  props.props.match.params.username
         this.applicantService = new ApplicantService()
         this.sessionService = new SessionService();
         this.state = {
             jobs: [],
             user: [],
             applicantLoggedIn: false,
             isFollowing: false,
             followers: [],
             followings: [],
             loggedInUsername: ""
         }
     }

     componentDidMount(props) {
         console.log("Profile componentDidMount")
         this.isFollowing(this.username)

         this.sessionService.sessionStatus()
             .then(res => {
                 console.log(res)
                 if(res == 2) {
                     this.setState({applicantLoggedIn: true})
                     this.applicantService.profile()
                         .then((user) => {
                             this.setState({
                                 loggedInUsername: user.username
                             })
                         })
                 }
             })

         this.getUserByUsernameService(this.username)
         this.applicantService.getJobsForApplicant(this.username)
             .then(jobs => {
                 this.setState({
                     jobs: jobs
                 })
                 console.log(jobs)
             })

         this.getFollowing(this.username)
         this.getFollowed(this.username)

     }

    getUserByUsernameService = (username) => {
        this.applicantService.getUserByUsernameService(username)
            .then(user => {
                this.setState({
                    user: user
                })
                console.log(user)
            })
    }

    followUser = (username) => {
         this.applicantService.followUser(username)
             .then(res =>{
                 console.log(res)
                 if(res)
                 this.setState({
                     isFollowing: !this.state.isFollowing
                 })
                 this.getFollowing(username)
                 this.getFollowed(username)
             })

    }

    unfollowUser = (username) => {
        this.applicantService.unfollowUser(username)
            .then(res =>{
                console.log(res)
                if(res)
                    this.setState({
                        isFollowing: !this.state.isFollowing
                    })
                this.getFollowing(username)
                this.getFollowed(username)
            })

     }

    getFollowing = (username) => {
        console.log("getFollowing")
        this.applicantService.getFollowing(username)
            .then(followings => {
                this.setState({
                    followings: followings
                })
                console.log(followings)
            })
    }

    getFollowed = (username) => {
         console.log("getFollowed")
        this.applicantService.getFollowed(username)
            .then(followers => {
                this.setState({
                    followers: followers
                })
                console.log(followers)
            })
    }

    isFollowing = (username) => {
         console.log("isFollowing")
        this.applicantService.isFollowing(username)
            .then(res =>{
                console.log(res)
                this.setState({
                        isFollowing: res
                })
            })
    }



     render(){
         return(
             <div className="container-fluid">
                 <div className="form-row mt-2 mb-2">
                 <div className="col-4">
                     <h1>{this.state.user.username}</h1>
                     <img className="img-fluid w-100" src ="http://lorempixel.com/360/300/"/>
                     {this.state.applicantLoggedIn && this.state.loggedInUsername !== this.username &&
                     this.state.isFollowing === false && <button onClick={() => this.followUser(this.state.user.username)}
                                                                                                 className="btn btn-block btn-outline-success mt-4">Follow</button>}
                     {this.state.applicantLoggedIn && this.state.loggedInUsername !== this.username &&
                     this.state.isFollowing === true && <button onClick={() => this.unfollowUser(this.state.user.username)}
                                                                                                 className="btn btn-block btn-outline-danger mt-4">Unfollow</button>}
                 </div>
                 <div className="col-8">

                     <div className="nav flex-column nav-pills">
                         <h1 className="ml-4">Applied Jobs</h1>
                         { this.state.jobs && this.state.jobs.map((job) => {
                             return (
                                  <div>
                                      {job.title &&<div className="nav-link ml-4 list-group-item">
                                          <Link onClick={() => this.props.selectJob(job)}
                                                to={`/job`} className="font-weight-bold">
                                              {job.title}
                                          </Link>
                                     </div>}
                                 </div>
                             )}
                         )}
                     </div>
                     <h1 className="ml-4">Followers</h1>
                     { this.state.followers && this.state.followers.map((user) => {
                         return (
                             <div className="nav flex-column nav-pills">
                                 {user.username &&<div className="nav-link ml-4 list-group-item">
                                     <Link onClick={() => this.props.selectApplicant(user)}
                                           to={`/profile/${user.username}`} className="font-weight-bold ml-2">
                                          {user.username}
                                     </Link>
                                 </div>}
                             </div>
                         )}
                     )}

                     <h1 className="ml-4">Following</h1>
                     { this.state.followings && this.state.followings.map((user) => {
                         return (
                             <div className="nav flex-column nav-pills">
                                 {user.username &&<div className="nav-link ml-4 list-group-item">
                                     <Link onClick={() => this.props.selectApplicant(user)}
                                           to={`/profile/${user.username}`} className="font-weight-bold ml-2">
                                         {user.username}
                                     </Link>
                                 </div>}
                             </div>
                         )}
                     )}
                 </div>
                 </div>

             </div>
         )
     }
}
