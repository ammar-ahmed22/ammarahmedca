import React, { Component, createRef } from 'react';
import '../assets/css/about.css'
import Animated from './Animated';
import me from '../assets/images/me.jpg'

class About extends Component {

    anim1 = createRef();
    anim2 = createRef();
    anim3 = createRef();

    render() {
        return (
            <section className="about" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <h2 className="text-purple display-3 section-heading my-4 fw-bold">.about()</h2>

                            
                            <Animated from={{opacity: 0, marginTop: 100}} to={{opacity: 1, marginTop: 0}} duration={1000} onScroll={true} anchor="bottom"  childRef={this.anim1}>
                                <h3 className="text-lightpurple fs-2 ff-alt fw-bold " ref={this.anim1}>.who()</h3>
                                <p className="text-slate fs-5" >
                                I am currently in my second year studying <span>Nanotechnology Engineering</span> at the <span>University of Waterloo</span>. As part of my last co-op term, I was employed by the <span>University of Waterloo WIL Programs</span> as a <span>Developer</span>. 
                                </p>
                            </Animated>
                            
                            <Animated from={{opacity: 0, marginTop: 200}} to={{opacity: 1, marginTop: 0}} duration={1000} onScroll={true} anchor="bottom"  childRef={this.anim2}>
                            <h3 className="text-lightpurple fs-2 ff-alt fw-bold" ref={this.anim2}>.interests()</h3>
                            <p className="text-slate fs-5">
                                Professionally, I have a strong interest in <span>software development</span> with a focus in the <span>front-end</span>. I am also interested in <span>machine learning</span> and <span>full stack app development</span>. In my free-time, you can find me spending time with my lovely wife or playing video games.  
                            </p>
                            </Animated>
                            
                            <Animated from={{opacity: 0, marginTop: 300}} to={{opacity: 1, marginTop: 0}} duration={1000} onScroll={true} anchor="bottom"  childRef={this.anim3}>
                            <h3 className="text-lightpurple fs-2 ff-alt fw-bold" ref={this.anim3}>.technologies()</h3>
                            <p className="text-slate fs-5">
                            Technologies/languages that I am comfortable with:
                            </p>
                            
                                <ul className="d-flex flex-wrap text-slate justify-content-start fs-5 tech-list">
                                    <li><div className="fs-4"><i className='bx bx-code-alt'></i></div> JavaScript ES6+
                                        <ul>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> React</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> React Native</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Express.js</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Node.js</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Three.js</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> MERN Stack</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i className='bx bx-code'></i></div> Python 
                                        <ul>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Pandas</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Numpy</li>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Matplotlib</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i className='bx bx-code'></i></div> HTML/CSS 
                                        <ul>
                                            <li><div className="fs-4"><i className='bx bx-code'></i></div> Bootstrap</li>
                                        </ul>
                                    </li>
                                    <li><div className="fs-4"><i className='bx bx-code'></i></div> Flutter/Dart</li>
                                    <li><div className="fs-4"><i className='bx bx-code'></i></div> C++</li>
                                </ul>
                            </Animated>
                        </div>

                        <div className="col-4 d-md-flex d-none justify-content-center align-items-center">
                            <Animated from={{opacity: 0, marginLeft: 200, marginTop: -200}} to={{opacity: 1, marginLeft: 0, marginTop: 0}} duration={1000} onScroll childRef={this.anim1} >
                                <img src={me} alt="" className="img img-fluid me-img"/>
                            </Animated>
                            
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
