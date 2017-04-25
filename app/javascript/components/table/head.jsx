import React from 'react'
import { connect } from "react-redux"

import { fetchColumns } from '../../actions/table/column_actions'

@connect((store) => {
  return {
    columns: store.columns.columns,
  }
})
export default class TableHead extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchColumns())

  }

  render() {
    const headings = this.props.columns.map(column => <th key={column}>{column}</th>)
    return (
      <thead>
        <tr>{headings}</tr>
      </thead>)
  }

}
