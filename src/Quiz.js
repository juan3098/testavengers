import React, { Component } from 'react'
import {QuizData} from './QuizData'
import './estilos.css'


export class test extends Component {


constructor(props) {
    super(props)

    this.state = {
         userAnswer: null,
         currentIndex: 0,
         options: [],
         quizEnd: false,
         score: 0,
         disabled: true
    }
}

loadQuiz = () => {
    const {currentIndex} = this.state; 
    this.setState (() => {
        return {
            question: QuizData[currentIndex].question,
            options: QuizData[currentIndex].options,
            answer: QuizData[currentIndex].answer
        }

    })
}
  
nextQuestion = () => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer){
        this.setState ({
            score: score + 1 
        })
    }
    
    this.setState ({
        currentIndex: this.state.currentIndex + 1,
        userAnswer: null
    }

    )
}

componentDidMount(){
    this.loadQuiz();
}

check = answer => {
    this.setState({
        userAnswer: answer,
        disabled: false
    })

}

componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex != prevState.currentIndex) {
        this.setState (() => {
        return {
            question: QuizData[currentIndex].question,
            options: QuizData[currentIndex].options,
            answer: QuizData[currentIndex].answer
        }

    });
}

    }

finishHandler =() => {
    if(this.state.currentIndex === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    }

}


render() {
    const{question, options, currentIndex, userAnswer, quizEnd} = this.state
    if(quizEnd){

        return (
            <div>
                <h1>Cuestionario acabado, tu puntuación {this.state.score} acertados</h1>
                <p>Respuestas correctas</p>
                <ul>
                    {QuizData.map((item, index)  =>(
                        <li className= 'options'
                        key={index}>
                            {item.answer}
                        </li>
                    ))}


                </ul>


            </div>
        )
    } 
    
    
    
    return (
            <div>
                <h2>{question}</h2>
                <span>{`PREGUNTA NUMERO ${currentIndex + 1} DE ${QuizData.length}`}</span>
                {
                    options.map(option =>

                        <p key = {option.id} className={`options ${userAnswer === option? "selected" : null}`}
                        onClick = {() => this.check(option)}
                        >
                            {option}
                        </p>
                        )
                }

                {currentIndex < QuizData.length - 1 &&
    
               <button disabled = {this.state.disabled} onClick={this.nextQuestion}>
                   Siguiente pregunta
              </button>}
              {currentIndex === QuizData.length-1 && 
              <button onClick={this.finishHandler} disabled = {this.state.disabled}>
                       
                       Cuestionario terminado
                
                  </button>} 

            </div>
        )
    }
}



export default test

