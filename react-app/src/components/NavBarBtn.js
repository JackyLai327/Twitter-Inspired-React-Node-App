import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../data/UserData";

export default function NavBarBtn() {
    
    const [hidden, setHidden] = useState(true);
    // state: hidden for toggling navigation bar

    const handleToggle = () => {
        setHidden(!hidden);
    }
    
    return (
        <>
            <button className="btn btn-clear side" onClick = {handleToggle}>
                <span className="h5">Menu</span>
            </button>
            <NavBar className={hidden ? "collapse" : ""} />
            {/* if state hidden = true, make it disappear */}
        </>
    )
}

function NavBar(props) {

    // useNavigate hook to redirect user  
    const navigate = useNavigate();

    function logOut() {
        /* 
        logging out:
        sign user out first
        notify user that their are logged out
        redirect user to homepage 
        */
        signOut();
        alert("Logged out successfully.");
        navigate("../");
    }

    return (
        <>
            <div className={props.className}>
                <nav className="navbar px-1 py-3 side side-item flex-column">
                    <a href="./" className="btn btn-clear text-black px-1 py-3 text-center text-decoration-none">Home</a>
                    {/* 
                     conditional display:
                        if online: show Home, Profile, Create Post, and LogOut
                        if offline: show Home, Sign in, Sign Up
                     */}
                    {localStorage.getItem("onlineStatus") === "online" ? <a href="./profile" className="btn btn-clear text-black px-1 py-3 text-center text-decoration-none">Profile</a> : ""}
                    {localStorage.getItem("onlineStatus") === "online" ? <a href="./writepost" className="btn-clear btn text-black px-1 py-3 text-center text-decoration-none">Post</a> : ""}
                    {localStorage.getItem("onlineStatus") === "online" ? "" : <a href="./signin" className="btn btn-clear text-black px-1 py-3 text-center text-decoration-none">Sign In</a>}
                    {localStorage.getItem("onlineStatus") === "online" ? "" : <a href="./signup" className="btn btn-clear text-black px-1 py-3 text-center text-decoration-none">Sign Up</a>}
                    {localStorage.getItem("onlineStatus") === "online" ? <button className="px-1 py-3 btn btn-clear" onClick={logOut}>Log out</button> : ""}
                </nav>
            </div>
        </>
    )
}