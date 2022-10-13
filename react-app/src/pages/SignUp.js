import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { findUser, createUser, setUser } from "../data/repository";

export default function SignUp(props) {

    /* 
    states:
        name: stores user's name
        username: stores user's username/email
        password: stores user's password in plaintext
        errorMessage: shows user validation failures
        successMessage: shows user if successfully registered
    variable: 
        current: a date object that will be used for a user's joined date
    */
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    const current = new Date();

    function handleName(e) {
        setName(e.target.value);
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        validateDetails(name, username, password);
    }

    async function validateDetails(name, username, password) {
        /* 
        validate the details based on submission
        param => name, username, password (all string type and plaintext)
        no return
        */
        setErrorMessage("");
        name = name.trim();
        const firstName = name.split(" ").length > 1 ? name.split(" ")[0] : "User";
        const lastName = name.split(" ").length > 1 ? name.split(" ")[1] : name;
        username = username.trim();
        password = password.trim();
        const fields = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }

        if ((name !== "") && (username !== "") && (password !== "")) {
            if (/^[a-zA-Z\s]+$/.test(name) === false) {
                setErrorMessage("Name field only allows English characters and spaces. ");
            } else if (/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$/.test(username) === false) {
                setErrorMessage("Please provide a valid email address. ");
            } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) === false) {
                setErrorMessage("Password should have at least 8 characters containing at least 1 UPPERCASE CHARACTER, 1 LOWERCASE CHARACTER 1 NUMERICAL CHARACTER AND 1 of the SPECIAL CHARACTER: @$!%*?& ");
            } else if (await findUser(username)) {
                setErrorMessage("This username is already registered.")
            } else {
                const user = await createUser(fields);
                props.loginUser(user);
                localStorage.setItem("onlineStatus", "online");
                localStorage.setItem("joinedDate", current.getDate() + "/" + (current.getMonth() + 1) + "/" + current.getFullYear());
                setSuccessMessage("Sign up successfully!");
                navigate("/writepost");
                alert("Welcome, " + firstName + "\nduplicate primary key is not fixed");
                setUser(user);
            }

        } else {
            setErrorMessage("");
            setErrorMessage("All fields are required to sign up.");
        }
    }

    return (
        <div>
            <Header 
                headline="Sign Up"
                description1="Join LAN to work efficiently and have fun with your colleagues!"
            />
            <form className="mt-5" onSubmit={onSubmit}>
                <input placeholder="Name" name="name" type="text" className="form-control my-3" onChange={handleName} value={name} />
                <input placeholder="Email" name="username" type="text" className="form-control my-3" onChange={handleUsername} value={username} />
                <input placeholder="Password" name="password" type="password" className="form-control my-3" onChange={handlePassword} value={password} />
                <label className={errorMessage === "" ? "text-success" : "text-danger"}>{errorMessage === "" ? successMessage : errorMessage}</label><br></br>
                <input type="submit" name="submit" className={localStorage.getItem("onlineStatus") === "offline" ? "btn btn-dark mt-3 mb-5 shadow" : "btn btn-success mt-3 mb-5 shadow"} value={localStorage.getItem("onlineStatus") === "offline" ? "Sign Up" : "Log In"} />
            </form>
        </div>
    )
}