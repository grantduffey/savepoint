import '../global.css';
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreateReview } from '../components/CreateReview';

export const loader = async (steam_id) => {
    try {
        // console.log(steam_id.params.id)
        const url = 'http://127.0.0.1:8000/game/' + steam_id.params.id;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        // const statusCode = response.status;
        const data = await response.json();

        // console.log(data)

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
};

// const fetchReviews = (steam_id) => {
//     const url = "http://127.0.0.1:8000/reviews/" + steam_id;

//     fetch(url).then((response) => response.json()).then((json) => {
//         console.log(json.data);  
//         return json.data;       
//     });

// }

// const fetchReviews = async (steam_id) => {
//     try {
//         const url = "http://127.0.0.1:8000/reviews/" + steam_id;
//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//             },
//         });

//         // const statusCode = response.status;
//         const data = await response.json();

//         setReviews(data.data)

//         // return data;
//     } catch (error) {
//         console.error('ERROR: ', error);
//         return false;
//     }


// }

const Game = () => {

    // const fetchReviews = async (steam_id) => {
    //     try {
    //         const url = "http://127.0.0.1:8000/reviews/" + steam_id;
    //         const response = await fetch(url, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //             },
    //         });
    
    //         // const statusCode = response.status;
    //         const data = await response.json();
    
    //         setReviews(data.data)
    
    //         // return data;
    //     } catch (error) {
    //         console.error('ERROR: ', error);
    //         return false;
    //     }
    
    
    // }

    // const [reviews, setReviews] = useState("");
    const game = useLoaderData();
    // console.log(game.name)
    // fetchReviews(game.steam_appid)
    // console.log({reviews})
    

    return (
        <>
            <div className="card lg:card-side bg-gray-600 shadow-xl">
                <figure className='lg:min-w-[460px]'><img src={game.header_image} alt="Album"/></figure>
                    <div className="card-body">
                        <h2 className="card-title text-4xl justify-center items-center">{game.name}</h2>
                        <p className='justify-center items-center'>{game.short_description}</p>
                        <div className="card-actions justify-end">

                            {/* REVIEW MODAL */}
                            <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Post Review</button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">{game.name} Review:</h3>
                                    <div className="rating rating-lg rating-half">
                                        <input type="radio" name="rating-10" className="rating-hidden" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                                        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                                    </div>
                                    <br />
                                    <textarea className="min-w-full textarea textarea-bordered" placeholder="Type your review..."></textarea>
                                    <form>
                                        <button className="btn btn-accent">Submit Review</button>
                                    </form>
                                </div>
                            </dialog>
                        
                        </div>
                    </div>
            </div>
            <br />
            {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                <h1>Review</h1>
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
            </div> */}
        </>
    );
};

export default Game;
