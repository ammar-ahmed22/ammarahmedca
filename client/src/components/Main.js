import React, { Component } from 'react';

import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Footer from './Footer';
import Nav from './Nav';

class Main extends Component {

    state = {
        isDark: true,
    }

    

    

    componentDidUpdate(){
        //console.log(this.state.isDark)
        //this.switchColors(this.state.isDark);
    }
    
    toggleIsDark = () =>{
        this.setState( prevState => {
            return {isDark: prevState.isDark ? false: true};
        })
    }

    
    
    render() {
        return (
            <>
                <Hero isDark={this.props.isDark} toggleIsDark={this.props.toggleIsDark}/>
                <About />
      
                <Projects />
                <Experience />
               
                <Nav />

                <Footer />
            </>
        );
    }
}

export default Main;
