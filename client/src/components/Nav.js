import React, { Component } from 'react';
import "../assets/css/nav.css"

class Nav extends Component {


    componentDidMount() {
        this.getDistancesFromTop()
        window.addEventListener("scroll", (e)=>{
            
            const windowBottom = window.scrollY + window.innerHeight;
            const scrollHeight = document.body.scrollHeight;
            const lastIndex = this.distances.length - 1;
            
            for (let i = 0; i < this.distances.length; i++){

                if (windowBottom > this.distances[i] && windowBottom < this.distances[i+1]){
                   
                    this.toggleActive(i);

                }else if (windowBottom > this.distances[lastIndex] && windowBottom <= scrollHeight){

                    this.toggleActive(lastIndex)
                }
            }
            
        })
    }
    

    getDistanceFromTop = (elem) =>{
        return elem.getBoundingClientRect().top + window.scrollY + (elem.offsetHeight / 2);
    }

    toggleActive = (index) =>{
        const navToggles = document.querySelectorAll('.nav-toggle');

        for (let i = 0; i < navToggles.length; i++){

            if (i === index){

                navToggles[i].classList.add("active");

            }else{

                navToggles[i].classList.remove("active");

            }
        }
    }

    getDistancesFromTop = () =>{
        const sections = document.querySelectorAll("section");

        this.distances = []

        for (let i = 0; i < sections.length; i++){
            this.distances[i] = this.getDistanceFromTop(sections[i])
        }

        
    }

    render() {
        return (
            <div className="navigation">
                <div className="nav-links my-1">
                    <a href="#home" className="nav-toggle text-lightpurple active text-decoration-none  cursor-pointer ff-alt my-1">.home()</a>
                    <a href="#about" className="nav-toggle text-lightpurple text-decoration-none  cursor-pointer ff-alt my-1">.about()</a>
                    <a href="#projects" className="nav-toggle text-lightpurple text-decoration-none  cursor-pointer ff-alt my-1">.projects()</a>
                    <a href="#experience" className="nav-toggle text-lightpurple text-decoration-none  cursor-pointer ff-alt my-1">.experience()</a>
                </div>
                
                <div className="nav-socials">
                    <a href="https://google.ca" className="text-lightpurple text-decoration-none fs-4 cursor-pointer "><i class='bx bxl-linkedin' ></i></a>
                    <a href="https://google.ca" className="text-lightpurple text-decoration-none fs-4 cursor-pointer "><i class='bx bxl-github' ></i></a>
                    <a href="https://google.ca" className="text-lightpurple text-decoration-none fs-4 cursor-pointer "><i class='bx bxs-envelope' ></i></a>
                </div>
            </div>
        );
    }
}

export default Nav;
