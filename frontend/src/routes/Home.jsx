import { useLoaderData } from 'react-router-dom';
import '../global.css'
import { Link } from 'react-router-dom';
// import { createClient } from "@supabase/supabase-js";

//   const supabase = createClient("https://fskfsnstsbjnjsomjxjz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZza2ZzbnN0c2Jqbmpzb21qeGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNTI1NTMsImV4cCI6MjAyNTgyODU1M30.YDLA6ixnTbIHXyKXHvEPw5l4a8I3TQhk9lcE8hCV35Y");


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
            <h1>Home Page</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {reviews.data.map(review => (
                    <Link to="/" key={review.id}>
                            <div className="card w-95 bg-base-300 shadow-xl">
                                <figure><img src={review.game_img} alt="Game image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{review.game_title} | {review.rating} STARS</h2>
                                    <p>{review.content}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                    </Link>

                ))}
            </div>

        </>
    );
};

export default Home;
