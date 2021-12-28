import React, { useEffect } from "react";
import "../css/Hero.css";

const Hero = () => {

    useEffect(()=>{
        window.addEventListener("scroll", e => {
            console.log(e)
        })
    },[])

    return (
        <section className="hero">
            <h1 className="hero-text fw-bold text-end text-light">Hi 👋🏽 <br/> I'm Ammar</h1>
        </section>
    )
    
};

export default Hero;