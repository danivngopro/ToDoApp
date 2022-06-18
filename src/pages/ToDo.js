import "./ToDo.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase/base";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "@mui/material/Button";
import ToDoListAdd from "../components/ToDoListAdd";
import TodoWrapper from "../components/ToDoWrapper";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/base";

function ToDo() {
  const router = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authentication = onAuthStateChanged(auth, (user) => {
      if (!user) router("/login");
      setIsLoading(false);
    });

    return authentication;
  });

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        router("/login");
      })
      .catch((err) => console.log(err));
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const q = query(collection(db, auth.currentUser.email));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
      });
      return () => unsub();
    }
  }, [isLoading]);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, auth.currentUser.email, todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, auth.currentUser.email, todo.id), {
      completed: !todo.completed,
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, auth.currentUser.email, id));
  };

  return (
    <div>
      <div className="container">
        {!isLoading ? (
          <div className="welcomeDiv">
            <h3>Hello {auth.currentUser.displayName}</h3>
            <Button
              variant="outlined"
              color="error"
              className="signOutBtn"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="loadingContainer">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div className="body">
        <div className="ToDoListAdd">
          <h1 className="mylistHeadline">My list</h1>
          <div className="ToDoListAddContainer">
            <ToDoListAdd />
          </div>
          <div className="todo_container">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoWrapper
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))
            ) : (
              <div className="loadingContainer">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
