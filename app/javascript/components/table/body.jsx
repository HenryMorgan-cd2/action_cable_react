import React from 'react'
import TableRow from './row'

export default class TableBody extends React.Component {

  render() {
    const rows = this.props.rows.map(row => <TableRow columns={this.props.columns} row={row} />)
    return (<tbody>{rows}</tbody>)
  }

}
