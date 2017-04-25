export function with_connection(channel_identifier, action) {
  let channel_name = null;
  if (typeof channel_identifier === 'object') {
    channel_name = do {
      let name = [];
      for (const key in channel_identifier) {
        const value = channel_identifier[key]
        name.push(`${key}:${value}`)
      }
      name.join('|')
    }
  } else {
    channel_name = channel_identifier
  }

  return function(dispatch, getState){

    if (getState().connections[channel_name] == undefined) {
      dispatch(registerChannel(channel_name, channel_identifier))
    }

    if (getState().connections[channel_name].connection == undefined) {
      dispatch({
        type: 'CONNECT_CHANNEL',
        payload: {
          channel_name,
          connection: createConnection(channel_name, getState().connections[channel_name].identifier, dispatch)
        }
      })
    }

    const connection = getState().connections[channel_name].connection;

    if (getState().connections[channel_name].connected == false) {
      const wrapped_action = () => dispatch(action(connection, dispatch, getState))
      dispatch({type: 'REGISTER_CHANNEL_CONNECT_ACTION', payload: { channel_name, action: wrapped_action }})
    } else {
      return dispatch(action(connection, dispatch, getState))
    }
  }
}

export function createConnection(channel_name, identifier, dispatch) {
  const connected = () => { dispatch({type: 'CONNECTION_ESTABLISHED', payload: { channel_name }}) }
  const disconnected = () => { dispatch({type: 'CONNECTION_DROPPED', payload: { channel_name }}) }
  const received = (data) => { dispatch(data) }

  return App.cable.subscriptions.create(identifier, {
    connected, disconnected, received
  });
}

export function setupConnection(connection_defaults) {
  return {
    middleware: action_cable_middleware,
    reducers: { connections: createReducer(connection_defaults) }
  }
}

function createReducer(connection_defaults) {

  //  [channel_name]: {
  //    identifier: channel_identifier
  //    connection: SUBSCRIPTION_OBJECT
  // '  connected': false
  //    on_connect_actions: []

  let initialState = {}
  for(const channel_name in connection_defaults) {
    initialState[channel_name] = {
      identifier: connection_defaults[channel_name]
    }
  }

  return function(state=initialState, action) {
    switch (action.type) {
      case 'REGISTER_CHANNEL_CONNECTION':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name] = {
          identifier: action.payload.identifier
        }
        break
      case 'CONNECT_CHANNEL':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name] = {...state[channel_name]}
        state[channel_name].connection = action.payload.connection
        state[channel_name].connected = false
        state[channel_name].on_connect_actions = []
        break;
      case 'CONNECTION_ESTABLISHED':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name].connected = true
        break
      case 'CONNECTION_DROPPED':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name].connected = false
        break
      case 'REGISTER_CHANNEL_CONNECT_ACTION':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name].on_connect_actions = [...state[channel_name].on_connect_actions, action.payload.action]
        break
      case 'CHANNEL_CONNECTION_ACTIONS_RUN':
        var { channel_name } = action.payload
        state = {...state}
        state[channel_name].on_connect_actions = []
        break
    }
    return state
  }
}



const action_cable_middleware = store => next => action => {
  let newState = next(action)
  if (action.type === 'CONNECTION_ESTABLISHED') {
    store.getState().connections[action.payload.channel_name].on_connect_actions.map((action) => store.dispatch(action))
    store.dispatch({type: 'CHANNEL_CONNECTION_ACTIONS_RUN', payload: { channel_name: action.payload.channel_name}})
  }
  return newState;
}


export function registerChannel(channel_name, identifier) {
  if (identifier['channel'] == undefined) {
    identifier['channel'] = channel_name
  }
  return {
    type: 'REGISTER_CHANNEL_CONNECTION',
    payload: {
      channel_name,
      identifier,
    }
  }
}
