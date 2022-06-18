import "./ToDoListAdd.css";
import * as React from "react";
import { db } from "../firebase/base";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/base";

export default function ToDoListAdd() {
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, auth.currentUser.email), {
        title,
        completed: false,
      });
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputNbtnContainer">
        <input
          className="input_container"
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="btn_container">
          <button>Add</button>
        </div>
      </div>
    </form>
  );
}
