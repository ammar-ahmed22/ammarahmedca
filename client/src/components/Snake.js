import React, { Component } from 'react';
import '../assets/css/snake.css'

class Snake extends Component {

    constructor(props){
        super(props);
        this.state = {
            gameOver: false,
            gameStarted: false,
            score: 0,
            highscore: localStorage.getItem("snakeHighscore") ? localStorage.getItem("snakeHighscore") : 0,
            key: 0,
            gameSpeed: 100,
            usingArrows: true,
            
        }
    }
    

    
    //Colors
    boardBorder = "#5B00CF";
    boardBackground = "#140724";
    snakeColor = "#905ECF";
    snakeBorder = "#5B00CF";

    foodColor = '#905ECF;'

    //Control key codes
    controls = {
        arrows: {
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40
        },
        wasd: {
            LEFT: 65,
            RIGHT: 68,
            UP: 87,
            DOWN: 83
        }
    }

    //Original snake vectors
    snake = [
        {x: this.props.width / 2, y: this.props.height / 2}, //Center of canvas
        {x: (this.props.width / 2) - this.props.pixelSize, y: this.props.height / 2}, //One pixel behind head
        {x: (this.props.width / 2) - (this.props.pixelSize * 2), y: this.props.height / 2} //Two pixels behind head
    ];

    //Velocity vectors
    vx = this.props.pixelSize;
    vy = 0;

    componentDidMount(){
        
        //Canvas elem
        this.board = document.getElementById("board");

        //Drawing context
        this.boardCtx = this.board.getContext("2d");

        //Applying Styles
        this.applyStyles()

        //Keypress handling
        document.addEventListener("keydown", this.keyPressHandler)

        this.setHighScore()
        this.setup();
        this.genFood();

    }

    setup = () =>{
        //console.log("Setup")
        setTimeout(()=>{
            // console.log("Food:", this.foodX, this.foodY)
            // console.log("Head:", this.snake[0].x, this.snake[0].y)
            if (this.checkGameOver()){
                this.saveHighScore()
                this.displayGameOver() 
                this.setState({gameOver: true});
                
                return;
            }
            this.clearBoard();
            if( this.state.gameStarted ){
                this.moveSnake();
                this.drawFood();
            }
            
            this.drawSnake();

            this.setup();
        }, this.state.gameSpeed)
    }

    clearBoard = () =>{
        const { boardCtx, boardBackground, boardBorder } = this;
        const { width, height } = this.props;
        
        boardCtx.fillStyle = boardBackground;
        boardCtx.strokeStyle = boardBorder;
        boardCtx.lineWidth = 2;

        boardCtx.fillRect(0, 0, width, height);
        boardCtx.strokeRect(0, 0, width, height);
    }

    drawSnake = () =>{
        this.snake.forEach(this.drawSnakePart);
    }

    drawSnakePart = (part) =>{
        const { boardCtx, snakeColor, snakeBorder } = this;
        boardCtx.fillStyle = snakeColor;
        boardCtx.strokeStyle = snakeBorder;

        boardCtx.fillRect(part.x, part.y, this.props.pixelSize, this.props.pixelSize);
        boardCtx.strokeRect(part.x, part.y, this.props.pixelSize, this.props.pixelSize);
    }

    moveSnake = () =>{
        const head = {x: this.snake[0].x + this.vx, y: this.snake[0].y + this.vy};
        this.snake.unshift(head);

        const hasEaten = this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;

        if (hasEaten){
            this.setState( prevState =>{
                return {score: prevState.score + 10};
            })
            this.genFood()
        }else{
            this.snake.pop()
        }

        //this.snake.pop();

    }

    displayGameOver = () =>{
        const gameOver = document.querySelector(".snake-gameover");
        const newHighscore = document.querySelector(".new-highscore");

        gameOver.classList.toggle("d-none");
        gameOver.classList.toggle("d-flex");

        if (this.state.isNewHighscore){
            newHighscore.classList.toggle("d-none");
            newHighscore.classList.toggle("d-block");
        }
    }

    setHighScore = () =>{
        const curr = localStorage.getItem("snakeHighscore");

        if (curr){
            this.setState({highscore: parseInt(curr)})
        }
    }

    saveHighScore = () =>{
        const curr = localStorage.getItem("snakeHighscore");

        if (curr){
            if (this.state.score > parseInt(curr)){
                this.setState({isNewHighscore: true});
                localStorage.setItem("snakeHighscore", this.state.score)
            }
        }else{
            localStorage.setItem("snakeHighscore", this.state.score)
        }
    }

    checkGameOver = () =>{
        const { snake, board } = this;

        for (let i = 2; i < snake.length; i++){
            const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;

            if (hasCollided){
                return true;
            }


        }

        const leftWallHit = snake[0].x < 0;
        const rightWallHit = snake[0].x > board.width - this.props.pixelSize;
        const topWallHit = snake[0].y < 0;
        const bottomWallHit = snake[0].y > board.height - this.props.pixelSize;

        return leftWallHit || rightWallHit || topWallHit || bottomWallHit;
    }

