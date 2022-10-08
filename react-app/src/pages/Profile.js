import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {getUsers, setUser, signOut} from "../data/UserData";

export default function Profile() {

    /* 
    states: 
        editing: determines whether profile name is being edited
        newName: takes in the newName after edit
        deleteWarning: shows warning message when user tries to delete the profile
    */
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [deleteWarning, setDeleteWarning] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const handleEditing = () => {
        setEditing(!editing);
    }

    const handleNewName = (e) => {
        setNewName(e.target.value);
    }

    const handleDeleteWarning = () => {
        setDeleteWarning(!deleteWarning);
    }

    const editName = () => {
        /* 
        allow user to edit the user's name
        param => none
        no return, update the database (local storage on key "users", "posts")
        */
        let users = getUsers();
        let posts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : null;
        for (const user of users) {
            if (posts) {
                for (const post of posts){
                    if (post.user.username === currentUser.username) {
                        post.user.name = newName;
                    }

                    if (post.comments) {
                        const comments = post.comments;
                        for (const comment of comments) {
                            if (comment.user.username === currentUser.username) {
                                console.log(comment);
                                comment.user.name = newName;
                            }
                        }
                    }
                }
            }

            if (user.username === JSON.parse(localStorage.getItem("user")).username) {
                user.name = newName;
            }
        }
        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("users", JSON.stringify(users));
        setEditing(false);
        setUser(currentUser.username);
    }

    const deleteUser = () => {
        /* 
        allow user to delete a profile
        param => none
        no return, update the database (local storage on key "users", "posts")
        */
        let newUsers = [];
        let users = getUsers();
        let posts = JSON.parse(localStorage.getItem("posts"));
        for (const user of users) {
            if (user["username"] !== JSON.parse(localStorage.getItem("user"))["username"]) {
                newUsers.push(user);
            }
            localStorage.setItem("users", JSON.stringify(newUsers));
        }
        for (const post of posts) {
            let newPosts = [];
            if (localStorage.getItem("user") !== JSON.stringify(post.user)) {
                newPosts.push(post);
            }
            localStorage.setItem("posts", JSON.stringify(newPosts));
        }
        signOut();
        localStorage.setItem("name", "");
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        localStorage.setItem("joinedDate", "");
        alert("Logged out successfully.");
        navigate("../");
    }

    return (
        <>
            <Header 
                headline="Your Private Office"
            />
            <h1>Profile</h1>
            <div className="d-flex justify-content-left">
                <div className="user-pfp mx-5">
                    <div className="user-pfp-top"></div>
                    <div className="user-pfp-btm"></div>
                </div>

                <div className="d-flex flex-column">
                    <div className={editing === false ? "h4" : "collapse"}>{currentUser.name}</div>
                    <div className={editing === false ? "h4" : "collapse"}>{currentUser.username}</div>
                    <div className={editing === true ? "h4 p-3" : "collapse"}>Editing your name...</div>
                    <div className={editing === false ? "" : "collapse"}>
                        <button className="btn btn-secondary my-3" onClick={handleEditing}>Edit Name</button>
                    </div>
                    <div className={editing === true ? "px-5" : "collapse"}>
                        <input type="text" className="my-3 ml--2" onChange={handleNewName} placeholder="Enter new name" /><br></br>
                        <button onClick={editName} className="btn p-1 my-3 ml--2 btn-primary px-3 py-2" >Save</button>
                        <button className="btn p-1 my-3 px-3 py-2 btn-secondary mx-2" onClick={handleEditing}>Cancel</button>
                    </div>
                    <div className={editing === false ? "form" : "form collapse"}>
                        <button className={deleteWarning ? "collapse" : "btn btn-danger"} onClick={handleDeleteWarning}>Delete Profile</button>
                        <div className={deleteWarning ? "warning-pop" : "collapse"}>
                            <h1 className="text-center text-light pt-5 px-5 display-4">Your content will be deleted after deletion of your account.</h1>
                            <div className="text-center text-light display-5 p-5">Are you sure you want to delete your account?</div>
                            <div className="text-center text-light display-6 pb-5">This action cannot be undone.</div>
                            <div className="d-flex justify-content-around">
                                <button className="form-control mx-5 p-3 btn btn-danger" onClick={deleteUser}>Delete</button>
                                <button className="form-control mx-5 p-3 btn btn-secondary" onClick={handleDeleteWarning}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h4 pt-4 text-secondary">Joined date: {localStorage.getItem("joinedDate")}</div>
        </>
    )
}