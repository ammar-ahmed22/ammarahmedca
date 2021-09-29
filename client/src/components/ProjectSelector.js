import React, { Component } from 'react';
import '../assets/css/projects.css'

import selectorContent from '../assets/helpers/selectorContent';

class ProjectSelector extends Component {


    render() {
        return (
            <div className="row g-3">
                {
                    selectorContent.map((item, index)=>{
                        return (
                            <div className="col-lg-4 col-md-6 col-12" key={`project-${index}`}>
                                <div className="project p-3">
                                    <div className="project-icons">
                                        <div className="project-main-icon">
                                            <p className="text-purple display-5"><i className={item.icons.mainIcon}></i></p>
                                        </div>

                                        <div className="project-aux-icons">
                                            {
                                                item.icons.auxIcons.map((item, index)=>{
                                                    return(
                                                        <a href={item.link} key={`project-icon-${index}`} className="text-light text-decoration-none aux-icon fs-2 cursor-pointer"><i className={item.className}></i></a>
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
            </div>
        );
    }
}

export default ProjectSelector;
