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
 export function setMessage(message) { 
   return({type: SET_INFO_MESSAGE, payload: message})
 
 }
 export function inputChange(id, value) {
   return({ type: INPUT_CHANGE, payload: {id, value}})
  }
  export function setQuiz(quizData) { 
    return{type:SET_QUIZ_INTO_STATE, payload:(quizData)}
  }

export function selectAnswer(answer) {
  return{type: SET_SELECTED_ANSWER, payload: answer}
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
      dispatch(setQuiz(res.data))
    })
    .catch(err => {
      dispatch(console.log({err}))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
    .then(res => {
      dispatch({type:SET_INFO_MESSAGE, payload: res.data.message})
    })
    .catch(err => {
      dispatch({type:SET_INFO_MESSAGE, payload: 'What a shame! that was the incorrect answer'})
      console.log({err})
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
//form
export function postQuiz(newQuiz) {

  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', newQuiz )
    .then(res => {
      dispatch({type: SET_INFO_MESSAGE, payload:`Congrats: "${res.data.question}?" is a great question!`})
      dispatch({type:RESET_FORM})
      console.log(res)    
    })
    .catch(err => {
      console.log({err})
      dispatch({type:SET_INFO_MESSAGE, payload: err.response.data.message})
      dispatch(resetForm)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
