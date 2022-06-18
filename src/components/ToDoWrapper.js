import "./ToDoWrapper.css";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoWrapper({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditing = (todo, newTitle) => {
    console.log(1);
    if(isEditing) handleEdit(todo, newTitle);
    setIsEditing(!isEditing);
  }

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div className="todo">
      <div className="checkboxContainer">
        {todo.completed ? (
          <input type="checkbox"
            className="checkboxBtn"
            onClick={() => toggleComplete(todo)}
            defaultChecked
          />
        ) : (
          <input type="checkbox"
            className="checkboxBtn"
            onClick={() => toggleComplete(todo)}
          />
        )}
      </div>
      {!isEditing ? (
        <h1 className="text">{todo.title}</h1>
      ) : (
        <input
        className="inputText"
          style={{ textDecoration: todo.completed && "line-through" }}
          type="text"
          value={todo.title === "" ? newTitle : todo.title}
          onChange={handleChange}
        />
      )}
      <div>
        <button className="button-complete">
          <CheckCircleIcon id="i" />
        </button>
        <button
          className="button-edit"
          onClick={() => handleEditing(todo, newTitle)}
        >
          <EditIcon id="i" />
        </button>
        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
