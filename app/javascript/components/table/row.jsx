import React from 'react'

export default class TableRow extends React.Component {

  render() {
    const { row } = this.props
    const columns = this.props.columns.map(column => <td>{column}{row}</td>)
    return (<tr>{columns}</tr>)
  }

}
