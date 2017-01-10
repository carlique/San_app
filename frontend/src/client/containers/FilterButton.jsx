import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import {Button} from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default FilterButton
