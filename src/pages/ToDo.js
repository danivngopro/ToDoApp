import "./ToDo.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase/base";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

function ToDo() {
  console.log(auth.currentUser);

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
    <div className="container">
      {!isLoading ? (
        <>
          <h3>Hello {auth.currentUser.displayName}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <div className="loadingContainer">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default ToDo;
