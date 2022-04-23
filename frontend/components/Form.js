import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const {postQuiz, inputChange, form} = props

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const {newFalseAnswer, newQuestion, newTrueAnswer} = props.form

    if(newFalseAnswer.trim().length>1 &&
     newQuestion.trim().length>1  &&
     newTrueAnswer.trim().length>1){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }, [props.form])

  const onChange = evt => {
    const {id, value} = evt.target
    inputChange(id, value)
  }

  const onSubmit = (evt) => {
      evt.preventDefault()
      postQuiz({
        question_text: form.newQuestion,
        true_answer_text: form.newTrueAnswer,
        false_answer_text: form.newFalseAnswer
      });
      
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
      maxLength={50} 
      onChange={onChange} 
      name = "newQuestion" 
      id="newQuestion" 
      value= {form.newQuestion} 
      placeholder="Enter question" 
      />
      <input 
      maxLength={50} 
      onChange={onChange} 
      name = "newTrueAnswer" 
      id="newTrueAnswer" 
      value= {form.newTrueAnswer} 
      placeholder="Enter true answer" 
      />
      <input 
      maxLength={50} 
      onChange={onChange} 
      name = "newFalseAnswer" 
      id="newFalseAnswer" 
      value= {form.newFalseAnswer} 
      placeholder="Enter false answer" 
      />
      <button 
      id="submitNewQuizBtn"
      disabled= {disabled}
      >Submit new quiz
      </button>
    </form>
  )
}

const mapStateToProps =state => {
  return{
    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
