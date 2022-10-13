import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import WritePost from "../pages/WritePost";
import Footer from "./Footer";
import NavBarBtn from "./NavBarBtn";
import { findUser, getUser, removeUser } from "../data/repository";
import { useState } from "react";

export default function NavBarItemRouter() {
    // a router to route through the whole website
    const [user, setUser] = useState(getUser());

    const loginUser = (user) => {
      setUser(user);
    };
  
    const logoutUser = () => {
      removeUser();
      setUser(null);
    };

    return (
            <Router>
                <NavBarBtn /> {/* NavBar is always default throughout all routes */}
                <Routes className="navbar px-1 py-3 side side-item flex-column">
                    <Route path="/" element={<Home user={user} /> }/>
                    <Route path="/signup" element={<SignUp loginUser={loginUser} />}/>
                    <Route path="/signin" element={<SignIn loginUser={loginUser} />}/>
                    <Route path="/profile" element={<Profile user={user} />}/>
                    <Route path="/writepost" element={<WritePost user={user} />}/>
                </Routes>
                <Footer />
            </Router>
    )
}