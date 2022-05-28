import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onLoginStatusChange } from "./api/authManager";
import PublicRoutes from "./routes/PublicRoutes";
// import { getBiker } from "./api/data/BikerData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         getBiker(user.uid).then((buyer) => {
    //             if (buyer.role === "admin") {
    //                 setIsAdmin(true);
    //             }
    //         });
    //     }
    // });
}, []);

  return (
    <>
      <PublicRoutes isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
