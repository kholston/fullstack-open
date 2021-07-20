import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const filterValue = props.filter

  const handleChange = (event) => {
    const filterValue = event.target.value
    props.setFilter(filterValue)
  }

  const style = {
    marginBottom: 10
  }

  return(
    <div style={style}>
      filter <input onChange={handleChange} value={filterValue} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter