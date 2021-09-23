import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import projectContent from '../assets/helpers/projectContent';
import selectorContent from '../assets/helpers/selectorContent';

class ProjectControls extends Component {

    

    render() {
        
        const projectName = this.props.name;
        const projectArr = Object.keys(projectContent);
        const projectIndex = Object.keys(projectContent).indexOf(this.props.name);
        
        if (projectArr.indexOf(projectName) === 0){
            return (
                <div className="project-control my-5">
                    <Link to={`/${selectorContent[projectIndex].path}`} className="btn btn-outline-secondary rounded rounded-pill text-secondary px-3 me-3 disabled">Prev</Link>
                    <Link to={`/${selectorContent[projectIndex + 1].path}`} className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3">Next</Link>
                </div>
            )
        }else if (projectArr.indexOf(projectName) === (projectArr.length - 1)){
            return (
                <div className="project-control my-5">
                    <Link to={`/${selectorContent[projectIndex - 1].path}`} className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3">Prev</Link>
                    <Link to={`/${selectorContent[projectIndex].path}`} className="btn btn-outline-secondary rounded rounded-pill text-secondary px-3 me-3 disabled">Next</Link>
                </div>
            )
        }else{
            return (
                <div className="project-control my-5">
                    <Link to={`/${selectorContent[projectIndex - 1].path}`} className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3">Prev</Link>
                    <Link to={`/${selectorContent[projectIndex + 1].path}`} className="btn btn-outline-purple rounded rounded-pill text-purple px-3 me-3 ">Next</Link>
                </div>
            )
        }
        
    }
}

export default ProjectControls;
