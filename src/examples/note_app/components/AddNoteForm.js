import React, { useState, useContext } from "react";
import NotesContext from "../context/notes-context";

const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { dispatch } = useContext(NotesContext);

  const addNote = (e) => {
    e.preventDefault();
    if (title) {
      //   setNotes([...notes, { title, body }]);
      dispatch({ type: "ADD_NOTE", title, body });
      setTitle("");
      setBody("");
    }
  };

  return (
    <form onSubmit={addNote}>
      <div className="form-group">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={(e) => setBody(e.target.value)}
          className="form-control"
          value={body}
        ></textarea>
      </div>
      <button className="btn btn-primary btn-block">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
