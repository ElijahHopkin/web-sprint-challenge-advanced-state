// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import {
  INPUT_CHANGE,
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, 
  SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER
} from './action-types'

const initialWheelState = 0
export function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      if(state <5) {
        return (state +1)
      }else{
        return (state=0)
      }
    case MOVE_COUNTERCLOCKWISE:
      if(state>0) {
        return (state -1)
      }else{
        return (state=5)
      }
    default:
      return state
  }
}

const initialQuizState = null
export function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload
    default:
      return state
  }
}

const initialSelectedAnswerState = null
export function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload
    default:
      return state
  }
}

const initialMessageState = ''
export function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state
  }
}

//form
const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
export function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      return ({
        ...state,
        [action.payload.id]: action.payload.value
      })
      case RESET_FORM:
        return initialFormState
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
