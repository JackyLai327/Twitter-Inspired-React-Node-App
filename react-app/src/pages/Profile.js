import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { deleteUser, removeUser, 
    setUser, updateUserFirstName, 
    updateUserLastName,
    deletePostByUsername} from "../data/repository";

export default function Profile(props) {

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
    const currentUser = props.user;

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
        currentUser.first_name = newName.length > 1 ? newName.split(" ")[0] : newName;
        currentUser.last_name = newName.length > 1 ? newName.split(" ")[1] : newName;
        setUser(currentUser);
        updateUserFirstName(currentUser);
        updateUserLastName(currentUser);
        setEditing(false);
    }

    const deleteThisUser = () => {
        /* 
        allow user to delete a profile
        param => none
        no return, update the database (local storage on key "users", "posts")
        */
        deleteUser(currentUser.username);
        deletePostByUsername(currentUser.username);
        removeUser();
        localStorage.setItem("onlineStatus", "offline");
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
                    <div className={editing === false ? "h4" : "collapse"}>{currentUser.first_name + " " + currentUser.last_name}</div>
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
                                <button className="form-control mx-5 p-3 btn btn-danger" onClick={deleteThisUser}>Delete</button>
                                <button className="form-control mx-5 p-3 btn btn-secondary" onClick={handleDeleteWarning}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h4 pt-4 text-secondary">Joined date: {currentUser.joined_timestamp.substring(0, 10)}</div>
        </>
    )
}