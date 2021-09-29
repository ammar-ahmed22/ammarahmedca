import React, { Component } from 'react';
import '../assets/css/robotmodel.css';


import DarkRobot from './DarkRobot';
import LightRobot from './LightRobot';


class RobotModel extends Component {
    colors = {
        dark: {
            background: 0x140724,
            foreground: 0xffffff
        },
        light: {
            background: 0xece4f7,
            foreground: 0x905ECF,
        }
    }
    
    render() {
    
        const { background, foreground } = this.props.isDark ?  this.colors.dark : this.colors.light; 
        return (
            <div className="wrapper" >
                {this.props.isDark && <DarkRobot bg={background} fg={foreground}/>}
                {!this.props.isDark && <LightRobot bg={background} fg={foreground}/> }
            </div>
        
        )
    }
}

export default RobotModel;
