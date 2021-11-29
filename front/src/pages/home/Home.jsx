import "./Home.css"
import Header from "../../components/header/Header";
import Books from "../../components/books/Books";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router";

function Home() {
    const [books, setBooks] = useState([])
    const {search} = useLocation()
    

    useEffect(() => {
        const fetchingBooks = async () => {
            const res = await axios.get('/books/' + search)
            setBooks(res.data)
        }
        fetchingBooks()
    }, [search])

    localStorage.removeItem("path")
    localStorage.removeItem("items")

    return (
        <>
            <Header />
            <div className="home">
                <Books books={books} />
            </div>
        </>
    )
}

export default Home
