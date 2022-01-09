import React from "react";
import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/Logo.svg";

const Nav = () => {
    const navItems = [
        {
            type: "text",
            text: "About",
            href: "#about"
        },
        {
            type: "text",
            text: "Projects",
            href: "#projects"
        },
        {
            type: "text",
            text: "Experience",
            href: "#experience"
        },
        {
            type: "icon",
            icon: ['fab', 'github'],
            href: 'https://google.ca'
        },
        {
            type: "icon",
            icon: ['fab', 'linkedin'],
            href: "https://google.ca"
        },
        {
            type: "icon",
            icon: "file-download",
            href: "https://google.ca"
        }
    ]
    return (
    <div className="navigation d-flex justify-content-between p-2">
        <div className="nav-logo d-flex align-items-center">
            <img src={Logo} alt="Ammar Ahmed's Logo" className="img img-fluid"/>
        </div>

        <div className="nav-items d-flex align-items-center">
            {
                navItems.map( (item, index) => {
                    const className = "px-2 text-decoration-none text-dark fw-bold nav-item";
                    if (item.type === "text"){
                        return <a href={item.href} className={className} key={index} >{item.text}</a>
                    }else if (item.type === "icon"){
                        return <a href={item.href} className={className} key={index} >
                            <FontAwesomeIcon icon={item.icon}/>
                        </a>
                    }

                    return null
                })
            }
        </div>
    </div>
    );
};


export default Nav;