import "./ToDo.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase/base";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "@mui/material/Button";
import ToDoList from '../components/ToDoList';

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
        <div className="todoList">
          <h1 className="mylistHeadline">My list</h1>
          <ToDoList className="listContent"/>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
