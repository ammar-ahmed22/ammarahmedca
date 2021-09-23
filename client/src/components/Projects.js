import React, { Component } from 'react';
import '../assets/css/projects.css';

import ProjectSelector from './ProjectSelector';

class Projects extends Component {
    render() {
        return (
            <section className="projects" id="projects">
                <div className="container">
                    <div className="row">
                        <h2 className="text-purple display-3 section-heading my-4 fw-bold">.projects()</h2>
                    </div>
                    <ProjectSelector />
                </div>
            </section>
        );
    }
}

export default Projects;
