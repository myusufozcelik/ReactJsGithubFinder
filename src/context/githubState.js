import axios from 'axios';
import React, { useReducer } from "react";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";

const GithubState = (props) => {
  const initialState = {
    // başlangıçtaki değerleri tanımlayalım
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = (keyword) => {
    setLoading(); // setLoading(true) yazmamıza gerek yok reducer da hallettik
    setTimeout(() => {
      axios
        .get(`https://api.github.com/search/users?q=${keyword}`)
        .then((res) => {
          dispatch({ type: "SEARCH_USERS", payload: res.data.items });
        });
    });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const { users, user, repos, loading } = state;
  return (
    <GithubContext.Provider
      value={{ users, user, repos, loading, searchUsers }} // users: users yazmaya gerek yok
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
