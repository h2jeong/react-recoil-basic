import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { noteList } from "../../store/notes";

const List = ({ history }) => {
  const notes = useRecoilValueLoadable(noteList);
  
  const onCreate = () => {
    history.push("/create");
  };
  console.log('notes:', notes)
  return (
    <div>
      <h3>
        Notes <button onClick={onCreate}>+ CREATE</button>
      </h3>
      {notes.state === "loading" ? (
        <p>loading...</p>
      ) : notes.contents.length === 0 ? (
        <p>You have not added any notes yet.</p>
      ) : (
        <ul>
          {notes.contents &&
            notes.contents.map((n) => <li key={n.id}>{n.text}</li>)}
        </ul>
      )}
    </div>
  );
};

export default List;
