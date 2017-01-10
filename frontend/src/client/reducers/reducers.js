import { combineReducers } from 'redux'
import { ADD_CONTACT, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions'

const { SHOW_ALL } = VisibilityFilters

const initialContacts = [
  {
    id: 1,
    name: "Hexmotive s.r.o.",
    phoneNumber: "775260051",
    email: "karel@tusek.cz",
    street: "Za mlýnem 1720",
    provider: 1,
    customer: 0
  },
  {
    id: 2,
    name: "Springtide Ventures s.r.o.",
    phoneNumber: "775260051",
    email: "karel@tusek.cz",
    street: "Za mlýnem 1720",
    provider: 0,
    customer: 2
  },
]

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function contacts(state = initialContacts, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return [
        ...state,
        {
          id: action.id,
          name: "Springtide Ventures s.r.o.",
          phoneNumber: "775260051",
          email: "karel@tusek.cz",
          street: "Za mlýnem 1720",
          provider: 0,
          customer: 2
        }
      ]
    default:
      return state
  }
}

const SANApp = combineReducers({
  visibilityFilter,
  contacts
})

export default SANApp
