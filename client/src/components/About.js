import React, { Component } from 'react';
import '../assets/css/about.css'
import me from '../assets/images/me.jpg'

class About extends Component {
    render() {
        return (
            <section className="about" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <h2 className="text-purple display-3 section-heading my-4 fw-bold">.about()</h2>

                            <h3 className="text-lightpurple fs-2 ff-alt fw-bold ">.who()</h3>
                            <p className="text-slate fs-5">
                            I am currently in my second year studying <span>Nanotechnology Engineering</span> at the <span>University of Waterloo</span>. As part of my last co-op term, I was employed by the <span>University of Waterloo WIL Programs</span> as a <span>Developer</span>. 
                            </p>

                            <h3 className="text-lightpurple fs-2 ff-alt fw-bold">.interests()</h3>
                            <p className="text-slate fs-5">
                                Professionally, I have a strong interest in <span>software development</span> with a focus in the <span>front-end</span>. I am also interested in <span>machine learning</span> and <span>full stack app development</span>. In my free-time, you can find me spending time with my lovely wife or playing video games.  
                            </p>

                            <h3 className="text-lightpurple fs-2 ff-alt fw-bold">.technologies()</h3>
                            <p className="text-slate fs-5">
                            Technologies/languages that I am comfortable with:
                            </p>
                            
                                <ul className="d-flex flex-wrap text-slate justify-content-start fs-5 tech-list">
                                    <li><div className="fs-4"><i class='bx bx-code-alt'></i></div> JavaScript ES6+
                                        <ul>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> React</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> React Native</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Express.js</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Node.js</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Three.js</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> MERN Stack</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i class='bx bx-code'></i></div> Python 
                                        <ul>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Pandas</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Numpy</li>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Matplotlib</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i class='bx bx-code'></i></div> HTML/CSS 
                                        <ul>
                                            <li><div className="fs-4"><i class='bx bx-code'></i></div> Bootstrap</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i class='bx bx-code'></i></div> Flutter/Dart</li>
                                    <li><div className="fs-4"><i class='bx bx-code'></i></div> C++</li>
                                </ul>
                            
                        </div>

                        <div className="col-4 d-md-flex d-none justify-content-center align-items-center">
                            <div >
                                <img src={me} alt="" className="img img-fluid me-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
