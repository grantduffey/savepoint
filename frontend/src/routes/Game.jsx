import '../global.css';
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreateReview } from '../components/CreateReview';

export const loader = async (steam_id) => {
    try {
        const url = 'http://127.0.0.1:8000/game/' + steam_id.params.id;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        const data = await response.json();
        const reviews = await fetchReviews(data.steam_appid)
        
        return { game:data, reviews} ;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
};

const fetchReviews = async (steam_id) => {
    try {
        const url = "http://127.0.0.1:8000/reviews/" + steam_id;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        const data = await response.json();

        return(data.data)

    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
}

const Game = () => {

    const loaderData = useLoaderData();
    const {game, reviews} = loaderData;

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = (e) => {
        e.preventDefault(); 
        
        const reviewContent = {user_id: "a3a9dbb3-8015-4767-b86e-af68b00e41b0", steam_id: game.steam_appid, game_title: game.name, game_img: game.header_image, rating, favorite: false, content: reviewText}

        fetch("http://127.0.0.1:8000/reviews/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(reviewContent) 
            }).then((response) => {
            location.reload()
        })

    }

    return (
        <>
            <div className="card lg:card-side bg-gray-600 shadow-xl">
                <figure className='lg:min-w-[460px]'><img src={game.header_image} alt="Album"/></figure>
                    <div className="card-body">
                        <h2 className="card-title text-4xl justify-center items-center">{game.name}</h2>
                        <p className='justify-center items-center'>{game.short_description}</p>
                        <div className="card-actions justify-end">

                            {/* REVIEW MODAL */}
                            <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Post A Review</button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">{game.name} Review:</h3>
                                    <form onSubmit={(e) => handleSubmitReview(e)}>
                                        <div className="rating rating-lg rating-half">
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={0}className="rating-hidden"/>
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={0.5} className="bg-green-500 mask mask-star-2 mask-half-1" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={1} className="bg-green-500 mask mask-star-2 mask-half-2" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={1.5} className="bg-green-500 mask mask-star-2 mask-half-1" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={2} className="bg-green-500 mask mask-star-2 mask-half-2" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={2.5} className="bg-green-500 mask mask-star-2 mask-half-1" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={3} className="bg-green-500 mask mask-star-2 mask-half-2" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={3.5} className="bg-green-500 mask mask-star-2 mask-half-1"/>
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={4} className="bg-green-500 mask mask-star-2 mask-half-2" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={4.5} className="bg-green-500 mask mask-star-2 mask-half-1" />
                                            <input type="radio" name="rating-10" onChange={(e) => setRating(e.target.value)} value={5} className="bg-green-500 mask mask-star-2 mask-half-2"/>
                                        </div>
                                        <p>{rating}</p>
                                        <textarea className="min-w-full textarea textarea-bordered" onChange={(e) => setReviewText(e.target.value)} placeholder="Type your review..."></textarea>
                                        <button className="btn btn-accent">Submit Review</button>
                                    </form>
                                </div>
                            </dialog>
                        
                        </div>
                    </div>
            </div>
            <br />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {reviews.map(review => (
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

export default Game;
