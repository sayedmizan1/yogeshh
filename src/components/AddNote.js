import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
function AddNote() {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setnote] = useState({ title: "", content: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.content);
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            onChange={onChange}
          />
        </div>

        <button disabled={note.title.length < 5 || note.content.length<5} type="submit" onClick={handleclick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;
