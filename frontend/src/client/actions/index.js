/*
 * Action types
 */

export const ADD_CONTACT = 'ADD_CONTACT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST'
const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE'
const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS'

/*
 * Other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PROVIDERS: 'SHOW_PROVIDERS',
  SHOW_CUSTOMERS: 'SHOW_CUSTOMERS'
}

/*
 * Action creators
 */

export const addContact = () => {
  return {
    type: ADD_CONTACT
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const fetchContacts = (id) => {
  return {
    type: FETCH_CONTACTS_REQUEST,
    id: id
  }
}

export const fetchContactsFailure = (error) => {
  return {
      type: FETCH_CONTACTS_FAILURE,
      error: error
    }
}

export const fetchContactsSuccess = (response) => {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    response: response
  }
}
