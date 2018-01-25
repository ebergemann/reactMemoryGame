import React, { Component } from 'react';
import './App.css';

let squareObj = () => {
  return {
  systemSelected: false,
  userSelected: false
};
}

const styleBtn = {
  width: '75px',
  height: '75px'
  }

function generateSquares() {
  let outArr = [];
  for (let i = 0; i < 12; i ++){
    outArr.push(squareObj());
  }
  return outArr;
}

function getButtonColor(userSelected, systemSelected, currentState) {
  //console.log("Inside getButtonColor: " + userSelected +", "+ systemSelected +", "+ currentState);
  if (currentState === 'memorize') {
    return systemSelected ? 'blue' : 'LightGray';
  } else if (currentState === 'check') {
    if (userSelected && systemSelected) {
      return 'green';
    } else if (!userSelected && systemSelected){
      return 'yellow';
    } else if (userSelected && !systemSelected) {
      return 'red'
    } else { return 'LightGray'}
  } else {return 'LightGray'}
}

class App extends Component {
  
  constructor (props){
    super(props);
    this.state = {
      currentBoardState: 'uninitialized',
      squares: generateSquares()
    };




    this.initializeBoard = this.initializeBoard.bind(this);
    this.renderBoardbutton = this.renderBoardbutton.bind(this);
    this.updateUserClick = this.updateUserClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.changeGameState = this.changeGameState.bind(this);
    this.randomizeSystemSquares = this.randomizeSystemSquares.bind(this);
    this.displayBoardForMemorize = this.displayBoardForMemorize.bind(this);
    this.displayBoardForGuessing = this.displayBoardForGuessing.bind(this);
    this.displayBoardForCheck = this.displayBoardForCheck.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    
  }

  componentWillMount() {
    this.initialState = this.state
  }

  randomizeSystemSquares (){
    console.log("Inside randomize System Squares")
    let newSquares = this.state.squares.slice();
    let systemSquareSelected = 0;
    while (systemSquareSelected < 4){
      let pos = Math.floor(Math.random()*12);
      if (!newSquares[pos].systemSelected){
        newSquares[pos].systemSelected = true;
        systemSquareSelected += 1;
      }
    }
    this.setState({squares: newSquares});
  }

  changeGameState(){
    console.log("Inside change Game state: " + this.state.currentBoardState)
    let newState = ''; 
    switch (this.state.currentBoardState) {
      case 'uninitialized':
        newState = 'unrevealed';
        break;
      case 'unrevealed':
        newState = 'memorize';
        break;
      case 'memorize':
        newState = 'guessing';
        break;
      case 'guessing':
        newState = 'check';
        break;
      case 'check':
        newState = 'unrevealed';
        break;
    }
    console.log("outside switch. newState: " + newState)
    this.setState({currentBoardState: newState});
  }

  updateUserClick(e) {
    let pos = e.target.id;
    let newSquares = this.state.squares.slice();
    newSquares[pos].userSelected = newSquares[pos].userSelected ? false : true;
    this.setState({squares: newSquares}); 
  }

  displayBoardForCheck() {
    this.setState({currentBoardState: 'check'});
  }

  displayBoardForGuessing() {
    this.setState({currentBoardState: 'guessing'});
    setTimeout(this.displayBoardForCheck, 3000);
  }

  displayBoardForMemorize() {
    console.log("Inside DisplayBoardFor Memorize");
    this.setState({currentBoardState: 'memorize'});
    setTimeout(this.displayBoardForGuessing, 100);

    
  }

  initializeBoard() {
    
    let newSquares = this.state.squares.slice();
    let systemSquareSelected = 0;
    while (systemSquareSelected < 4){
      let pos = Math.floor(Math.random()*12);
      if (!newSquares[pos].systemSelected){
        newSquares[pos].systemSelected = true;
        systemSquareSelected += 1;
      }
    }
    let newState = 'unrevealed';
    this.setState({currentBoardState: newState, squares: newSquares});
  }
  
  newGame() {
    this.initializeBoard();

    console.log("after Initialize Board");
    setTimeout(this.displayBoardForMemorize, 3000);
    //setTimeout(this.changeGameState, 500);
    //setTimeout(this.displayBoardForMemorize, 3000);
    console.log("after next set state");
    //setTimeout(this.changeGameState, 5000);
  }

  resetBoard() {
    this.setState(this.initialState);
    this.newGame();
  }






  renderBoardbutton(i) {
    return <BoardButton id={i} userSelected={this.state.squares[i].userSelected} 
          systemSelected={this.state.squares[i].systemSelected} 
          currentBoardState={this.state.currentBoardState}
          onCheck={this.updateUserClick} />;
 }
  
  render() {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <div className="board-state">
          <div className="board-row">
          {this.renderBoardbutton(0)}
          {this.renderBoardbutton(1)}
          {this.renderBoardbutton(2)}
          {this.renderBoardbutton(3)}
          </div>
          <div className="board-row">
          {this.renderBoardbutton(4)}
          {this.renderBoardbutton(5)}
          {this.renderBoardbutton(6)}
          {this.renderBoardbutton(7)}
          </div>
          <div className="board-row">
          {this.renderBoardbutton(8)}
          {this.renderBoardbutton(9)}
          {this.renderBoardbutton(10)}
          {this.renderBoardbutton(11)}
          </div>
        </div>
        <div className="footer-area">
        {this.state.currentBoardState === 'uninitialized' &&
            <div><button className="footer-btn" onClick={this.newGame}>New Game</button></div>}
        {this.state.currentBoardState === 'unrevealed' &&
            <h3>Get ready to memorize cells in 3 Seconds</h3>}
        {this.state.currentBoardState === 'guessing' &&
            <h3>Guess the correct cells!</h3>}
        {this.state.currentBoardState === 'check' &&
        <div><button className="footer-btn" onClick={this.resetBoard}>Try Again</button></div>}
        </div>

      </div>
    )
  }

}

function BoardButton(props) {
  
  
  return(
      <button id={props.id} style={{...styleBtn, backgroundColor: getButtonColor(props.userSelected, props.systemSelected, props.currentBoardState)}} onClick={props.onCheck}>
         </button>
    )
}




export default App;
