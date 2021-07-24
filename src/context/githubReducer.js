const githubReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_USERS":
      return {
        ...state,
        users: action.payload, //servisten dönen bilgilere payload denir
        loading: false,
      };
    case "SET_LOADİNG":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;