    applyStyles = () =>{
        const snakeControl = document.querySelector('.snake-control');
        const snakeInfo = document.querySelector(".snake-info");
        const snakeGameover = document.querySelector('.snake-gameover');
        const { width, height } = this.props;

        snakeControl.style.top = `calc(50% + ${height}px)`;
        snakeControl.style.transform = `translate(-50%, calc(-50% - ${height / 2}px + ${snakeControl.offsetHeight / 2}px))` //Putting the div right underneath the canvas

        snakeInfo.style.width = `${width}px`;
        snakeInfo.style.top = `calc(50% - ${height / 2}px - ${snakeInfo.offsetHeight}px)`;
        snakeInfo.style.transform = `translate(-50%, 0%)`;

        snakeGameover.style.width = `${width / 2}px`
    }

    keyPressHandler = (e) =>{

        const {LEFT, RIGHT, UP, DOWN} = this.state.usingArrows ? this.controls.arrows : this.controls.wasd;
        

        const SPACE = 32;
        const E = 69;
        const H = 72;
        const C = 67;


        const goingUp = this.vy === -this.props.pixelSize;
        const goingDown = this.vy === this.props.pixelSize;
        const goingRight = this.vx === this.props.pixelSize;
        const goingLeft = this.vx === -this.props.pixelSize;

        const pressed = e.keyCode;

        if (pressed === SPACE){
            this.setState( prevState => {
                return {gameStarted: prevState.gameStarted ? false : true}
            });
        }

        if (pressed === LEFT  && !goingRight){
            this.vx = -this.props.pixelSize;
            this.vy = 0;
        }

        if (pressed === RIGHT && !goingLeft){
            this.vx = this.props.pixelSize;
            this.vy = 0;
        }

        if (pressed === UP  && !goingDown){
            this.vx = 0;
            this.vy = -this.props.pixelSize
        }

        if (pressed === DOWN && !goingUp){
            this.vx = 0;
            this.vy = this.props.pixelSize;
        }

        if (pressed === E){
            if (this.state.gameSpeed < 100){
                this.setState({gameSpeed: 100})
            }else{
                if (this.state.gameSpeed < 300){
                    this.setState( prevState =>{
                        return {gameSpeed: prevState.gameSpeed + 100}
                    })
                }
                
            }
            
        }

        if (pressed === H){
            if ((this.state.gameSpeed - 50) > 0){
                this.setState( prevState =>{
                    return {gameSpeed: prevState.gameSpeed - 50}
                })
            }else{
                if ((this.state.gameSpeed - 5) !== 0){
                    this.setState( prevState =>{
                        return {gameSpeed: prevState.gameSpeed - 5}
                    })
                }
            }
        }

        if (pressed === C){
            this.setState( prevState => {
                return {usingArrows: prevState.usingArrows ? false: true}
            })
        }
    }

    randomFood = (min, max) =>{
        return Math.round((Math.random() * (max - min) + min) / this.props.pixelSize) * this.props.pixelSize;
    }

    genFood = () =>{
        this.foodX = this.randomFood(0, this.board.width - this.props.pixelSize)
        this.foodY = this.randomFood(0, this.board.height - this.props.pixelSize)

        this.snake.forEach( part => {
            const hasEaten = part.x === this.foodX && part.y === this.foodY;

            if (hasEaten){
                this.genFood();
            }
        })
    }

    drawFood = () =>{
        const { boardCtx, foodColor, foodX, foodY } = this;

        boardCtx.fillStyle = foodColor;
        boardCtx.strokeStyle = foodColor;

        boardCtx.fillRect(foodX, foodY, this.props.pixelSize, this.props.pixelSize);
        boardCtx.strokeRect(foodX, foodY, this.props.pixelSize, this.props.pixelSize);
    }

    handlePlayAgain = () =>{
        //console.log("Play again clicked");
        this.displayGameOver();
        this.props.setId(this.props.id + 1);

        this.setState({score: 0})

        //console.log(`key: ${this.props.id}`);
    }

    render() {
        return (
            <section  className="snake" id="snake">
                <div className="snake-info">
                    <div className="length">
                        <h2 className="text-purple">Score: <span>{this.state.score}</span></h2>
                        
                    </div>

                    <div className="highscore">
                        <h2 className="text-purple">Highscore: <span>{this.state.highscore}</span></h2>
                    </div>
                </div>
                <canvas id="board" width={this.props.width} height={this.props.height}></canvas>
                <div className="snake-control">
                    {!this.state.gameStarted && (<h2 className="text-purple text-center mt-3 fs-5">press <span>SPACE BAR</span> to start</h2>)}
                    {this.state.gameStarted && (<h2 className="text-purple text-center mt-3 fs-5">press <span>SPACE BAR</span> to pause</h2>)}
                    <h2 className="text-purple text-center fs-5">Press <span>E/H</span> to decrease/increase difficulty</h2>
                    <h2 className="text-purple text-center fs-5">Press <span>C</span> to change to {this.state.usingArrows ? "WASD Keys" : "Arrow Keys"}</h2>
                </div>

                
                    <div className="snake-gameover d-none flex-column p-3">
                        <h2 className="text-light text-center fw-bold">Game Over :(</h2>
                        <h3 className="text-slate text-center">Score: <span>{this.state.score}</span></h3>
                        <h4 className="text-slate text-center d-none new-highscore">New Highscore!</h4>
                        <button className="snake-restart btn rounded rounded-pill fs-5" onClick={this.handlePlayAgain}>Play again ?</button>
                    </div>
                
            </section>
        );
    }
}

export default Snake;
