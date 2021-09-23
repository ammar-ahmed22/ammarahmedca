import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/projects.css'

import selectorContent from '../assets/helpers/selectorContent';

class ProjectSelector extends Component {


    render() {
        return (
            <div className="row g-3">
                {
                    selectorContent.map((item, index)=>{
                        return (
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="project p-3">
                                    <div className="project-icons">
                                        <div className="project-main-icon">
                                            <p className="text-purple display-5"><i className={item.icons.mainIcon}></i></p>
                                        </div>

                                        <div className="project-aux-icons">
                                            {
                                                item.icons.auxIcons.map((item)=>{
                                                    return(
                                                        <a href={item.link} className="text-light text-decoration-none aux-icon fs-2 cursor-pointer"><i className={item.className}></i></a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="project-text">
                                        <h2 className="text-light fw-bold">{item.name}</h2>
                                        <p className="text-slate">{item.time}</p>
                                        <p className="text-slate fs-5">
                                            {item.desc}
                                        </p>
                                        <p className="text-slate">{item.technologies.join(", ")}</p>
                                        {/* <Link to={`/${item.path}`} className="project-blog-btn rounded rounded-pill fs-6 text-lightpurple text-decoration-none px-3 cursor-pointer">Read more</Link> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div className="col-lg-4 col-md-6 col-12">
                    <div className="project p-3">
                    <div className="project-icons">
                        <div className="project-main-icon">
                            <p className="text-purple display-5"><i class='bx bxs-window-alt'></i></p>
                        </div>
                        <div className="project-aux-icons">
                            <p className="text-light fs-2"><i class='bx bx-link-external' ></i></p>
                            <p className="text-light fs-2"><i class='bx bxl-github' ></i></p>
                        </div>
                    </div>

                    <div className="project-text">
                        <h2 className="text-light fw-bold">WaterlooBasics</h2>
                        <p className="text-slate">JUNE 2020</p>
                        <p className="text-slate fs-5">
                            Website created for incoming students and applicants to the University of Waterloo's highly competitive engineering program in collaboration with 7 other engineering students.
                        </p>
                        <p className="text-slate">HTML/CSS, JavaScript, Git, GitHub</p>
                        <a href="" className="project-blog-btn rounded rounded-pill fs-6 text-lightpurple text-decoration-none px-3">Read more </a>
                    </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12">
                    <div className="project p-3">
                    <div className="project-icons">
                        <div className="project-main-icon">
                            <p className="text-purple display-5"><i class='bx bxs-window-alt'></i></p>
                        </div>
                        <div className="project-aux-icons">
                            <p className="text-light fs-2"><i class='bx bx-link-external' ></i></p>
                            <p className="text-light fs-2"><i class='bx bxl-github' ></i></p>
                        </div>
                    </div>

                    <div className="project-text">
                        <h2 className="text-light fw-bold">WaterlooBasics</h2>
                        <p className="text-slate fs-5">
                            Website created for incoming students and applicants to the University of Waterloo's highly competitive engineering program in collaboration with 7 other engineering students.
                        </p>
                        <p className="text-slate">HTML/CSS, JavaScript, Git, GitHub</p>
                    </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12">
                    <div className="project p-3">
                    <div className="project-icons">
                        <div className="project-main-icon">
                            <p className="text-purple display-5"><i class='bx bxs-window-alt'></i></p>
                        </div>
                        <div className="project-aux-icons">
                            <p className="text-light fs-2"><i class='bx bx-link-external' ></i></p>
                            <p className="text-light fs-2"><i class='bx bxl-github' ></i></p>
                        </div>
                    </div>

                    <div className="project-text">
                        <h2 className="text-light fw-bold">WaterlooBasics</h2>
                        <p className="text-slate fs-5">
                            Website created for incoming students and applicants to the University of Waterloo's highly competitive engineering program in collaboration with 7 other engineering students.
                        </p>
                        <p className="text-slate">HTML/CSS, JavaScript, Git, GitHub</p>
                    </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ProjectSelector;
