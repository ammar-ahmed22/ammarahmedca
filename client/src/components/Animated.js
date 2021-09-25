import React from 'react';
import { animated, useSpring } from 'react-spring';

const Animated = ({children, animProps}) => {

    const props = useSpring(animProps)

    return (
        <animated.div style={props}>
            {children}
        </animated.div>
    );
}

export default Animated;
