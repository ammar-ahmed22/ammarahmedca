import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/projectpage.css'

import * as textHelper from "../assets/helpers/texthelpers";

import projectContent from "../assets/helpers/projectContent"
import DarkModeToggle from './DarkModeToggle';
import ProjectNav from './ProjectNav';
import ProjectControls from './ProjectControls';

class ProjectPage extends Component {

    render() {
        const { name } = this.props.match.params;
        const project = projectContent[name];
        return (
            <section className="project-page">
                <div className="container">
                    
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <ProjectNav project={project} />
                        </div>
                        <div className="col-md-6 col-12">
                            <DarkModeToggle isDark={this.props.isDark} toggleIsDark={this.props.toggleIsDark} />
                            <Link to="/" className="text-purple text-decoration-none m-0 ff-alt fw-bold cursor-pointer link-hover"><i class='bx bx-left-arrow-alt' ></i>Back</Link>
                            <h2 className="text-purple display-3 mt-4 fw-bold ff-alt">{project.title}</h2>
                            <p className="text-slate fw-light ff-alt">{project.headerContent.join(" / ")}</p>
                            {
                                project.mainQuote && <h2 className="text-light ff-alt fs-4">"{project.mainQuote.text}"</h2>
                            }
                            {
                                project.mainQuote.author && <h6 className="text-slate">-{project.mainQuote.author}</h6>
                            }
                           {
                               project.mainImg && (
                                <div className="main-img d-flex justify-content-center">
                                    <img src={project.mainImg} alt="" className="img img-fluid"/>
                                </div>
                               )
                           }
                            <div className="context-content mt-4 d-flex justify-content-center row">
                                {
                                    project.contextContent.map( ( item )=> {
                                        const length = project.contextContent.length;
                                        return (
                                            <div className={`context col-${length > 1? 6 : 12}`}>
                                                <h4 className="text-purple fw-bold text-center m-0">{item.type}</h4>
                                                <p className="text-slate text-center">{item.text}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="separator"></div>
                            
                            <div className="text-content my-4">
                                
                            
                                {   
                                    // eslint not picking jsx return
                                    // eslint-disable-next-line array-callback-return
                                    project.textContent.map( item => {
                                        switch (item.type) {
                                            case "title":
                                                return <h4 className="text-light text-uppercase my-3 ff-alt fw-bold" id={textHelper.hyphenate(item.text)}>{item.text}</h4>
                                                
                                            
                                            case "para":
                                                return <p className="text-slate fs-5 my-3 ">{item.text.split(" ").map( word =>{
                                                    return textHelper.formatText(word)
                                                })}</p>
                                            
                                            case "image":
                                                return (
                                                    <figure className="figure ">
                                                        <img src={item.img} alt="" className="figure-img img-fluid rounded mx-auto d-block" />
                                                        <figcaption className="figure-caption text-center text-slate">{item.caption}</figcaption>
                                                    </figure>
                                                )
                                            case "subtitle":
                                                return <p className="text-light  fs-5 text-uppercase ff-alt ">{item.text}</p>
                                            case "ordered-list":
                                                return (
                                                    <ol className="text-slate fs-5">
                                                        {
                                                            item.text.map( listItem => {
                                                                return <li>{listItem}</li>
                                                            })
                                                        }
                                                    </ol>
                                                )
                                            default:
                                                break;
                                        }
                                    })
                                }

                            </div>
                            <ProjectControls name={name} />
                            {/* <div className="project-control my-5">
                                <button className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3">Prev</button>
                                <button className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3">Next</button>
                            </div> */}
                        </div>
                        <div className="col-2"></div>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default ProjectPage;
