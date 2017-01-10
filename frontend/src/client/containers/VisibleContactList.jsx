import { connect } from 'react-redux'
import { VisibilityFilters } from '../actions'
import ContactList from '../components/ContactList'

const getVisibleContactList = (contacts, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return contacts
    case VisibilityFilters.SHOW_CUSTOMERS:
      return contacts.filter(c => c.customer)
    case VisibilityFilters.SHOW_PROVIDERS:
      return contacts.filter(c => c.provider)
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: getVisibleContactList(state.contacts, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const VisibleContactList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList)

export default VisibleContactList
