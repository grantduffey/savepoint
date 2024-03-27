import { useLoaderData } from 'react-router-dom';
import '../global.css'

export const loader = async () => {
    try {
        const url = 'http://127.0.0.1:8000/reviews';
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        // const statusCode = response.status;
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
};

const Home = () => {
    const reviews = useLoaderData();
    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {reviews.data.map(review => (
                    <ul key={review.id}>
                            <div className="card bg-base-300 shadow-xl">
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

        </>
    );
};

export default Home;
