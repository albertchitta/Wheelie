import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Gear from '../views/Gear';
import AddBike from '../views/AddBike';
import EditBike from '../views/EditBike';
import Trails from '../views/Trails';
import CreateTrail from '../views/CreateTrail';
import EditTrail from '../views/EditTrail';
import Explore from '../views/Explore';

export default function PublicRoutes({ isLoggedIn, isAdmin, biker }) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home biker={biker} /> : <SignIn />} />
        <Route exact path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />

        <Route exact path="/trails" element={isLoggedIn ? <Trails biker={biker} /> : <SignIn />} />
        <Route exact path="/create-trail" element={isLoggedIn ? <CreateTrail /> : <SignIn />} />
        <Route exact path="/edit-trail/:firebaseUserId" element={isLoggedIn ? <EditTrail/> : <SignIn/>} />

        <Route exact path="/gear" element={isLoggedIn ? <Gear biker={biker} /> : <SignIn />} />
        <Route exact path="/add-bike" element={isLoggedIn ? <AddBike biker={biker} /> : <SignIn/>} />
        <Route exact path="/edit-bike/:bikeId" element={isLoggedIn ? <EditBike /> : <SignIn/>} />
        
        <Route exact path="/explore" element={isLoggedIn ? <Explore biker={biker} /> : <SignIn />} />
      </Routes>
    </>
  )
}
