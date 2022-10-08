export default function Logo(props) {
    
    return (
        <div className="text-center logo">
            <h1>LAN</h1>
            {/* if user is online, display welcome message under logo */}
            <p className="h5">{localStorage.getItem("onlineStatus") === "offline" ? "" : "welcome"}</p>
            <p className="h5">{props.user}</p>
        </div>
    )
}