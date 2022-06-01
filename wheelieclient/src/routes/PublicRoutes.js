import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Gear from '../views/Gear';
import Trails from '../views/Trails';
import Explore from '../views/Explore';

export default function PublicRoutes({ isLoggedIn, isAdmin, biker }) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
        <Route exact path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
        <Route exact path="/profile" element={isLoggedIn ? <Profile /> : <SignIn />} />
        <Route exact path="/trails" element={isLoggedIn ? <Trails biker={biker} /> : <SignIn />} />
        <Route exact path="/gear" element={isLoggedIn ? <Gear /> : <SignIn />} />
        <Route exact path="/explore" element={isLoggedIn ? <Explore /> : <SignIn />} />
      </Routes>
    </>
  )
}
