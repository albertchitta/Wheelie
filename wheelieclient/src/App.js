import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onLoginStatusChange } from "./api/authManager";
import PublicRoutes from "./routes/PublicRoutes";
import { getBiker } from "./api/data/BikerData";
import { Spinner } from 'reactstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [biker, setBiker] = useState({});

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getBiker(user.uid).then((biker) => {
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
