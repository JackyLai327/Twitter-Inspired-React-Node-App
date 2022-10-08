import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { signIn, setUser } from "../data/UserData";
import { verifyUser } from "../data/repository";

export default function SignIn(props) {

    /* 
    states: 
        username: gets username from local storage
        password: gets password from local storage
        errorMessage: warns user when log in failed
        successMessage: notifies user when log in successfully
        online: determine if the user is currently logged in and online
    */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const onlineStatus = localStorage.getItem("onlineStatus");
    const [online, setOnline] = useState(false);

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleOnline() {
        setOnline(!online);
    }

    async function onSubmit(e) {
        /* 
        after submission of log in details, determine to log user in or not
        param: event of submitting form
        no return, update local storage on currently logged in user (key "user")
        */
        e.preventDefault();
        const user = await verifyUser(username, password);

        if (user === null) {
            setUsername("");
            setPassword("");
            setErrorMessage("Username/Password incorrect. Please try again.")
            return;
        } 

        props.loginUser(user);
        setErrorMessage("");
        setSuccessMessage("Welcome, " + localStorage.getItem("name") + "!");
        handleOnline();
        navigate("/writepost");
        alert("Welcome!");
    }

    return (
        <>
            <Header 
                headline="Sign In"
                description1="Log in to enjoy your online workspace!"
            />
            <form className="mt-5" onSubmit={onSubmit}>
            <input placeholder="Email" name="username" type="text" className="form-control my-3" onChange={handleUsername} value={username} />
                <input placeholder="Password" name="password" type="password" className="form-control my-3" onChange={handlePassword} value={password} />
                <label className={errorMessage === "" ? "text-success" : "text-danger"}>{errorMessage === "" ? successMessage : errorMessage}</label><br></br>
                <input type="submit" name="submit" className={onlineStatus === "offline" ? "btn btn-dark mt-3 mb-5 shadow" : "btn btn-success mt-3 mb-5 shadow"} value={onlineStatus === "offline" ? "Log In" : "Welcome!"} />
            </form>
        </>
    )
}