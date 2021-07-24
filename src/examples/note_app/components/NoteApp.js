import React, { useEffect, useReducer } from "react";
import NotesContext from "../context/notes-context";
import notesReducer from "../reducers/notes";
import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

const NoteApp = () => {
  //   const [notes, setNotes] = useState([]);
  // notes bilgisi ve dispatch metodu (ADD_NOTE, POPULATE_NOTE gibi) gelir
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("notes")) return;
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) {
      //   setNotes(notesData);
      dispatch({ type: "POPULATE_NOTES", notes: notesData });
    }
  }, []);

  useEffect(() => {
    // sadece notes üzerinde değişiklik olduğunda çalışır
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  return (
    <NotesContext.Provider value={{notes, dispatch}}>
      <div className="container p-5">
        <div className="card mb-3">
          <div className="card-header">Notes</div>
          {notes && (
            <table className="table table-sm table-striped mb-0">
              <tbody>
                {<NoteList />}
              </tbody>
            </table>
          )}
        </div>
        <div className="card mb-3">
          <div className="card-header">Add a New Note</div>
          <div className="card-body">
            <AddNoteForm />
          </div>
        </div>
      </div>
    </NotesContext.Provider>
  );
};

export default NoteApp;
