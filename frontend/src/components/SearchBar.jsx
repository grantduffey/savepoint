import { useState } from "react";
import { Navigate } from "react-router-dom";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);

    const fetchData = () => {
        const url = "http://127.0.0.1:8000/search/" + input;

        fetch(url).then((response) => response.json()).then((json) => {
            setResults(json);         
        });

    }

    const handleChange = (value) => {
        setInput(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        fetchData();
    }

    return (
        <div className="input-wrapper">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" 
                value={input} 
                onChange={(e) => handleChange(e.target.value)} 
                className="input input-bordered w-24 md:w-auto" />
            </form>
            {results && <Navigate to="/search/" state={results}/>}
        </div>
    );
}