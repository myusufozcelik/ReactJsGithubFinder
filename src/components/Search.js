import React, { useContext, useState } from "react";
import AlertContext from "../context/alert/alertContext";
import GithubContext from "../context/github/githubContext";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const { searchUsers, clearUsers, users } = useContext(GithubContext); //searchUsers a erişebilmek için
  const { setAlert } = useContext(AlertContext);

  const onChange = (e) => {
    // metod içinde this özelliğini kaybettiği için yukarıda bind ettik
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault(); // yenilenmesini engelledik
    if (keyword === "") {
      // keyword yoksa
      setAlert("Please, enter a keyword.", "danger");
    } else {
      searchUsers(keyword); // propstan searchUsersa atadık
      setKeyword("");
    }
  };

  return (
    <div className="container my-3">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={keyword}
            onChange={onChange}
            className="form-control"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      {users.length > 0 && (
        <button
          onClick={clearUsers}
          className="btn btn-secondary btn-sm btn-block mt-2"
        >
          Clear Results
        </button>
      )}
    </div>
  );
};

export default Search;
