import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props.form)

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const {newFalseAnswer, newQuestion, newTrueAnswer} = props.form
    if(newFalseAnswer&& newQuestion && newTrueAnswer){
      setDisabled(!disabled)
    }
  }, [props.form])
  
  const {postQuiz, inputChange, resetForm, form} = props

  const onChange = evt => {
    const {name, value} = evt.target
    inputChange(name, value)
  }

  const onSubmit = evt => {
      evt.preventDefault()
      postQuiz();
      resetForm()
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value= {form.value} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value= {form.value} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value= {form.value} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn"disabled= {disabled}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
