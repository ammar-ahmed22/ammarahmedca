import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../assets/css/hero.css'

//import canvasHover from '../assets/images/canvashover.png';

import Typist from 'react-typist';

import RobotModel from './RobotModel';
import DarkModeToggle from './DarkModeToggle';

class Hero extends Component {

    state = {
        canvasRedirect: false,
        canvasId: 0,
    }

    mediaQuery = window.matchMedia(" (max-width: 600px) ");
    componentDidMount(){
        if (!this.mediaQuery.matches){
            document.querySelector("canvas").addEventListener("click", this.handleCanvasClick)
        }
       
    }

    handleCanvasClick = (e) =>{
        this.setState({canvasRedirect: true})
    }

    handleToggleClick = (e) =>{
        const input = e.target;
        const label = input.nextElementSibling;

        this.props.toggleIsDark();
    }

    updateCanvasId = () =>{
        this.setState( prevState =>{
            return {canvasId: prevState.canvasId + 1}
        })
    }

    render() {
        if (this.state.canvasRedirect){
            return <Redirect push to="/snake"/>;
        }
        console.log(this.state.canvasId)
        return (
            <section className="hero d-flex align-items-center" id="home">
                <div className="container">
                <div className="row ">
                    <DarkModeToggle isDark={this.props.isDark} toggleIsDark={this.props.toggleIsDark} updateCanvasId={this.updateCanvasId}/>
                    <div className="col-md-6  d-flex flex-column">
                        <Typist avgTypingDelay={120} cursor={{show: false}}>
                            <h1 className="display-1 text-light type-text">hi, i'm <span className="text-purple">ammar</span></h1>
                        </Typist>
                        <h2 className="text-light">Nanotechnology Engineer with a passion to learn</h2>
                        <p className="text-slate fs-5">I’m a second year engineering student at the University of Waterloo with a strong interest in software development</p>
                        
                        <a href="#about" className="scroll-ind text-purple text-decoration-none display-5 cursor-pointer"><i class='bx bxs-down-arrow-alt'></i></a>
                        
                    </div>
                </div>
                
                </div>
                

                {!this.mediaQuery.matches && <RobotModel isDark={this.props.isDark} id={this.state.canvasId} />}
       
      </section>
        );
    }
}

export default Hero;
