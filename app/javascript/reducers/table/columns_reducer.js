const initialState = {
  columns: [],
  fetching: false,
  fetched: false,
  error: null,
}

export default function reducer(state=initialState, action) {

    switch (action.type) {

      case "FETCH_COLUMNS": {
        return {...state, fetching: true}
      }
      case "FETCH_COLUMNS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_COLUMNS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          columns: action.payload.columns,
        }
      }

      case "HIDE_COLUMN": {
        throw new Error('Not Implemented')
      }
      case "SORT_COLUMN": {
        throw new Error('Not Implemented')
      }
      case "SHOW_COLUMN": {
        throw new Error('Not Implemented')
      }
    }
    return state
}
