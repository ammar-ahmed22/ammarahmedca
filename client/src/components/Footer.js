import React, { Component } from 'react';
import "../assets/css/footer.css";


class Footer extends Component {
    render() {
        return (
            <section className="footer" id="footer">
                <div className="container">
                    <div className="row mx-auto">
                        <p className="text-slate text-center m-0">Built and Designed by Ammar Ahmed. Inspired by <a href="https://jarin.me/" className="text-light">Gazi Jarin</a></p>
                        <p className="text-slate text-center">All rights reserved &copy;</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;
