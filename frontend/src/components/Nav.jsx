import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
// import { useState } from "react"

export default function Nav() {
    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">savepoint!</a>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
            {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
            <SearchBar/>
            </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" />
                </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a className="justify-between">
                    Profile
                </a>
                </li>
                <li><a>Login</a></li>
            </ul>
            </div>
        </div>
        </div>
    )
}