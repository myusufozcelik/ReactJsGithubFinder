import React from "react";

const Repo = ({ repo }) => {
  return (
    <li className="list-group-item">
      <i className="fab fa-old-republic mr-2"></i>

      <a href={repo.html_url}>{repo.name}</a>
    </li>
  );
};

export default Repo;
