export const distFromTop = (elem) =>{
    return elem.getBoundingClientRect().top + window.scrollY;
}

export const getYPos = (elem) =>{
    let yPos = 0;

    while (elem){
        yPos += elem.offsetTop - elem.scrollTop + elem.clientTop;
        elem = elem.offsetParent
    }

    return yPos;
}