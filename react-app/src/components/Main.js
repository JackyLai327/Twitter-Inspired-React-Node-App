import wfh from "../data/wfh.jpg"

export default function Main() {
    // main component that contains the landing page information
    return (
        <>
            <img src={wfh} className="img-fluid" alt="work from home" />
            <p className="text-end"><a className="link-dark" href=": https://www.pexels.com/photo/man-in-black-and-white-stripe-polo-shirt-using-macbook-4939671/">Photo</a> by Vlada Karpovich</p>
        </>
    )
}
