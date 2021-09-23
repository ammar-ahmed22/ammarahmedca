//Images

//WaterlooBasics
import wbmockup from "../images/wbmockup.png"
import wbdesign from "../images/wbdesign.png"

//Home Renovation
import before from '../images/BeforeReno.png';
import after from '../images/AfterReno.png';
import excel from '../images/excel.png';

//Flowmodoro
import flowMobile from "../images/flowMobile.png";
import flowMulti from "../images/flowMulti.png";
import flowWeb from '../images/flowWeb.png';

//Movie Bot
import movieBotLogo from "../images/movieBotLogo.png";
import movieBotList from "../images/movieBotList.png";

//Workout Tracker
import workoutTrackerDash from '../images/workoutTrackerDash.png';
import workoutTrackerInput from '../images/workoutTrackerInput.png';

//Terminal Snake
import snakeLogo from "../images/snakeLogo.jpeg";
import snakeMenu from "../images/snakeMenu.png";
import snakeGame from "../images/snakeGame.png";

const projectContent = {
    "waterloobasics": {
        title: "WaterlooBasics",
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        mainQuote: {
            text: "For Waterloo Engineers, by Waterloo Engineers",
           
        },
        headerContent: [
            "SUMMER 2020",
            "Collaborative Personal Project",
            "Web Development",

        ],
        mainImg: wbmockup,
        contextContent: [
            
            {
                type: "Tools",
                text: "HTML/CSS, JavaScript, Git, GitHub"
            },
            {
                type: "Skills",
                text: "Project Management, Teamwork, Prototyping, User Research, Delegation"
            }
        ],
        textContent: [
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
                img: wbdesign,
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
    },
    'home-renovation': {
        title: "Home Renovation",
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        mainQuote: {
            text: "Learning is experience, everything else is just information",
            author: "Albert Einstein"
        },
        headerContent: [
            "WINTER 2020",
            "Project Management",
            "Renovation and Carpentry"
        ],
        // mainImg: reno,
        contextContent: [
            {
                type: "Tools",
                text: "Power Tools, Excel"
            },
            {
                type: "Skills",
                text: "Carpentry, Project Management, Time Management"
            }
        ],
        textContent: [
            {
                type: "title",
                text: 'Backstory'
            },
            {
                type: 'para',
                text: "In November of 2020, my family decided they wanted to change up the top floor of our house. The carpet upstairs was white so after a few years of living there it had become stained with various spills throughout the years (I am guilty of many of those, drinking coffee while watching Netflix in bed just hits different). Naturally, we had two options; either deep clean the carpet or get the carpet removed and install flooring. The main problem with the latter option was that our stairs were also carpeted which meant also getting those changed. After hearing the quotes from various flooring contractors, I was astonished by how costly this project would be. We had 600 square feet of flooring to renovate and most contractors were charging almost $5/square foot amounting to a cost of almost $3000 just for the floor. The stairs would be an extra $2000 - $3000 as stairs require more labour to renovate since its not as simple as laying down new material."
            },
            {
                type: "image",
                img: before,
                caption: "What the carpetted floor and stairs looked like prior to the renovation"
            },
            {
                type: "title",
                text: "Problem"
            },
            {
                type: "para",
                text: `After hearing these extravagant prices, I thought it would be fun to do this work myself. The problem was that I had never done any type of carpentry before. I knew how to use basic tools to fix things around the house and was known as the "family handyman" because I have an natural aptitude to figure out how things work to be able to install or fix them. However, I had never done anything of this magnitude before.`
            },
            {
                type: "title",
                text: "Learning"
            },
            {
                type: "para",
                text: `My natural progression was to start with watching some YouTube videos on how flooring is done and quickly realized that this job is doable. Since this project would reduce my father's overhead quite significantly, he was onboard right away and connected me with one of his close friends who is well-versed in carpentry. My father's friend was very excited when he heard of my plan and told me that he would be on-call for any assistance that I might need for this project.`
            },
            {
                type: "para",
                text: `I started off by meeting my father's friend at our house so that he could inform me on the tools and materials I would need to get for this project. At this time we also found out the beneath our carpet stairs was unfinished wood which would make the stair job a lot less costly. My father's friend walked me through a high-level understanding of how flooring works as well as the process of finishing wood. I also spent a lot more time watching YouTube videos on both these processes to further develop my understanding.`
            },
            {
                type: "title",
                text: "Tools/Materials"
            },
            {
                type: "para",
                text: `The next step was to acquire materials for this project. I started off by measuring all the rooms and hallways on the top floor of my house and inputting the measurements into a SolidWorks sketch. This allowed me to very easily find the square footage as a lot of my upstairs floor is at angles. I found that we had roughly 550 sq. feet of floor and in order to account for wasted material, I decided to purchase 600 sq. feet of laminate flooring and underlay. `
            },
            {
                type: "para",
                text: `For the stairs, all that would be needed is the stain, polyurethane and white paint as we had decided to do dark stained wood for the steps and railings and white paint for the risers and bannisters. Another important material required for the stairs was finished pieces of wood that would be installed at the balcony underneath the railings. Since the carpet would be removed under the railings, we needed something to go under the railings that would match the floor and create something for the floor to stop at. These finished wood pieces would eventually be stained and polished to the same colour as the flooring. `
            },
            {
                type: "para",
                text: `Finally, we needed to acquire all the tools that would be required for this job. The flooring pieces would need to be cut to size, therefore, we purchased a table saw and we borrowed a mitre saw from a family friend. The mitre saw would be used to cut any angled pieces as well as any cuts to the length of the boards. The table saw would be used to cut any pieces that required a shortening in width as well as for the finished wood pieces. Another important tool was an oscillating multi-tool that would be used to cut baseboards so that the flooring can slide under and look seamless.`
            },
            {
                type: "title",
                text: "Planning"
            },
            {
                type: "para",
                text: `As I decided to take on this project in my first-year of engineering, I did not have much time to do it during school. Therefore, I decided to schedule this project for my 3 week winter break. However, I needed to ensure that the project would be completed in this timeframe as I did not want it to affect my studies. For this reason, I decided to set up a Gantt chart to plan out the project with all the tasks planned out. `
            },
            {
                type: "image",
                img: excel,
                caption: 'Gantt chart created in excel'
            },
            {
                type: 'para',
                text: 'As this Gantt chart was for my own personal use, I will list out the steps in more simple terms:'
            },
            {
                type: 'subtitle',
                text: "Preparation Tasks"
            },
            {
                type: 'ordered-list',
                text: [
                    'Removing both sliding closet doors',
                    'Removing all the carpets from each room as well as the nail boards that hold them down',
                    'Inspecting the subfloor for creaks and installing 3 inch screws to remove the creaking',
                    'Removing the railings and bannisters from the balcony and stairs (so that the carpet can be removed)',
                    'Removing the carpets from the hallway and stairs',
                    'Cutting and sanding the finished wood pieces that are installed under the bannisters in the balcony',
                    'Sanding the stairs, railings and bannisters (to remove the old stain)'
                ]
            },
            {
                type: 'subtitle',
                text: 'Flooring/Restoration Tasks'
            },
            {
                type: "ordered-list",
                text: [
                    " Starting from the room furthest closest to the entrance of the house, install flooring",
                    "Install a strip of flooring at the correct depth all the way to the other end of the floor, to allow for seamless transition from the first room to the hallway (this was the most technical aspect of the project)",
                    "Install flooring in the hallway and the other 2 rooms",
                    "Staining the finished wood pieces",
                    "Painting the risers and the bannisters white (2 coats)",
                    "Installing the finished wood pieces",
                    "Staining the stairs and railings",
                    "Reinstalling the railings and bannisters"
                ]
            },
            {
                type: 'subtitle',
                text: "Finishing Tasks"
            },
            {
                type: "ordered-list",
                text: [
                    'Install quarter round trim on all floors (seals the floor as this is a "floating floor"',
                    "Install transition pieces from the floor to washrooms",
                    "Reinstalling the sliding closet doors in each room",
                    'Applying polyurethane to stairs (2 coats) and railings (3 coats) (this seals the wood and gives it the "glossy" look)',
                    "Final clean-up/garbage removal"
                ]
            },
            {
                type: 'title',
                text: "Hiccups"
            },
            {
                type: "para",
                text: "As with any project, there are bound to be hiccups throughout and this project was no different. The first major problem I came across was deciding whether to use transition pieces through each room to hallway or have seamless transitions. I consulted my father's friend about this and he said transition pieces would make the job significantly easier but also takes away from the professionality of the job. So, I decided to go with seamless transitions. The difficulty with seamless transitions is that laminate flooring can only be installed in one direction, therefore, all the flooring has to start on one wall and when coming out of the door into the hallway, the hallway pieces have to be pre-installed to match exactly where it would meet coming out of the door. This required careful measurement and planning which took me almost an entire day to figure out and execute."
            },
            {
                type: "para",
                text: "Another hiccup I came across was installing the finished wood pieces in the balcony, as there would be no quarter round moulding between the balcony and the floor, the floor had to match the finished pieces exactly in terms of height as well as the edge. The edge was not too difficult to match through careful and precise cuts, however, the height of the finished wood pieces was just a little bit too low as after removing the carpets, the floor was not exactly level. For this, I thought of using some underlay install at various points under the finished wood pieces to raise just enough to match the floor. I then used counter sunk screws to install the finished wood pieces and filled the tops with wood filler to make it look as though they were built into the floor."
            },
            {
                type: "para",
                text: "After installing the finished wood pieces, the next problem arised while figuring out how to reinstall the railings. All the bannisters needed to be installed in the exact position they were previously so that the railing will attach to the wall and the stair post. The bannisters on the stairs were no problem as we did not touch the holes that they were removed from. However, the bannisters on the balcony needed have new holes drilled in the finished wood piece as the pieces covered up the existing holes. We consulted another one of my father's friends about how to go about this and his first idea was to measure out the distances between each bannister and mark them. While this idea was good in theory, I saw some immediate problems with it. Most importantly, it would be extremely tedious to measure out each distance perfectly and there is still bound to be a great deal of error. To this, I thought of a very simple yet effective solution. We could use the metal piece that would attach on top of the bannisters as stencil for where to mark. All we would have to do is lay it out on the right spot and use the holes in the metal to mark our holes. My father's friend thought this idea was ingenious and it eventually worked out perfectly."
            },
            {
                type: "para",
                text: "Another small problem came up when it was time to stain and finish the stairs. When applying the stain and finish, it takes about 24 hours for the stain to dry on each coat and about 12 hours for the finish to dry on each coat. As we needed 2 coats for both the stain and finish, this would a lot of time that nobody could use the stairs. Since my parents had work most days, I figured out the days that they both would be home so that I could apply the stain in those 2 days. For the finish, since my mom was the first to leave at 5am in the morning, I told my parents to go upstairs at 5pm  so that I could apply the finish and by the time they have to get up, they can use the stairs. I provided food for them through a ladder and the balcony on these 2 days."
            },
            {
                type: "title",
                text: 'Status'
            },
            {
                type: 'para',
                text: "All in all, I managed to transform 600 square feet of carpeted floor to laminate flooring while also completely rejuvenating the stairs from carpet to hardwood while also matching the color scheme of the entire house. I also managed to follow the project plan almost exactly to complete the project in exactly 3 weeks. While this project might not be directly related to my field of engineering, it taught me a lot about project management and dealing with technical problems with the resources that are available."
            },
            {
                type: 'image',
                img: after,
                caption: "The final product!"
            }
            
        ]
    },
    "flowmodoro": {
        title: "Flowmodoro",
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        mainQuote: {
            text: "Just do it",
            author: "Shia  LaBeouf"
        },
        mainImg: flowMulti,
        headerContent: [
            "SPRING 2021",
            "Personal Project",
            "Multi-platform App Development"
        ],
        contextContent: [
            
            {
                type: "Tools",
                text: "Figma, Flutter, Dart, HTML/CSS, JavaScript, Electron"
            },
        ],
        textContent: [
            {
                type: "title",
                text: "Backstory"
            },
            {
                type: 'para',
                text: "Around February of 2021, I came across a TikTok that outlined a novel Pomodoro technique (novel to me atleast). In essence, the Pomodoro technique is a productivity method in which users set a timer (typically for 25 minutes) that they must set aside all distractions and focus on the task at hand. Once the 25 minutes are over, they take a 5 minute break and repeat this process 4 times before a taking a longer break for 15 minutes. The novel technique I came across, coined the Flowmodoro technique, consisted of the user timing themself working for however long they can and then their break is calculated as ratio of time worked. While I had tried the Pomodoro technique in the past, it was unsucessful for me as I found myself loosing focus to quickly or wanting to work for longer than the set time. Therefore, this new technique was perfect for me."
            },
            {
                type: "title",
                text: "Problem"
            },
            {
                type: "para",
                text: "After searching on all the app stores, I could not find any applications that would make the implementation of the Flowmodoro technique easier. There were hundreds of apps for the Pomodoro technique but none for this technique. As I had been working on my front-end development skills for the past few months and had gotten quite comfortable with it, I decided this would be a great opportunity for me to start learning about mobile app development. For this reason, I decided to embark on creating this app for myself as it would be really nice to have an app that will time and calculate my breaks for me rather than having to do it manually."
            },
            {
                type: "title",
                text: "Learning"
            },
            {
                type: "para",
                text: "As I had never created any mobile applications before, I was looking for a technology or framework that would be good for beginners. After some research, I found two options that would make this process a lot easier while allowing me to create applications for both iOS and Android. These were the Flutter framework by Google and the React Native framework by Facebook. Through my own research, I found out the Flutter is a little bit faster in terms of rendering speed due to which I chose to go with this instead of React Native. As I am writing this article in the Summer of 2021 after learning and falling in love with the React framework (yes, this website is also created with React), I feel as though I should have chose React Native. This is due to the fact that it uses JavaScript which I was already familiar with and that it is very similar to React. While I hadn't learned React at that time, I personally believe it would have been more of an asset to me to learn React at that time then Flutter. Also, this app that I was creating would not be significanlty affected by rendering speeds as there was nothing heavy going on under the hood. Nevertheless, I chose Flutter and started to learn Dart, the language that Flutter uses, through YouTube tutorials and created numerous walk-through projects. After this, I felt comfortable enough to start working on my own project."
            },
            {
                type: "title",
                text: "Breakdown"
            },
            {
                type: "para",
                text: "As I had never created any mobile applications before, I was looking for a technology or framework that would be good for beginners. After some research, I found two options that would make this process a lot easier while allowing me to create applications for both iOS and Android. These were the Flutter framework by Google and the React Native framework by Facebook. Through my own research, I found out the Flutter is a little bit faster in terms of rendering speed due to which I chose to go with this instead of React Native. As I am writing this article in the Summer of 2021 after learning and falling in love with the React framework (yes, this website is also created with React), I feel as though I should have chose React Native. This is due to the fact that it uses JavaScript which I was already familiar with and that it is very similar to React. While I hadn't learned React at that time, I personally believe it would have been more of an asset to me to learn React, at that time, than Flutter. Also, this app that I was creating would not be significantly affected by rendering speeds as there was nothing heavy going on under the hood. Nevertheless, I chose Flutter and started to learn Dart, the language that Flutter uses, through YouTube tutorials and created numerous walk-through projects. After this, I felt comfortable enough to start working on my own project."
            },
            {
                type: "image",
                img: flowMobile,
                caption: "The pages of the app on mobile devices"
            },
            {
                type: 'para',
                text: "As I also wanted to create a web application for this, I had planned to use the same layout but code it in HTML/CSS and JavaScript. I created different HTML pages for each page rather than dynamically rendering the pages. In order to pass the time worked to the break page, I used JavaScript session storage to save the time worked as a string."
            },
            {
                type: "image",
                img: flowWeb,
                caption: "The pages of the app on the web"
            },
            {
                type: "title",
                text: "Status"
            },
            {
                type: "para",
                text: "As of now, I have working MVP's of both the web application and the iOS and Android applications, however, there are some more features I would like to add such as data visualization for Flowmodoro sessions as well as a to-do list in the app. As I am writing this article in the summer of 2021 with a lot more experience with React. I would also like to rewrite the application using React Native as it would give me more creative freedom with the design of the application."
            }
        ]
    },
    "movie-bot":{
        title: "Movie Bot",
        mainQuote: {
            text: "People are weird. When we find someone with weirdness that is compatible with ours, we team up and call it love.",
            author: "Dr.Seuss"
        },
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        headerContent: [
            "SUMMER 2021",
            "Personal Project",
            "Full Stack Development"
        ],
        mainImg: movieBotLogo,
        contextContent: [
            {
                type: "Tools",
                text: "Discord.js, Node.js, Express.js, MongoDB Atlas, Heroku, Git, GitHub"
            }
        ],
        textContent: [
            {
                type: "title",
                text: "Backstory"
            },
            {
                type: "para",
                text: "After becoming quite comfortable with front-end development, I wanted to move on to learning back-end and database development. I came across a LinkedIn learning course on the MERN stack and went through the entire course which walked through how to create a simple blog website with comment and upvoting functionality using a MongoDB database. While this taught me a lot about the MERN stack, I always need my own projects to solidify my learning. Around this time, the pandemic was in full force and it was very difficult for me to see my wife as we were in a long distance relationship. For this reason, we were watching movies together almost every day using Teleparty (chrome extension that allows to sync movies together on different screens). We were using Apple's notes app to track which movies we wanted to watch and which movies we had already watched, however, I thought it would be nice to have a to-do list type app that would track and persist these movies for us. As we were using Discord to video call during the movie, I thought it would be a great idea to use the discord.js library to create a bot that would act as a to-do list for us."
            },
            {
                type: "title",
                text: "Problem"
            },
            {
                type: "para",
                text: "The main problem with this project was learning how to use discord.js to create a bot. The bot would act as an api which would manipulate the database and display data from it. I also had to figure out the best data structure to store my movie data in to make it easy to access and manipulate. As MongoDB uses JavaScript style data this would not be too difficult to implement, however, it had to be thought out."
            },
            {
                type: "title",
                text: "Learning"
            },
            {
                type: "para",
                text: "My first order of business was learning how to use the Discord.js library to create a discord bot. The documentation on the discord website was very thorough so this was not too difficult and I also employed some YouTube videos to learn how to set up a bot using Node.js and the Discord.js library. "
            },
            {
                type: "title",
                text: "Planning"
            },
            {
                type: "para",
                text: 'I planned to have some core functionality for the bot which would include adding and deleting movies, marking movies as watched or unwatched as well as displaying all the movies. The way the discord.js library works is by connecting to discord and watching for different events in the discord server. The event that I was interested in was when a message was sent in any of the channels with a certain prefix, in my case, it was when a message was sent with a "." in front of it. Different discord bots use different prefixes and this was just the prefix that I chose. Upon sending a message it would check what word is beside the prefix and then perform the related operation. For example, if a user sent ".add Movie Name", it would parse the string to get the word that is beside the prefix which, in this case, is "add". It would then parse the string to get the rest of the string after the prefix and "add" and add the movie to the database and return the new list of movies. A similar process would occur for any other operation.'
            },
            {
                type: "para",
                text: "As to how I planned to display the list to the users, I used the embed message that is available for discord bots. This allows for some pretty formatting with colors and different font sizes for titles. The way I would display the list of movies was through emojis. The movies would be displayed as list with checkmark or red cross emojis beside them which would indicate whether they have been watched or not."
            },
            {
                type: "image",
                img: movieBotList,
                caption: 'The result of calling the ".movies" command'
            },
            {
                type: "para",
                text: "In terms of database structure, I decided to use a MongoDB collection which would consist of an array of objects that have 2 key-value pairs. One for the name of the movie and the other for a boolean value of whether it has been watched or not."
            },
            {
                type: "para",
                text: "Another key aspect of planning was how to host both the database and the discord bot. The discord bot would need to be run as node process which would require some type of server hosting. I could have the discord bot continuously running on my local computer, however, this is not very realistic as I might have to shut down my computer sometimes. After some research, I found that Heroku allows for hosting of node processes for free with some limitations. However, the limitations were not a problem for me as it would only be me and my wife using this bot. For this reason, I decided to go with Heroku for the bot hosting. Heroku also allowed for automatic deploying from GitHub which made the process very simple and easy when I wanted to update something. As for the database hosting, MongDB has it's own free tier of hosting called MongoDB Atlas which allows for free hosting up to a certain amount of connections and data size. Both of these limitations would not be a problem for me as I would only need one connection and a relatively small amount of data."
            },
            {
                type: "title",
                text: "Hiccups"
            },
            {
                type: "para",
                text: "One major point of contention that I had was once an MVP of the bot was up and running was when I wanted to make some updates. As the bot was deployed on Heroku, testing potential features would require me to push the changes to GitHub and then wait for these changes to propagate to the server which would be extremely tedious if I wanted to test out something simple. For this reason, what I decided to do was create another discord bot for testing and use environment variables to switch the connection key for the bots. Therefore, when I was testing something locally, it would connect to the testing bot instead of the actual bot. I also created a separate branch on GitHub for development and would only merge to the main branch once it was fully functional. The implementation of environment variables also made it very easy for Heroku to only connect to the actual bot as you can set your own environment variables inside of Heroku."
            },
            {
                type: "para",
                text: "Another small issue I had was with the client Id's that discord provides to connect to the bot. At the start, I was just storing these id's in a variable, however, when I pushed to GitHub, Discord was not allowing me to connect anymore. After some research, I found out that Discord would change your client id, if it was found anywhere online, especially on GitHub as this would allow anyone to connect to the discord bot. I solved this problem with environment variables as well."
            },
            {
                type: "title",
                text: "Status"
            },
            {
                type: "para",
                text: 'As of now, I have a working bot that my wife and I use all the time. Some features that I am working on currently are adding and deleting multiple movies at the same time. As well as marking movies as watched or unwatched regardless of their case. For example, if there is a movie in the list called: "Movie Name", I want to be able to mark the movie watched even if the command given is ".watch movie name".'
            }
        ]
    },
    "workout-tracker":{
        title: "Workout Tracker",
        mainQuote: {
            text: "No pain, No gain",
            
        },
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        headerContent : [
            "SUMMER 2021",
            "Personal Project",
            "Full Stack Web Development"
        ],
        contextContent: [
            {
                type: "Tools",
                text: "Figma, MongoDB Atlas, Express.js, React, Node.js"
            },
            
        ],
        textContent: [
            {
                type: "title",
                text: "Backstory"
            },
            {
                type: "para",
                text: "As I had become quite comfortable with the MERN stack and using it to develop simple web applications. I decided to embark on a larger project that would allow me to learn more about the MERN stack as well as learn about data visualization. As I had got in to lifting weights at the gym a lot as well as biking, I thought it would be nice to have a dashboard that allows me to visualize my progress. As I had some experience in my engineering studies with data visualization using MATLAB, this project seemed like a great way to combine both my web development skills as well as my engineering studies through data visualization. It would also be a great opportunity to polish my full-stack development skills."
            },
            {
                type: "title",
                text: "Problem"
            },
            {
                type: "para",
                text: "n order to accomplish this task, I had to thing of several aspects of the project. Firstly, I had to structure a MongoDB database correctly to allow me to add and delete data. This would also have to be grouped together according to its type as well as allow for adding different types of workouts. I also had to figure out how to structure the REST api that would connect to the database in order to perform the necessary operations. These operations included adding and deleting data from a certain workout, adding and deleting types of workouts, looking up all workouts from a certain type as well as looking up any given workout. The api would also handle sorting the data according to date before it is pushed to the database."
            },
            {
                type: "para",
                text: "Another aspect I had to figure out was how to visualize my data. As this project would be created in React, I had to find a suitable React library that allows for the flexibility I need while also being reliable. I also had to figure out how I was going to add and delete data in the front-end. "
            },
            {
                type: "title",
                text: "Planning"
            },
            {
                type: "para",
                text: "Through the minimal experience I had with using the MERN stack, I always found it easier to start off by creating a working back-end before I started working on the front-end. For this reason, I started working on the REST api to create the necessary endpoints as well as start the structure of the database. I had 3 types of metrics that I intended on tracking, these were: workouts, biometrics and diet. Workouts would include any workouts such as biking, pull-ups, bench press etc. Biometrics would include things like body weight, body fat percentage, basal metabolic rate etc. Diet would include calories eaten and macro breakdowns. For this reason, I decided to create 3 objects inside the database collection that would consist of the different metrics inside of them which would be arrays of objects including the value and its date. "
            },
            {
                type: "para",
                text: 'Through the minimal experience I had with using the MERN stack, I always found it easier to start off by creating a working back-end before I started working on the front-end. For this reason, I started working on the REST api to create the necessary endpoints as well as start the structure of the database. I had 3 types of metrics that I intended on tracking, these were: workouts, biometrics and diet. Workouts would include any workouts such as biking, pull-ups, bench press etc. Biometrics would include things like body weight, body fat percentage, basal metabolic rate etc. Diet would include calories eaten and macro breakdowns. For this reason, I decided to create 3 objects inside the database collection that would consist of the different metrics inside of them which would be arrays of objects including the value and its date.'
            },
            {
                type: "para",
                text: "In order to add or delete data, I had created a POST request that would check the operation and then perform it. If it was a delete request, it would search the associated array for the data point and then delete it, otherwise, return an error. In the add operation, all the data would be sorted according to date before pushed back to the database in order to keep it all sorted. Adding metrics would be done in the same endpoint by checking if the metric already exists and then adding it if it does not exist. "
            },
            {
                type: "para",
                text: 'In the front-end, I had a found a highly reliable and well-documented React data visualization library called "recharts". This library had a plethora of different types of charts that were also highly customizable which was perfect for my use case. '
            },
            {
                type: "para",
                text: "The way I had structured my dashboard was with three distinct pages, one was the homepage in which it would showcase an overview of different exercises, biometrics and diet graphs and data. The second page was the workouts page, in which, all workout data would be shown and accessible and the third was a diet/biometrics page, in which, all biometric/diet data would be shown and visualized. All the graphs and data on any of these pages would open up into their own page when clicked on to see a full graph of all the available data. "
            },
            {
                type: "image",
                img: workoutTrackerDash,
                caption: "The main dashboard page of the workout tracker application"
            },
            {
                type: "para",
                text: "In order to add data, I had created an input form that would allow you to select the metric type and then change the metric selector based on what metric was selected. For example, if I had selected workouts, the metric selector would change to only be able to select metrics found in the database for that metric type. This was done through making an api call and then using the metrics returned. "
            },
            {
                type: "image",
                img: workoutTrackerInput,
                caption: "The input modal for adding new data points"
            },
            {
                type: "title",
                text: "Hiccups"
            },
            {
                type: "para",
                text: "One issue that I recall having was when it came down to creating the input form for adding data. I hadn't realized that I would need a way to have units for all these different types of metrics. As I had already created the database and populated it with data, I did not want to touch the database object with the data in it, so what I had decided to do was add another object to the database collection with the name of units. This would include all the same metric types with their metric structured in the same way but instead of an array of objects for each metric, it would be a single object with units. This allowed me to create another api endpoint to get any unit. I also changed the metric adding endpoint to require a unit whenever adding a new metric and that would be added to the units object in the database."
            },
            {
                type: "para",
                text: "Another issue I came across was trying to figure out how to sort data according to date. In my testing, I was just using a string for the date which would not allow for sorting on its own. For this reason, I had to figure out how to convert the string into a JavaScript date object and then sort the data, then convert it back to a string. Fortunately, JavaScript has built-in functions for parsing date strings to date object as well as built-in sorting functions which made this process a lot easier than I had thought."
            },
            {
                type: "title",
                text: "Status"
            },
            {
                type: "para",
                text: "As of now, I have a working dashboard with all core back-end functionality working correctly. However, I am still in the process of refining the front-end in terms of adding the single metric graph display pages. Some features I want to add in the future are a login feature so that only I can access the dashboard. My rationale behind this is simply to learn authentication using the MERN stack as I do not intend on making this application publicly available. "
            }
        ]
    },
    "terminal-snake":{
        title: "Terminal Snake Game",
        mainQuote: {
            text: "The mind is not a vessel to be filled but a fire to be kindled.",
            author: "Plutarch"
        },
        info: {
            author: "Ammar Ahmed",
            date: "April 24th, 2021"
        },
        headerContent: [
            "SUMMER 2021",
            "Personal Project",
            "C++ Programming"
        ],
        mainImg: snakeLogo,
        contextContent: [
            {
                type: "Tools",
                text: "C++"
            }
        ],
        textContent: [
            {
                type: "title",
                text: "Backstory"
            },
            {
                type: "para",
                text: "After getting tired of using JavaScript and working solely on web and application development, I wanted to learn more about legacy **object-oriented** **programming** languages. After some research, I found that **C++** was a very **popular** language and was especially easy to use on **UNIX** based machine such as a Mac. After going through a LinkedIn learning course, I felt confident enough in C++ to embark on a project of my own. I knew that C++ could be used to create **terminal** **applications** and processes which gave me the idea to create a game that could be played in the terminal. As I knew the popular Snake game was created on Nokia cellphones many years ago, I thought that would be a good idea as it was probably quite simple to program."
            },
            {
                type: "title",
                text: "Problem"
            },
            {
                type: "para",
                text: "The main issue I had was figuring out how to make the **game** **board** in the terminal and then creating a **snake** that was **moveable** inside the board. The game would have to end when the snake would reach the end of the board as well as if it intersected with itself. I also had to figure out how to **handle** **key** **presses** in the terminal and how to generate food and increase the length of the snake."
            },
            {
                type: "title",
                text: "Planning"
            },
            {
                type: "para",
                text: "The way I decided to create the game in the terminal was through a while loop that would continuously regenerate the board in the terminal, check the logic of the game, and move the snake. The loop would only be ended if the game was over. What I decided to do was create a Snake class with the associated operations as methods inside the Snake class. The main methods inside this class where the &&Draw()&& method, the &&Input()&& method and the &&Logic()&& method. "
            },
            {
                type: "subtitle",
                text: "Draw()"
            },
            {
                type: "para",
                text: 'This method would handle drawing the board in the terminal. The way this was done was through a nested for loop, the first for loop would represent the height of the board and the nested loop would represent the width of the loop. The walls were drawn using a "#" character. This function would also handle drawing the head and tail of the snake as well as the food of the snake which would be randomly generated every time it was eaten. All of this would happen inside the nested for loops.'
            },
            {
                type: "para",
                text: "The way the head, tail and food were drawn was by updating global variables representing their respective x and y positions. These would then be rendered inside the nested for loops."
            },
            {
                type: "subtitle",
                text: "Input()"
            },
            {
                type: "para",
                text: `The input method would check which key was pressed and then change the direction of the snake. The direction of the snake was handled through an C++ &&enum&& which behaves as special type of object that can change it's value (I'm not sure how to explain this very well). The value of the direction would change the velocity of the snake in the selected direction.`
            },
            {
                type: "subtitle",
                text: "Logic()"
            },
            {
                type: "para",
                text: "This method would handle the logic of the game. The first order of business in this method was to give the snake its classic movement style where the tail would follow its head. This was done through looping through the snakes array of x and y positions starting from the second element. The second element of the tail would become the previously first element of the tail and the third element of the tail would be saved to become the second element and so on and so forth. "
            },
            {
                type: "para",
                text: "The second order of business in this logic method was to update the snakes head based on the direction value. If the direction was to the left, the x value would be decremented and vice versa. Same for up and down but with the y value. "
            },
            {
                type: "para",
                text: "The third order of business was to check if the game was over or not. For example, checking if the snake had hit the walls, intersected itself etc. "
            },
            {
                type: "para",
                text: "Something else I wanted to add in this terminal snake game was highscore functionality which would be persisted. The way I did this was through writing to text files using C++. Whenever the game was started, the code would look for an existing text file, if the text file had a value in it, this would be converted to an integer and treated as the highscore. At the end of the current game, it would check to see if the score is greater than the highscore and subsequently overwrite the text file with the new highscore. "
            },
            {
                type: "image",
                img: snakeGame,
                caption: "What the game looks like in the terminal."
            },
            {
                type: "title",
                text: "Hiccups"
            },
            {
                type: "para",
                text: "One major issue I had was figuring out how to get key presses in the Mac terminal without pausing the terminal process. On a Windows computer, C++ had a built-in library that would easily accommodate for this, however, on Mac, there was no such library. For this reason, I had to go to the internet to find a solution for this and I was able to find someone on an online forum that had written a function to do exactly what I was looking for. As this was some very advanced C++ code, I had no option but to copy and paste this code, however, I made sure to credit the individual by linking the forum post in a comment in my code."
            },
            {
                type: "title",
                text: "Status"
            },
            {
                type: "para",
                text: "This was a very fun and challenging project and I was felt very accomplished when I completed it. After getting all the core functionality of the game down, I decided to add some web generated ASCII art for the menu page as well as add a settings page to increase or decrease the difficulty. This was done through changing the sleep time in between each iteration inside the while loop. After completing this project, I thought it would be fun to recreate this game using JavaScript and the HTML canvas which I have added to this website for your enjoyment. "
            },
            {
                type: "image",
                img: snakeMenu,
                caption: "The game menu with ASCII art"
            }

        ]
    } 
}

export default projectContent;