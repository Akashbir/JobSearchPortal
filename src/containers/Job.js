
import React from 'react'
import {BrowserRouter as Router, Link} from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Job = ({job,fetchAllJobs,loggedIn,applicants}) =>{

    return(
        <div className="container mt-4">
            {loggedIn === 3 && <h4><Link
                      to={`/recruiter`} className="font-weight-bold">
                Back
            </Link></h4>}
            {loggedIn !== 3 && <h4><Link
                to={`/home`} >
                Back
            </Link></h4>}
        <div className="border">
            {console.log(job)}
            <label className="mt-4 ml-2 text-secondary">{job.type}/{job.location}</label>
            <h4 className="font-weight-bold row ml-2">{job.title}</h4>
            <div className="ml-2">{ ReactHtmlParser(job.description) }</div>
        </div>
            {loggedIn === 3 &&
            <div>
                <div className="border mt-4">
                    <h4 className="text-left mt-2 ml-2 font-weight-bold"> Showing applicants</h4>
                    <div className="mt-4">
                        { applicants && applicants.map((applicant) => {
                            return (
                                <div className="border">
                                    <div className="form-row ml-2">
                                        <label className="font-weight-bold ml-2 float-right">Username: {applicant.username}</label>
                                    </div>
                                    <div className="form-row ml-2">
                                        <label className="font-weight-normal ml-2 float-right">Position: {applicant.position}</label>
                                    </div>
                                    <div className="form-row ml-2">
                                        <label className="font-weight-normal ml-2 ">Location: {applicant.location}</label>
                                    </div>
                                </div>
                            )
                            }
                        )}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Job
