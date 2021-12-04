import React from 'react'
import './App.css';
import Book from './components/Book'
import Authors from './components/Authors'
import Singup from './components/Singup'
import Login from './components/Login'
import User from './profile/User';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {


  return (
    <BrowserRouter>
    <div className="App App-header">
      <header></header>
      <ul>
        <li>
          <Link to="/">Book</Link>
        </li>
        <li>
          <Link to={
            {
              pathname: "/Authors",
              state: {from:'here'}
            }
          }>Authors</Link>
        </li>
        <li>
          <Link to={
            {
              pathname: "/Singup",
              state: {from:'here'}
            }
          }>Singup</Link>
        </li>
          <li>
          <Link to={
            {
              pathname: "/Login",
              state: {from:'here'}
            }
          }>Login</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/Authors" element={<Authors />} />
        <Route path="/Singup" element={<Singup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}
