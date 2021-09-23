import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import Snake from './components/Snake';
import ProjectPage from './components/ProjectPage';
import React, { useState, useEffect } from 'react';

function App() {
  const [id, setId] = useState(0);
  const [isDark, setIsDark] = useState(true);

  //Function to switch CSS variable values for dark mode color change 
  const switchColors = (isDark) =>{
    const colors = {
        dark: {
            darkPurple: "#140724",
            lighterPurple: "rgba(90, 0, 207, 0.1)",
            lightSlate: "#CFCFCF",
            slate: "#999999"
        },
        light: {
            darkPurple: "#ece4f7",
            lighterPurple: "rgba(144, 94, 207, .1)",
            lightSlate: "#252525",
            slate: "#4d4d4d"
        }
    }
    if (!isDark){
        document.querySelector(":root").style.setProperty("--darkpurple", colors.light.darkPurple);
        document.querySelector(":root").style.setProperty("--lighterpurple", colors.light.lighterPurple);
        document.querySelector(":root").style.setProperty("--lightslate", colors.light.lightSlate);
        document.querySelector(":root").style.setProperty("--slate", colors.light.slate);
    }else{
        document.querySelector(":root").style.setProperty("--darkpurple", colors.dark.darkPurple);
        document.querySelector(":root").style.setProperty("--lighterpurple", colors.dark.lighterPurple);
        document.querySelector(":root").style.setProperty("--lightslate", colors.dark.lightSlate);
        document.querySelector(":root").style.setProperty("--slate", colors.dark.slate);
    }
}

  //Called when value of isDark is changed
  useEffect(()=>{
    //console.log(isDark);
    switchColors(isDark);
  }, [isDark])

  const mediaQuery = window.matchMedia("(max-width: 700px)");

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const roundToTen = (num) =>{
    const roundUp = (Math.floor((num - 5) / 10) * 10) === ((Math.ceil((num) / 10) * 10) - 10)

    return roundUp ? Math.ceil(num / 10) * 10 : Math.floor(num / 10) * 10
  }

  const calcGameSize = (height, width, mediaQuery) =>{
    
    if (mediaQuery.matches){ //Game size for mobile
      
      //Window width - 10 is not divisible by 10 (needed for finding the middle and pixelSize)
      if ((width - 10) % 10 !== 0){

        if (((width - 10) / 2) % 10 !== 0){
          return roundToTen(width - 20)
        }else{
          return roundToTen(width - 10)
        }

      }else{

        return width - 10;

      }
    }else{//Game size for desktop
      
      const twothirds = Math.floor((height / 3)*2); //Two thirds of the screen floored

      if (twothirds % 10 !== 0){ //If two thirds is not divisible by 2
        
        if ((twothirds / 2) % 10 !== 0){
          console.log("half not divis by 10")
          return roundToTen(twothirds - 10);
        }else{
          console.log("half divis by 10")
          return roundToTen(twothirds)
        }

      }else{
        
        if ((twothirds / 2) % 10 !== 0){
          return roundToTen(twothirds - 10)
        }else{
          return twothirds
        }
        

      }
    }
  }

  //Toggles value of isDark
  const toggleIsDark = () =>{
    setIsDark( prevState =>{
      return prevState ? false : true;
    })
  }

  
  return (
    <Router>
      <Switch>
        <Route path="/" render={(props)=>{
          return <Main {...props} isDark={isDark} toggleIsDark={toggleIsDark}/>
        }} exact/>
        <Route path="/snake" render={(props)=>{
          return <Snake {...props} width={calcGameSize(windowHeight, windowWidth, mediaQuery)} height={calcGameSize(windowHeight, windowWidth, mediaQuery)} pixelSize={10} setId={setId} id={id} key={id}/>
        }}/>
        <Route path="/:name" render={(props)=>{
          return <ProjectPage {...props} isDark={isDark} toggleIsDark={toggleIsDark}/>
        }}/>
      </Switch>
      
      {/* <Snake width={400} height={400} pixelSize={10}/> */}
    </Router>
  );
}

export default App;
