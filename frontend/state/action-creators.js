import axios from 'axios'
import {
  INPUT_CHANGE,
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, 
  SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER
} from './action-types'
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return({type: MOVE_CLOCKWISE})
}

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(quiz_id, answer_id) {
  return({type: SET_SELECTED_ANSWER, payload: {quiz_id, answer_id}})
 }

export function setMessage(message) { 
  return({type: SET_INFO_MESSAGE, payload: message})

}

export function setQuiz() { }

//form
export function inputChange(name, value) {
  return({ type: INPUT_CHANGE, payload: {name, value}})
 }
//form
export function resetForm() { 
  return({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      console.log(res)
      dispatch({type:SET_QUIZ_INTO_STATE, payload: res.data})
    })
    .catch(err => {
      dispatch(console.log({err}))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
//form
export function postQuiz() {
  return function (dispatch) {
    const newQuiz = {
      question_text: '' ,
      true_answer_text: '',
      false_answer_text: ''
    }
    axios.post('http://localhost:9000/api/quiz/answer', newQuiz)
    .then(res => {
      debugger    
    })
    .catch(err => {
      dispatch({type:SET_INFO_MESSAGE, payload: err.response.data.message})
      dispatch({type:RESET_FORM})
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
