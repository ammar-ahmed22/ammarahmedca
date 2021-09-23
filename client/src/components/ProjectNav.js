import React, { Component } from 'react';

import * as textHelper from '../assets/helpers/texthelpers';

class ProjectNav extends Component {

    componentDidMount() {
        //Displaying the project nav when user scrolls to blog post
        const projectNav = document.querySelector(".project-nav");

        const separator = document.querySelector(".separator");

        const distToSep = window.pageYOffset + separator.getBoundingClientRect().top;
        
        window.addEventListener("scroll", (e) => {
            

            //Distance from top of page to nav (changing with scroll as sticky)
            const distToNav = window.pageYOffset + projectNav.getBoundingClientRect().top; 

            //Difference between top of nav and top of separator
            const sepToNavDiff = distToNav - distToSep;

            if (sepToNavDiff > -200 && sepToNavDiff <= 0){ //Difference of nav to separtor is < 200 pixels
                //Increase opacity from 0 to 1 
                const opacityValue = (sepToNavDiff / 2) + 100;
                
                projectNav.style.opacity = `${opacityValue / 100}`;

            }else if (sepToNavDiff < 0){
                projectNav.style.opacity = "0";
            }else if (sepToNavDiff > 0){
                projectNav.style.opacity = "1";
            }
            
        })
    }

    render() {
        const { project } = this.props;
        return (
            <div className="project-nav">
                                <div className="project-nav-info d-inline-block py-3">
                                    <p className="ff-alt text-light fw-light fs-5 m-0">{project.info.author}</p>
                                    <p className="ff-alt text-slate fw-light m-0">{textHelper.calculateReadTime(project.textContent)} min read</p>
                                    <p className="ff-alt text-slate fw-light m-0">{project.info.date}</p>
                                </div>

                                <div className="project-nav-links  py-3">
                                    <p className="ff-alt text-light fw-light m-0">Jump to:</p>
                                    <ul className="list-unstyled">
                                        {
                                            project.textContent.map( item => {
                                                if (item.type === "title"){
                                                    return (<li><a href={`#${textHelper.hyphenate(item.text)}`} className="ff-alt text-purple">{item.text}</a></li>)
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
            </div>
        );
    }
}

export default ProjectNav;
