import React, { Component } from 'react';
import "../assets/css/experience.css"

import ExperienceTabs from './ExperienceTabs';

class Experience extends Component {
    render() {
        return (
            <section className="experience" id="experience">
                <div className="container">
                    <div className="row  ">
                    <h2 className="text-purple display-3 section-heading my-4 fw-bold">.experience()</h2>
                    <ExperienceTabs />
                    </div>
                </div>
            </section>
        );
    }
}

export default Experience;
