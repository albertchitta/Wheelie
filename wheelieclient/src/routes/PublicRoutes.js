import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import EditBiker from '../views/EditBiker';
import Gear from '../views/Gear';
import AddBike from '../views/AddBike';
import EditBike from '../views/EditBike';
import AddClothing from '../views/AddClothing';
import EditClothing from '../views/EditClothing';
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

        <Route exact path="/edit-biker/:firebaseUserId" element={isLoggedIn ? <EditBiker biker={biker} /> : <SignIn />}/>

        <Route exact path="/gear" element={isLoggedIn ? <Gear biker={biker} /> : <SignIn />} />
        <Route exact path="/add-bike" element={isLoggedIn ? <AddBike biker={biker} /> : <SignIn/>} />
        <Route exact path="/edit-bike/:bikeId" element={isLoggedIn ? <EditBike /> : <SignIn/>} />
        <Route exact path="/add-clothing" element={isLoggedIn ? <AddClothing biker={biker} /> : <SignIn />} />
        <Route exact path="/edit-clothing/:clothingId" element={isLoggedIn ? <EditClothing /> : <SignIn/>} />

        <Route exact path="/trails" element={isLoggedIn ? <Trails biker={biker} /> : <SignIn />} />
        <Route exact path="/create-trail" element={isLoggedIn ? <CreateTrail /> : <SignIn />} />
        <Route exact path="/edit-trail/:userId" element={isLoggedIn ? <EditTrail/> : <SignIn/>} />
        
        <Route exact path="/explore" element={isLoggedIn ? <Explore biker={biker} /> : <SignIn />} />
      </Routes>
    </>
  )
}
