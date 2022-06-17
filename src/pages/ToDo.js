import './ToDo.css';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/base';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { render } from 'react-dom';

function ToDo() {
  console.log(auth.currentUser);

  const router = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authentication = onAuthStateChanged(auth, (user) => {
      if (!user) router('/login')
      setIsLoading(false);
    });

    return authentication
  })
  //maybe use effect on is loading to re render and maybe just ask if isloading in return


  const handleSignOut = () => {
    signOut(auth).then(res => {
      router('/login')
    }).catch(err => console.log(err));
  }

  return (
    <>
      {auth.currentUser ? <h3>Hello {auth.currentUser.displayName}</h3> : null}
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
}

export default ToDo;