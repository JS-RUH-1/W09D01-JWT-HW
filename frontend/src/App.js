import Author from "./pages/Author";
import EditAuthor from "./pages/EditAuthor";
import NavBar from "./components/NavBar";
import Books from "./pages/Books";
import EditBook from "./pages/EditBook";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import NoAccess from "./pages/NoAccess";
import NotFound from "./pages/NotFound";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Author />}></Route>
          <Route exact path="/editAuthor/:id" element={<EditAuthor />}></Route>
          <Route exact path="/books" element={<Books />}></Route>
          <Route exact path="/editBook/:id" element={<EditBook />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/noAccess" element={<NoAccess />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
