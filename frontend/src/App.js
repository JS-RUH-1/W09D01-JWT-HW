import "./App.css";
import AuthorsPage from "./components/AuthorsPage";
import BooksPage from "./components/BooksPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import AddAuthor from "./components/AddAuthor";
import EditAuthor from "./components/EditAuthor";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/AuthorsPage" element={<AuthorsPage />}></Route>
          <Route path="/BooksPage" element={<BooksPage />}></Route>
          <Route path="/AddBook" element={<AddBook />}></Route>
          <Route path="/EditBook/:id" element={<EditBook />}></Route>
          <Route path="/AddAuthor" element={<AddAuthor />}></Route>
          <Route path="/EditAuthor/:id" element={<EditAuthor />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
