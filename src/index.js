import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SAMPLES from './samples';
import styled from 'styled-components';

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Bangers|Orbitron|VT323');
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr 50px;
  grid-template-areas:
  "header"
  "content"
  "footer";
  align-items: center;
  justify-items: center;
  z-index: 1;
  position: relative;
  ::before{
    content: "";
    height: 100%;
    width: 100%;
    background: url("https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
    position: absolute;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    z-index: -5;
    opacity: .9;
  }
  h1 {
    grid-area: header;
    margin-top: 2rem;
    font-size: 3.5rem;
    text-shadow: 1px 1px 3px white;
    text-align: center;
  }
`
const DrumMachine = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 1fr 1fr 1fr;
  grid-gap: 1px;
  padding: .2rem .1rem;
  border-radius: 10px;
  border: 3px silver solid;
  background-color: #85754e;
  box-shadow: 5px 5px 20px rgba(0,0,0,.9);
  min-width: 300px;
`
const Display = styled.div` 
  font-family: 'Orbitron',monospace;
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #8fd400cc;
  grid-column: 1/4;
  box-shadow: 5px 5px 5px rgba(0,0,0,.4);
  border-radius: 7px;
  border: 1px grey solid;
`
const Pad = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 2.2rem;
  background-color: #888;
  color: #ddd;
  text-shadow: 0px 1px 2px #88888855;
  transition: background-color, box-shadow, transform .2s;
  box-shadow: ${props => props.trigered ? "inset 0 0 15px rgba(0,0,0,.5)" :  "2px 2px 5px rgba(0,0,0,.7)"};
  transform: ${props => props.trigered ? "scale(.99)" : null};
  border-radius: 4px;
  border: 1px #555 solid;
  &:hover{cursor: pointer;}
  > audio {
    border: 3px red solid;
  }
`
const Footer = styled.footer`
  grid-area: footer;
  width: 100%;
  background-color: #333333dd;
  color: #fff;
  text-align: right;
  padding: 1rem;
  a{
    text-decoration: none;
    color: deeppink;
  }
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trigeredSample: {},
      currentDisplay: "Press Q"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.setTrigeredSample = this.setTrigeredSample.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keyup', this.handleKeyUp)
  }
  setTrigeredSample(sample){  
    if(sample){
      const audioElem = this.refs[sample.letter];
      audioElem.currentTime = 0;
      audioElem.play();
      this.setState({
        trigeredSample: sample,
        currentDisplay: sample.type
      })
      // wait before reset css effect

    }
  }
  handleClick(sample){
    this.setTrigeredSample(sample);
  }
  handleKeydown(event){
    const sample = SAMPLES.filter(sample => sample.letter === event.key.toUpperCase())[0];
    this.setTrigeredSample(sample);
  }
  handleKeyUp(){
    this.setState({trigeredSample: {}})
  }
  render() {
    const renderPads = SAMPLES.map(
      sample => 
        <Pad
        className="drum-pad"
        id={sample.letter} 
        key={sample.type}
        onMouseDown={() => this.handleClick(sample)}
        onMouseUp={this.handleKeyUp}
        trigered={this.state.trigeredSample.letter === sample.letter}>
          {sample.letter}
          <audio src={sample.src} type="audio/wav" ref={sample.letter} className="clip" id={sample.letter}/>
        </Pad>)

    return (
        <Wrapper>
          <h1>Drum Machine</h1>   
          <DrumMachine id="drum-machine">
            <Display id="display">{this.state.currentDisplay}</Display>
            { renderPads }
          </DrumMachine>
          <Footer>Created by <a href="https://logikdev.fr" target="_blank">LogikDev</a></Footer>
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('root'));