import { useState, useEffect } from "react";
import { onLoginStatusChange } from "./api/authManager";
import PublicRoutes from "./routes/PublicRoutes";
import { getBiker } from "./api/data/BikerData";
import { Spinner } from 'reactstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [biker, setBiker] = useState({});

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);

    firebase.auth().onAuthStateChanged((authed) => {
      console.warn(authed);
      if (authed) {
        getBiker(authed.uid).then((biker) => {
          console.warn(biker);
          if (biker.role === "admin") {
            setIsAdmin(true);
          }

          setBiker(biker);
        });
      }
    });
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <>
      <PublicRoutes isLoggedIn={isLoggedIn} isAdmin={isAdmin} biker={biker} />
    </>
  );
}

export default App;
