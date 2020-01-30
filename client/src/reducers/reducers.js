let initialState = {
    restaurants: [],
    loading: false,
    error: null
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: null
        };
      case "FETCH_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          restaurants: action.restaurant
        };
      case "FETCH_DATA_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          restaurants: []
        };
      default:
        return state;
    }
  }
  
  export default reducer;
  