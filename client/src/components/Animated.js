import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { distFromTop, getYPos } from '../assets/helpers/DOMcalcs';

const Animated = ({children, onScroll, anchor, from, to, duration, offset, childRef }) => {

    const [styles, api] = useSpring(()=>({from: from, config: {duration: duration}}));
    const props = useSpring({from: from, to: to, config: {duration: duration}});

    // const [triggered, setTriggered] = useState(false);

    // useEffect(()=>{
    //     if (toggle){
    //         api({
    //             to: to
    //         })
    //     }
    // }, [toggle, api, to])

    

    const animatedDiv = useRef(null);

    let callCounter = 0;
    let triggered = false;

    const toggleAnimation = () =>{
        let windowAnchor;
        if (anchor === "top"){
            windowAnchor = window.scrollY
        }else if (anchor === "middle"){
            windowAnchor = window.scrollY + (window.innerHeight / 2);
        }else{
            windowAnchor = window.scrollY + window.innerHeight;
        }

        windowAnchor = offset !== undefined ? windowAnchor - offset : windowAnchor

        if (windowAnchor > getYPos(childRef.current)){
            api({
                to: to
            })
            
        }

        

        
    }

    useEffect(()=>{
        onScroll && toggleAnimation();
    })
    

    onScroll && window.addEventListener("scroll", toggleAnimation);
    console.log(callCounter)

    return (
        <animated.div style={onScroll ? styles : props} ref={animatedDiv}>
            {children}
        </animated.div>
    );
}

export default Animated;
