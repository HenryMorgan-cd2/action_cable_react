export function with_connection(channel_name, action) {
  return function(dispatch, getState){

    if (getState().connections[channel_name] == undefined) {
      dispatch({
        type: 'CONNECT_CHANNEL',
        payload: {
          channel_name,
          connection: createConnection({channel: channel_name, type: 'Products'}, dispatch)
        }
      })
    }

    const connection = getState().connections[channel_name];

    if (getState().connections[`${channel_name}_connected`] == false) {
      const wrapped_action = () => dispatch(action(connection, dispatch, getState))
      dispatch({type: 'REGISTER_CHANNEL_CONNECT_ACTION', payload: { channel_name, action: wrapped_action }})
    } else {
      return dispatch(action(connection, dispatch, getState))
    }
  }
}

export function createConnection(channel, dispatch) {
  const channel_name = (typeof channel == 'object')? channel.channel : channel
  const connected = () => { dispatch({type: 'CONNECTION_ESTABLISHED', payload: { channel_name }}) }
  const disconnected = () => { dispatch({type: 'CONNECTION_DROPPED', payload: { channel_name }}) }
  const received = (data) => { dispatch(data) }

  return App.cable.subscriptions.create(channel, {
    connected, disconnected, received
  });
}

export function action_cable_reducer(state={
  //  [channel_name]: SUBSCRIPTION_OBJECT
  // '[channel_name]_connected': false
  //  [channel_name]_on_connect_actions: []
}, action) {
  switch (action.type) {
    case 'CONNECT_CHANNEL':
      var { channel_name } = action.payload
      state = {...state}
      state[`${channel_name}`] = action.payload.connection
      state[`${channel_name}_connected`] = false
      state[`${channel_name}_on_connect_actions`] = []
      break;
    case 'CONNECTION_ESTABLISHED':
      var { channel_name } = action.payload
      state = {...state}
      state[`${channel_name}_connected`] = true
      break
    case 'CONNECTION_DROPPED':
      var { channel_name } = action.payload
      state = {...state}
      state[`${channel_name}_connected`] = false
      break
    case 'REGISTER_CHANNEL_CONNECT_ACTION':
      var { channel_name } = action.payload
      state = {...state}
      state[`${channel_name}_on_connect_actions`].push(action.payload.action)
      break
    case 'CHANNEL_CONNECTION_ACTIONS_RUN':
      var { channel_name } = action.payload
      state = {...state}
      state[`${channel_name}_on_connect_actions`] = []
      break
  }
  return state
}


export const action_cable_middleware = store => next => action => {
  let newState = next(action)
  if (action.type === 'CONNECTION_ESTABLISHED') {
    store.getState().connections[`${action.payload.channel_name}_on_connect_actions`].map((action) => store.dispatch(action))
    store.dispatch({type: 'CHANNEL_CONNECTION_ACTIONS_RUN', payload: { channel_name: action.payload.channel_name}})
  }
  return newState;
}
