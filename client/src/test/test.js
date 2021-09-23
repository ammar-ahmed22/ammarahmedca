const testTextContent = [
    {
        type: "title",
        text: 'Backstory'
    },
    {
        type: 'para',
        text: "After gaining acceptance the University of Waterloo's highly competitive engineering program, the University set up a forum for other incoming first years to get to know eachother. While most people were asking generic ice-breaker questions, I had the bright idea of asking if there were any people who wanted to get together and work on a cool side-project together. I wasn't expecting very many responses, but when I checked the next day, there were over 50 responses. I decided to connect with the first 10 people and told the others to connect with eachother to form their own groups."
    },
    {
        type: 'para',
        text: "After initiating this group, I set up a meeting to discuss what types of projects we could work on from home as the pandemic had just come in to full effect. As I had absolutely no experience programming, I thought this would be a great opportunity to pick up a new skill."
    },
    {
        type: "title",
        text: 'Problem'
    },
    {
        type: 'para',
        text: "After some deliberation with the group, we came up with the idea to create a website for other students applying to the University of Waterloo's competitive engineering program. We found that during our time applying, it was sometimes difficult to find reliable information on the different aspects of the application process. Therefore, we wanted to create a resource that would include reliable information in one place."
    },
    {
        type: "title",
        text: "Learning"
    },
    {
        type: "para",
        text: "Due to my lack of experience with programming, I started to learn HTML and CSS through YouTube tutorials and in under a week I felt comfortable enough to start working on this project. After our initial meetings about the design of the website, we were all ready to start actually making the website, however, as we were all quite new to programming, we had no idea of how to collaborate on a project like this. Some ideas we had in the moment were to use a Google Doc and copy paste the code back and forth into it (I know, it sounds crazy to me now too). We quickly realized that would be extremely tedious and after some research we found out about Git and GitHub. We all took a few days to pick up the core competencies in these technologies and started to code up the website."
    },
    {
        type: "image",
        
        caption: "Our initial design of the website (Yes, we did it on paper because we had no idea about Figma or anyother prototyping tools)"
    },
    {
        type: "title",
        text: "Tasks"
    },
    {
        type: 'para',
        text: "Due to my lack of experience with programming, I started to learn HTML and CSS through YouTube tutorials and in under a week I felt comfortable enough to start working on this project. After our initial meetings about the design of the website, we were all ready to start actually making the website, however, as we were all quite new to programming, we had no idea of how to collaborate on a project like this. Some ideas we had in the moment were to use a Google Doc and copy paste the code back and forth into it (I know, it sounds crazy to me now too). We quickly realized that would be extremely tedious and after some research we found out about Git and GitHub. We all took a few days to pick up the core competencies in these technologies and started to code up the website."
    },
    {
        type: "title",
        text: "Status"
    },
    {
        type: "para",
        text: "After completing the code of the website, we employed the help of GitHub pages along side Google Domains to host the website and went on to promote on various platforms such as Reddit, Applicant and Incoming student Discord servers. After a mere 3 months, we had amassed over 8.7k impressions and were also featured on a popular student TikTok account."
    },
    {
        type: "button",
        text: "WaterlooBasics",
        link: "http://waterloobasics.com"
    }
]

const text = "hi, i'm ammar";

const typeText = (h1text, spantext) =>{
    let h1output = '';
    let index = 0;

    const int = setInterval(()=>{
        if (index < h1text.length){
            console.log("h1: ", h1text.slice(0, index+1));
            index++
        }

        
        
    }, 500, index, h1text)

    if (index >= h1text.length){
        clearInterval(int)
    }
    
}

const roundToTen = (num) =>{

    const roundUp = (Math.floor((num - 5) / 10) * 10) === ((Math.ceil((num) / 10) * 10) - 10)

    return roundUp ? Math.ceil(num / 10) * 10 : Math.floor(num / 10) * 10
}

const para = "For my first co-op term, I landed a position as a **Developer** for the University of Waterloo's Work Integrated Learning Programs. My role consisted of translating designed content into **webpages** through **HTML/CSS** and the **Bootstrap** framework. I also took on various **JavaScript automation** and functionality projects throughout this term including writing a testing **automation** **script** for link checking as well as a reuseable template for in broswer quizzes using various input forms."

const boldText = para => {
    const words = para.split(' ');
    //console.log(words[29].slice(0,2))
    for (let i = 0; i < words.length; i++){
        if (words[i].slice(0,2) === "**" && words[i].slice(-2) === "**"){
            
            console.log(words[i].slice(2, words[i].length - 2))
        }
    }
}

//boldText(para)


const calculateReadTime = (textContent) =>{
    const wordArr = [];

    for (let i = 0; i < textContent.length; i++){
        if (textContent[i].type === "title" || textContent[i].type === "para"){
            wordArr.push(...textContent[i].text.split(' '))
        }
    }

    const readTime = (wordArr.length / 200);
    console.log(readTime)
    const mins = Math.floor(readTime);
    const secs = (readTime - mins) * 0.60;

    if (secs >= 0.3){
        return mins + 1;
    }else{
        return mins
    }
}


