import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //add a note
  const addnote = async (title, content) => {
    // api call
    const response = await fetch(`${host}/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') ,
      },
      body: JSON.stringify({ title, content }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Get all note
  const getnotes = async () => {
    // api call
    const response = await fetch(`${host}/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') ,
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //delete a note
  const deletenote = async (id) => {
    //  api call
    const response = await fetch(`${host}/note/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') ,
      },
    });
    const json = await response.json();
    console.log(json);
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnote);
  };

  // edit a note
  const editnote = async (id, title, content) => {
    //api call
    const response = await fetch(`${host}/note/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') ,
      },
      body: JSON.stringify({ title, content }),
    });
    const json = response.json();
    console.log(json);
    //logic to edit note
    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].content = content;
        break;
      }
    }
    setNotes(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, editnote, setNotes, addnote, deletenote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
