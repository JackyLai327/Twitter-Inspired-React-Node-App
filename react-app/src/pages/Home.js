import Header from "../components/Header";
import Main from "../components/Main";
import NavBarBtn from "../components/NavBarBtn";
import Posts from "../components/Posts";

export default function Home() {

    return (
        <>
            <Header 
                headline="Loop Agile Now" 
                description1="Efficient Remote Work Environment | developed by Loop Agile"
                description2="LAN provides an online community for your remote working environment."
                description3="With LAN, any member of the office can post, comment, and like on each other's works, presentations and queries."
            />
            <NavBarBtn />
            <Main />
            <Posts top="Feed" />
        </>
    )
}