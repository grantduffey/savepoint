import '../global.css';
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { useState } from "react";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state;
    // results.img = results.img.replace("capsule_sm_120", "header")
    // console.log(results[0].img.replace("capsule_sm_120", "header"))

    const handleClick = () => {
        console.log("Game Clicked");
        return navigate("/game")
    }
    
    return (
        <>
            {results.map(result => (
                <div key={result.id}>
                    <div onClick={handleClick} className="searchDiv card lg:card-side bg-gray-600 shadow-xl">
                    <figure><img src={result.img.replace("capsule_sm_120", "header")} alt="Game Cover Image"/></figure>
                        <div className="card-body">
                            <h2 className="card-title text-4xl justify-center items-center">{result.name}</h2>
                            <p>Click to pull up game page</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            ))}
        </>
    );
};

export default SearchResults;
