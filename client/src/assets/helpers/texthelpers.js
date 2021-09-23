

export const convertToFunctionText = str =>{
    const split = str.split(' ');
    let join = ''
    if (split.length > 1){
        for (let i = 0; i < split.length; i++){
            if (i === 0){
                join += `.${split[i]}( ) + `
            }else{
                join += `${split[i]}( )`
            }
            
        }

        return join;
    }
    return `.${str}( )`
}

export const boldText = word => {
    
    
    
        if (word.slice(0,2) === "**" && word.slice(-2) === "**"){

            return <span className="text-light fw-bold"> {word.slice(2, word.length - 2)} </span>
        }else{
            return " " + word + " "
        }
    
}

export const formatText = (word) => {
    const identifiers = {
        bold: {
            stringId: "**",
            classNames: "text-light fw-bold"
        },
        verbatim: {
            stringId: "&&",
            classNames: "ff-alt text-purple fw-bolder fs-6"
        }
    }

    
    for (const property in identifiers){
        
        if (word.slice(0, 2) === identifiers[property].stringId && word.slice(-2) === identifiers[property].stringId){
            return <span className={identifiers[property].classNames}> {word.slice(2, word.length - 2)} </span>
        }
    }

    return " " + word + " "

}

export const calculateReadTime = (textContent) =>{
    const wordArr = [];

    for (let i = 0; i < textContent.length; i++){
        if (textContent[i].type === "title" || textContent[i].type === "para"){
            wordArr.push(...textContent[i].text.split(' '))
        }
    }

    const readTime = (wordArr.length / 200);
    
    const mins = Math.floor(readTime);
    const secs = (readTime - mins) * 0.60;

    if (secs >= 0.3){
        return mins + 1;
    }else{
        return mins
    }
}

export const hyphenate = (str) =>{
    return str.toLowerCase().split(' ').join('-');
}