import { useLoaderData } from 'react-router-dom';
import '../global.css'
import { useNavigate } from "react-router-dom"

export const loader = async () => {
    try {
        const url = `${import.meta.env.VITE_SRC_URL}/reviews`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
};

const Home = () => {
    const reviews = useLoaderData();
    const navigate = useNavigate();

    const handleClick = (e, steam_id) => {
        const url = "/game/" + steam_id
        return navigate(url)
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {reviews.data.map(review => (
                    <ul key={review.id}>
                            <div onClick={(e) => handleClick(e, review.steam_id)} className="card bg-base-300 shadow-xl">
                                <figure><img src={review.game_img} alt="Game image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title justify-center items-center">{review.game_title} | {review.rating} STARS</h2>
                                    <p>{review.content}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                    </ul>

                ))}
            </div>
            <br />
            <footer className="footer footer-center p-4 bg-secondary-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by SAVEPOINT Industries Ltd</p>
                    <p>Special Thanks: Carolina Code School, Sean Reid, Issac Barcroft, Robert Barrett, and all of Cohort 17</p>
                </aside>
            </footer>
        </>
    );
};

export default Home;
