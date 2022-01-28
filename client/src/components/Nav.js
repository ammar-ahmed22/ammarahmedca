import React from "react";
import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/Logo.svg";
import { navItems } from "../data/data";

export default () => {
    
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

