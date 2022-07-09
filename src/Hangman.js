import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words';

class Hangman extends Component
{
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props)
  {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
    this.handleWin = this.handleWin.bind(this)
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord()
  {
    console.log(this.state.answer)
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  handleWin()
  {
    let result = this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : false));
    return result.join("") === this.state.answer;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt)
  {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons()
  {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }
  restart()
  {
    this.setState({ nWrong: 0 })
    this.setState({ answer: randomWord() })
    this.setState({ guessed: new Set() })
  }
  /** render: render game */
  render()
  {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {this.props.images.length <= this.state.nWrong
          ?
          <div>
            <h1 className="Danger">Game Lost! </h1><button onClick={this.restart}>↪</button>
            <p className="Danger"> {this.state.nWrong} Wrong Guesses</p>
            <p className="Hangman-word Success">{this.state.answer}</p>
          </div>
          : (this.handleWin() ?
            <div>
              <h1 className="Hangman-word Success">Game Won! </h1><button onClick={this.restart}>↪</button>
              <p className="Danger"> {this.state.nWrong} Wrong Guesses</p>
              <p className="Hangman-word Success">{this.state.answer}</p>
            </div>
            :
            <div><img src={this.props.images[this.state.nWrong]} alt={`image${this.state.nWrong}`} />
              <p className="Danger"> {this.state.nWrong} Wrong Guesses</p>
              <p className='Hangman-word'>{this.guessedWord()}</p>
              <p className='Hangman-btns'>{this.generateButtons()}</p>
              <button onClick={this.restart}>↪</button>
            </div>
          )
        }


      </div>
    );
  }
}

export default Hangman;
