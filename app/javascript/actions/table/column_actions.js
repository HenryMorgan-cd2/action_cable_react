import { with_connection } from 'utils/action_cable'

export function fetchColumns() {
  // return with_connection({channel: 'TablesChannel', id: 2}, (connection, dispatch, getStore) => {
  return with_connection('TablesChannel', (connection, dispatch, getStore) => {
    connection.perform('get_columns')
    return {
      type: 'FETCH_COLUMNS'
    }
  });
}
  // function(dispatch, getState) {
  //
  //   const act = () => {
  //   }
  //
  //   if (getState().columns.connected) {
  //     act()
  //   } else {
  //     console.log("PUSHING TODO")
  //     getState().columns.on_connected_actions.push(act)
  //   }

  // }
