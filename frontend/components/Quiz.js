import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchQuiz, selectAnswer, postAnswer, setMessage} from '../state/action-creators'


  const randomId = Math.floor(Math.random()*2)
  const answer2Id = Math.abs(randomId - 1)


function Quiz(props) {
  const {fetchQuiz, selectAnswer, postAnswer, setMessage, quiz, selectedAnswer} = props
  
  const [disabled, setDisabled] = useState(true)
  
  useEffect(() => {
    if(!quiz){
      fetchQuiz()

    }

  }, [])
  console.log(quiz)


  useEffect(() => {
    disableHandler()
  }, [selectedAnswer])

  const answerChoice = (answer) => {
    selectAnswer(answer)
    setMessage('')
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
  
  
// console.log(props)
  

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
                              
            <div id="quizAnswers">
              <div className= {`answer ${selectedAnswer?.answer_id===quiz.answers[randomId].answer_id? 'selected': ''}`}>
               {quiz.answers[randomId].text}
                <button onClick = {() => answerChoice(quiz.answers[randomId])}>
                  {selectedAnswer?.answer_id===quiz.answers[randomId].answer_id? 'SELECTED': 'Select'}
                </button>
              </div>

              <div className={`${selectedAnswer?.answer_id ===quiz.answers[answer2Id].answer_id? 'answer selected': 'answer'}`}>
              {quiz.answers[answer2Id].text}
                <button onClick = {() => answerChoice(quiz.answers[answer2Id])}>
                {selectedAnswer?.answer_id===quiz.answers[answer2Id].answer_id? 'SELECTED': 'Select'}
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
    selectedAnswer: state.selectedAnswer,
  }
}

export default connect (mapStateToProps, {fetchQuiz, selectAnswer, postAnswer,setMessage})(Quiz)