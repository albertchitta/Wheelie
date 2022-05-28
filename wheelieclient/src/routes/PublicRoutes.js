import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';

export default function PublicRoutes({ isLoggedIn, isAdmin }) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
        <Route exact path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
      </Routes>
    </>
  )
}
