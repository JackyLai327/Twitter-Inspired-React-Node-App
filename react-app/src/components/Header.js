import Logo from "./Logo";

export default function Header(props) {
    // props = descriptions to be displayed on header for each page
    return (
        <div>
            <Logo />
            <div className="lan-header mt-3">
                <div className="display-5 text-center">
                    {props.headline}
                </div>
                <br></br>
                {/* search function is commented because of not fully functioning */}
                {/* <p className="search-bar text-center">
                    <input type="text" className="form-control text-center" placeholder="Search" />
                </p> */}
                <p className="text-center mt-3">
                    {props.description1}
                </p>
                <p className="my-1 text-center">
                    {props.description2}
                </p>
                <p className="mb-4 text-center">
                    {props.description3}
                </p>
            </div>
        </div>
    )
}