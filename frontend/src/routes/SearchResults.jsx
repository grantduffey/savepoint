import '../global.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state;

    const handleClick = (e, steam_id) => {
        const url = "/game/" + steam_id
        return navigate(url)
    }

    function replaceEscapedBackslash(str) {
        const registered = str.replace(/\\u00ae/g, '\u00ae');
        const trademark = registered.replace(/\\u2122/g, '\u2122');
        return trademark;
    }

    return (
        <>
            {results.map(result => (
                <div key={result.id}>
                    <div onClick={(e) => handleClick(e, result.id[0])} className="searchDiv card lg:card-side bg-gray-600 shadow-xl">
                    <figure><img src={result.img.replace("capsule_sm_120", "header")} alt="Game Cover Image"/></figure>
                        <div className="card-body">
                            <h2 className="card-title text-4xl justify-center items-center">{replaceEscapedBackslash(result.name)}</h2>
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
