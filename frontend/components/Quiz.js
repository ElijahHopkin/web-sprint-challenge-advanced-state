import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchQuiz, selectAnswer} from '../state/action-creators'

function Quiz(props) {
  const {fetchQuiz, selectAnswer, quiz, selectedAnswer} = props
  console.log(quiz)
  
  const [disabled, setDisabled] = useState(true)
  
  useEffect(() => {
    fetchQuiz()
  }, [])

  const answerChoice = (quiz_id, answer_id) => {
    selectAnswer(quiz_id, answer_id)
    if(selectedAnswer){
      return setDisabled(!disabled)
    } else{
      return disabled
    }
  }

 

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz.answers ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
               {/* {answers[0]} */}
                <button onClick = {answerChoice}>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              {/* {quiz.answers[1].text} */}
                <button onClick = {answerChoice}>
                  Select
                </button>
              </div>
            </div>


            { quiz.answers.map(answer =>{
              return(<span>{answer.text}</span>)
            })}

            <button id="submitAnswerBtn" disabled = {disabled}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  // console.log(state)
  return{
    quiz: state.quiz,
    selectedAnswer: state.selectAnswer
  }
}

export default connect (mapStateToProps, {fetchQuiz, selectAnswer})(Quiz)