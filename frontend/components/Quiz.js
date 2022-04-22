import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchQuiz, selectAnswer, postAnswer} from '../state/action-creators'

function Quiz(props) {
  const {fetchQuiz, selectAnswer, postAnswer, quiz, selectedAnswer} = props
  console.log(quiz)
  
  const [disabled, setDisabled] = useState(true)
  
  useEffect(() => {
    fetchQuiz()
  }, [])

  useEffect(() => {
    disableHandler()
  }, [selectedAnswer])

  const answerChoice = (answer) => {
    selectAnswer(answer)
  }
  
  const disableHandler = () => {
    if(selectedAnswer){
      return setDisabled(false)
    } else{
      return disabled
    }
  }

  const onSubmit =(e) => {
    e.preventDefault()
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer.answer_id
    })
    fetchQuiz()
  }
 

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz.answers ? (
          <>
            <h2>{quiz.question}</h2>
                              
            <div id="quizAnswers">
              <div className= {`answer ${selectedAnswer?.answer_id===quiz.answers[0].answer_id? 'selected': ''}`}>
               {quiz.answers[0].text}
                <button onClick = {() => answerChoice(quiz.answers[0])}>
                  {selectedAnswer?.answer_id===quiz.answers[0].answer_id? 'SELECTED': 'Select'}
                </button>
              </div>

              <div className={`${selectedAnswer?.answer_id ===quiz.answers[1].answer_id? 'answer selected': 'answer'}`}>
              {quiz.answers[1].text}
                <button onClick = {() => answerChoice(quiz.answers[1])}>
                {selectedAnswer?.answer_id===quiz.answers[1].answer_id? 'SELECTED': 'Select'}
                </button>
              </div>
            </div>


            <button id="submitAnswerBtn" disabled = {disabled} onClick = {onSubmit}>Submit answer</button>
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
    selectedAnswer: state.selectedAnswer
  }
}

export default connect (mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)