import React from 'react'
import './GameBoard.css'
const getRandomCoordinate = ()=>{
    let min = 2;
    let max = 98;
    let x = Math.floor((Math.random() * (max) - min)/2)*2;
    let y = Math.floor((Math.random() * (max) - min)/2)*2;
    return [x,y];
}
class MainBoard extends React.Component {
    constructor(){
        super();
        this.state = {
            speed:55,
            food : getRandomCoordinate(),
            direction : "Right",
            SnakeDots : [
                [0,0],
                [2,0],
                [4,0]
            ]
        }
    }
    componentDidMount()
    {
        setInterval(this.MoveSnake,this.state.speed);
        document.onkeydown = this.onKeyDown
    }
    componentDidUpdate()
    {
        this.checkGameOver();
        this.CheckFoodEaten();
    }

    onKeyDown = (e)=>{
        e = e || window.event
        switch(e.key){
            case "ArrowUp":
                this.setState({direction:"Up"})
                break;
            case "ArrowDown":
                this.setState({direction:"Down"})
                break;
            case "ArrowRight":
                this.setState({direction:"Right"})
                break;
            case "ArrowLeft":
                this.setState({direction:"Left"})
                break;
            case "p":
                alert("Game is Paused Click Ok to Continue or Press Enter")
                break;
            case "P":
                alert("Game is Paused Click Ok to Continue or Press Enter")
                break;
            default:
                return ;
            
            }}

    MoveSnake = ()=>
    {
        let SnakeDot = [...this.state.SnakeDots];
        let head = SnakeDot[SnakeDot.length - 1];

        switch(this.state.direction){
            case "Right":
                head = [head[0] + 2,head[1]];
                break; 
            case "Left": 
                head = [head[0] - 2,head[1]];
                break;
            case "Up": 
                head = [head[0],head[1] - 2];
                break;
            case "Down":
                head = [head[0],head[1] + 2];
                break;
            default:
                return; 
        }
    SnakeDot.push(head);
    SnakeDot.shift();
    this.setState({SnakeDots:SnakeDot})
    }
    checkGameOver = ()=>{
        let head = this.state.SnakeDots[this.state.SnakeDots.length -1];
        if(head[0] > 100 || head[1] > 100 ||head[0] < 0 ||head[1] < 0){
            alert("Game Over");
            this.setState({
                speed:55,
                food : getRandomCoordinate(),
                direction : "Right",
                SnakeDots : [
                    [0,0],
                    [2,0],
                    [4,0]
                ]
            })
        }
    }
    CheckFoodEaten = ()=>{
        let head = this.state.SnakeDots[this.state.SnakeDots.length - 1];
        let food = this.state.food;
        if(head[0]===food[0] && head[1]===food[1]){
            this.setState({food:getRandomCoordinate()});
            let NewSnakeArr = [...this.state.SnakeDots];
            NewSnakeArr.unshift([]);
            this.setState({SnakeDots:NewSnakeArr});
        }
    }
    render() {
        const style = {
            left:`${this.state.food[0]}%`,
            top:`${this.state.food[1]}%`
        }
        return(    
    <div>
    <h1>Snake Game</h1>
    <div className="gameboard">
        <div className="game-area">
            <div>
                {this.state.SnakeDots.map((dot,i)=>{
                    const style = {
                        left:`${dot[0]}%`,
                        top:`${dot[1]}%`}
                return(
                    <div key={i} className='snake-dot' style={style}></div>
                )
                })}
            </div>
            <div className="snake-food" style={style}></div>
        </div>
    </div>
    </div>
        )
    }
}

export default MainBoard
