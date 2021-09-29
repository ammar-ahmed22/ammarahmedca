import React, { Component } from 'react';

class DarkModeToggle extends Component {

    handleToggleClick = (e) =>{

        const input = e.target;
        const label = input.nextElementSibling;

        label.classList.toggle("text-purple");
        label.classList.toggle("text-secondary");


        this.props.toggleIsDark();
        //this.props.updateCanvasId();
    }

    render() {
        return (
            <div className="darkmode-toggle ">
                    <div className="form-check form-switch ">
                        <input className="form-check-input cursor-pointer " type="checkbox" id="flexSwitchCheckChecked" checked={this.props.isDark} onChange={this.handleToggleClick}></input>
                        <label className="form-check-label text-purple fs-5 cursor-pointer" htmlFor="flexSwitchCheckChecked"><i className='bx bxs-moon'></i></label>
                    </div>
            </div>
        );
    }
}

export default DarkModeToggle;
