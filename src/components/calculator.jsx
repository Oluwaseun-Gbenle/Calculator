import React, { Component } from 'react';
import './calculator.css'

class Results extends React.Component {
    constructor(props) {
      super(props);
     
    }
    render () {
     return ( 
    <div id="display">
         <div className="display-up">{this.props.up.replace(/[/]/g,'÷').replace(/\*/g,
  'x')}</div> 
         <div className="display-down">{this.props.down.replace(/[/]/g,'÷').replace(/\*/g,'x')}</div>
       </div>
  );
  }
  }
  class Keypads extends React.Component {
    constructor(props) {
      super(props);
     
      this.onClick = this.onClick.bind(this);
    }
    onClick (e) {
      this.props.onClick(e.target.dataset.value)
      
    }
    render () {
      return(
        <div className="btn">  
  <button id="open-bracket" data-value="(" onClick={this.onClick}>(</button>
  <button id="backspace" data-value="CE" onClick={this.onClick}>CE</button>
   <button id="close-bracket"data-value=")" onClick={this.onClick}>)</button>
   <button style={{backgroundColor:'#ac3939'}}  id="clear" data-value="C" onClick={this.onClick}>C</button><br/>
          
  <button id="seven" data-value="7" onClick={this.onClick}>7</button>
   <button id="eight" data-value="8" onClick={this.onClick}>8</button>
   <button id="nine" data-value="9" onClick={this.onClick}>9</button>
    <button id="multiply" data-value="*" onClick={this.onClick}>x</button><br/>
          
   <button id="four" data-value="4" onClick={this.onClick}>4</button>
  <button id="five" data-value="5" onClick={this.onClick}>5</button>
    <button id="six" data-value="6" onClick={this.onClick}>6</button>
   <button id="subtract" data-value="-" onClick=
     {this.onClick}>-</button><br/>
          
    <button id="one" data-value="1" onClick={this.onClick}>1</button>
   <button id="two" data-value="2" onClick={this.onClick}>2</button>
   <button id="three" data-value="3" onClick={this.onClick}>3</button>
   <button id="add" data-value="+" onClick={this.onClick}>+</button><br/>
          
     <button id="divide" data-value="/" onClick={this.onClick}>÷</button> 
   <button id="zero" data-value="0" onClick={this.onClick}>0</button>     
  <button id="decimal" data-value="." onClick=
    {this.onClick}>.</button>
  
  <button style={{backgroundColor:'#2a6715'}} id="equals" data-value="=" onClick={this.onClick}>=</button>     
          
  </div>
  );
  }
  }
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        up:'',
        down: '0'
      }
      this.handleClick = this.handleClick.bind(this);
      this.maxLength = 
        this.maxLength.bind(this);
    }
    maxLength () {
    let  timer = setTimeout (() => this.setState({down:'limit reached'}),100);
   return () => clearTimeout(timer);   
  }
    handleClick (btnClick) {
     switch (btnClick) {
      case 'C': 
         this.setState({
           up:'',
           down:'0'
         });
         break; 
         case 'CE':
         this.setState({
          up: '',
          down: this.state.down === '0'?  this.state.down:
     this.state.down.slice(0,-1) || '0' 
            });
         break;
          case '=':
         try {
           this.setState({
           up: this.state.down + '=',
        down: eval(this.state.down)  + ''    
           });
         }catch (e) {
            this.setState({
           up: this.state.down + '=',
           down: 'Error'
          });
         }
       break;
       case '.':
         if(this.state.down.slice(-1) !== '.') {
           this.setState({
           down:  this.state.down + btnClick
           })
         }
         break;
          case '*':
          case '/':
          case '+':
          case '-':
         if(this.state.down.slice(-1).search(/([\/\*\-\+])/g) !== -1) {
           this.setState({
           down:  this.state.down.slice(0,-1) + btnClick
           })
         } else {
           this.setState({
           down:  this.state.down + btnClick
           })
         }
         break;
         default:
         if (this.state.down.length > 15) {
           this.maxLength()
         } else {
         this.setState({
          down: this.state.down === '0'?          btnClick : this.state.down + btnClick 
         });
         }
         break;
     }
    }
    
    
    render () {
    return (
      <div id="container">
       <Results up={this.state.up}
                down={this.state.down}
         max={this.maxLength}/>
        <Keypads onClick={this.handleClick}/>
        
        
        
        </div>
  );
  }
  }
 
export default App;