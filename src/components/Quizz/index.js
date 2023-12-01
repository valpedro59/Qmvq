import React, { Component } from 'react';
import {QuizMarvel} from '../QaA';
import Levels from '../Levels';
import ProgessBar from '../Progress';

class Quizz extends Component {
    state = {
        levelNames: ["beginner", "intermediate", "advanced"],
        quizzlevel: 0,
        maxQuestions : 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled : true,
        userAnswer: null
    }

    loadQuestions = level => { 
        const fetchedArrayQuizz = QuizMarvel[0].quizz[level];
        console.log(fetchedArrayQuizz);
        if (fetchedArrayQuizz.length >= this.state.maxQuestions) {

            const newArray = fetchedArrayQuizz.map( ({answer, ...keepRest}) => keepRest);

            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log('No more questions');
        }
        }

    componentDidMount() { 
        this.loadQuestions(this.state.levelNames[this.state.quizzlevel])
     }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    render() {
        const { pseudo } = this.props.userData;
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p 
                    key={index} 
                    className= {`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}
                    onClick={() => this.submitAnswer(option)}

                >
                    {option}
                </p>
            )
        })
        return (
            <div>
                <Levels />
                <ProgessBar />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button disabled= {this.state.btnDisabled} className='btnSubmit'>Next</button>
            </div>
        );
    }
}

export default Quizz;