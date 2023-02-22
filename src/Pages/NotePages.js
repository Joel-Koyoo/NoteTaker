import React, { useEffect, useState } from "react";
// import notes from "../assets/data";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Arrowleft } from "../assets/arrowleft.svg";

const NotePage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let [note, setNotes] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    if (id === "new") return;
    let response = await fetch(`http://localhost:8000/notes/${id}`);
    let data = await response.json();
    console.log(data);
    setNotes(data);
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  let handleSubmit = () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
      console.log("works")
    } else if (id === "new" && note !== null) {
      createNote();
      console.log("works")
    }

    updateNote();
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <Arrowleft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      <textarea
        onChange={(e) => {
          setNotes({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
