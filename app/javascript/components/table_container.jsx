import React from 'react'
import { Provider } from "react-redux"

import Table from './table'

import store from "../utils/table_store"

import { registerChannel } from 'utils/action_cable'

export default class TableContainer extends React.Component {

  constructor(props, context) {
    super(props, context)
    store.dispatch(registerChannel('TablesChannel', {id: this.props.table}))
    // store.dispatch({
    //   type: 'CONNECT_CHANNEL',
    //   payload: {
    //     channel_name: "TablesChannel",
    //     connection: createConnection({channel: 'TablesChannel', type: this.props.table}, store.dispatch)
    //   }
    // })
  }

  render() {
    return (
      <Provider store={store}>
        <Table />
      </Provider>
    )
    // return (
    //   <table>
    //     <TableHead columns={this.props.columns} />
    //     <TableBody columns={this.props.columns} rows={this.props.rows}/>
    //   </table>)
  }


}
