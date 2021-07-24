import React, { useContext, useState } from "react";
import GithubContext from "../context/githubContext";

const Search = ({ setAlert, showClearButton, clearUsers }) => {
  const [keyword, setKeyword] = useState("");

  const githubContext = useContext(GithubContext); //searchUsers a erişebilmek için

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
      githubContext.searchUsers(keyword); // propstan searchUsersa atadık
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
      {showClearButton && (
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
