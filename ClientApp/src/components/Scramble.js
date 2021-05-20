import React, { Component } from 'react';

export class Scramble extends Component {
    static displayName = Scramble.name;

    constructor(props) {
        super(props);
        this.state = { wordToScramble: "", loading: false, unscrambled: true }
        this.submitScramble = this.submitScramble.bind(this);
    }

    submitScramble() {
        let wordToScramble = document.getElementById("wordToScramble").value
        console.log(wordToScramble)
        this.setState({
            wordToScramble: wordToScramble,
            loading: true
        })
        this.fetchScrambledWord(wordToScramble);
    }

    async fetchScrambledWord(wordToScramble) {
        const response = await fetch('scramble/' + wordToScramble);
        const data = await response.text();
        this.setState({ wordToScramble: data, loading: false, unscrambled: false})
    }

    static renderScrambledWord(scrambledWord) {
        return (
            <div>{scrambledWord}</div>
        )
    }

    render() {
        let contents = 
        <div>
            <input type="text" id="wordToScramble" />
            <button type="button" onClick={this.submitScramble}>Scramble</button>
        </div>
        if (this.state.loading) {
            contents = <p><em>Loading...</em></p>
        }
        else if (!this.state.unscrambled) {
            contents = Scramble.renderScrambledWord(this.state.wordToScramble)
        }
        return (
            <div>
                Please type the world to scramble and click "Scramble"
                {contents}
            </div>
        )
    }
}