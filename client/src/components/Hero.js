import React, { useEffect } from "react";
import "../css/Hero.css";

import HeroImage from "../assets/images/HeroImage.png";
import { ReactComponent as Signature} from "../assets/images/Signature.svg";

export default () => {

    useEffect(()=>{
        window.addEventListener("scroll", e => {
            // Elements being animated
            const hero = document.querySelector(".hero");
            const heroText = document.querySelector(".hero-text");
            const aboutText = document.querySelector(".hero-about-text");
            const heroImage = document.querySelector(".hero-img");
            const nav = document.querySelector(".navigation");
            const signaturePaths = document.querySelectorAll('.hero-sig path');

            // scroll values
            const vh = hero.clientHeight;
            const scrollPos = window.scrollY;
            const percentScrolled = (1 - ((vh - scrollPos) / vh));

            // Signature animation (reversed when scroll)
            for (let i = 0; i < signaturePaths.length; i++){
                if (scrollPos === 0){
                    signaturePaths[i].style.animation = `line-anim ${i+1}s ease forwards`;
                }else{
                    signaturePaths[i].style.animation = `line-animRev${i+1} ${i + 1}s ease forwards`;
                }
                
            }

            // rgb for primary color
            const primaryColor = {
                r: 41,
                g: 110,
                b: 180
            };

            // Calculates color value depending on scroll progress
            const calcColor = (initial, final, progress) => {
                const delta = initial - final;

                return Math.floor(initial - (delta * progress));
            }

            // Once passed 1, end the animation
            if (percentScrolled >= 0 && percentScrolled <=1){

                heroText.style.transform = `translate(${-(percentScrolled / 2) * 100}%, 0)`;
                hero.style.backgroundColor = `rgb(${calcColor(255, primaryColor.r, percentScrolled)}, ${calcColor(255, primaryColor.g, percentScrolled)}, ${calcColor(255, primaryColor.b, percentScrolled)})`;
                nav.style.backgroundColor = `rgb(${calcColor(255, primaryColor.r, percentScrolled)}, ${calcColor(255, primaryColor.g, percentScrolled)}, ${calcColor(255, primaryColor.b, percentScrolled)})`;
                aboutText.style.opacity = `${percentScrolled}`;
                heroImage.style.opacity = `${percentScrolled}`;

                if (percentScrolled > 0.5){
                    heroText.style.textAlign = "center"
                }else{
                    heroText.style.textAlign = "right"
                }
            }else{
                nav.style.backgroundColor = "var(--light)"
            }

            
        })
    },[])

    return (
        <section className="hero">
            <h1 className="hero-text text-dark fw-bold p-5">Hi <span>👋🏽</span><br />I'm Ammar</h1>
            <Signature className="hero-sig"/>
            <p className="hero-about-text hero-anim fw-bolder fs-1 p-5">Engineering Student at the University of Waterloo. Passionate in the field where science and software intersect.</p>
            <img src={HeroImage} alt="" className="img hero-img hero-anim" />
        </section>
    )

};

