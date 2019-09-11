import React from 'react'
import {BrowserRouter as Router, Link} from "react-router-dom";
import './AnonymousUser.css'

const AnonymousUser = ({jobDescriptionChanged,locationChanged,search,jobs,location,jobDescription,selectJob,findJobsByCompany,findJobsByType,loggedIn,applyToJob,fetchAllJobs}) =>
    <div className="container-fluid">
        {loggedIn !== 2 && loggedIn !== 3 &&
        <div className="row">
            <div className="col-md-12">
                <img className="img-fluid w-100" src ="https://picsum.photos/id/1/1200/300"/>
            </div>
        </div>}
        <div className="anonymoususer-input-wrapper mt-4">
            <div className="row">
                <div className="col-6">
                    <label htmlFor="jobDescriptionFld" className="font-weight-bold">
                        Job Title
                    </label>
                    <input className="form-control wbdv"
                           placeholder="python"
                           id="jobDescriptionFld"
                           onChange={jobDescriptionChanged}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="locationFld" className="font-weight-bold">
                        Location
                    </label>
                    <input className="form-control wbdv"
                           placeholder="new york"
                           id="locationFld"
                           onChange={locationChanged}
                    />
            </div>
            </div>
            <div className="col-4 col-md-12 col-sm-12 mt-4 anonymoususer-button-wrapper">
                <button id="search"
                        onClick={ () => {search()}}
                        type="button"
                        className="col-12 anonymoususer-button btn btn-secondary mx-1 my-1 form-check-inline">Search</button>
                <button id="search"
                        onClick={ () => {fetchAllJobs()}}
                        type="button"
                        className="col-12 anonymoususer-button btn btn-secondary mx-1 my-1 form-check-inline">All jobs</button>
            </div>


        </div>

        <div className="border mt-4">
            <h4 className="text-left mt-2 ml-2 font-weight-bold"> Showing Trending Jobs</h4>
            <div className="mt-4">
                { jobs && jobs.map((job, index) => {
                        return (
                            <div className="border">
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <img className="img-fluid w-100" src ={"https://picsum.photos/175/130/?job " + index}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="form-row ml-2">
                                            <Link onClick={() => selectJob(job)}
                                                  to={`/job`} className="font-weight-bold">
                                                {job.title}
                                            </Link>
                                        </div>
                                        <div>
                                            <Link onClick={() => findJobsByCompany(job.company)}
                                                  to={`/`} className="text-dark ml-2">
                                                {job.company}
                                            </Link>
                                        </div>
                                        <div className="form-row ml-1">
                                            <div className="col-6">
                                                <label>{job.location}</label>
                                            <label className="ml-2 text-success">{job.type}</label>
                                            </div>
                                            <div className="col-6">
                                            {loggedIn === 2 && <button onClick={() => applyToJob(job)}
                                                className="btn btn-secondary mr-2 mb-2 float-right">Apply</button>}
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


export default AnonymousUser
