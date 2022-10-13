import { useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import {createPost} from "../data/repository";

export default function WritePost() {

    /* 
    states:
        postContent: stores the post content the user is writing, string type
        postImage: stores the image the user selected from local computer, BLOB type
        posted: determines if post is being published, boolean type
        errorMessage: displays if post is not valid (no content, exceed word limits), string type
        characterCount: shows the number of characters the user is editing in a post, integer type
    */
    const user = JSON.parse(localStorage.getItem("user"));
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [posted, setPosted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const handlePostContent = (e) => {
        setPostContent(e.target.value);
        setCharacterCount(e.target.value.length)
    }

    const handlePostImage = (e) => {
        e.preventDefault();
        setPostImage(e.target.files[0]);
    }

    const handlePosted = () => {
        // reset postContent state
        setPosted(true);
        setPostContent("");
        setPosted(false);
    }

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
    }

    const uploadPost = (e) => {
        /* 
        upon submission, determine if post is valid before posting
        param => submission of form event
        no return, update local storage if post is valid
        */
        e.preventDefault();
        handleErrorMessage("loading...");
        if (postContent !== "" && postContent.length <= 250) {
            if (postImage !== null) {
                let reader = new FileReader();
                reader.readAsDataURL(postImage);
                reader.onload = function() {
                    const post = {
                        username: user.username,
                        content: postContent,
                        image: reader.result.toString()
                    }
                    console.log(reader.result.toString());
                    createPost(post);
                };
                reader.onerror = function() {
                    console.log(reader.error);
                };
            } else {
                const post = {
                    username: user.username,
                    content: postContent,
                    image: null
                }
                createPost(post);
            }
            handlePosted();
            setPostImage(null);
            handleErrorMessage("");
        } else if (postContent === "") {
            handleErrorMessage("Post cannot be empty.");
        } else if (postContent.length > 250) {
            handleErrorMessage("Post cannot have more than 250 characters.");
        }
    }

    return (
        <>
            <Header 
                headline="Create a post"
                description1="Share your day with your colleagues and interact with them!"
            />

            <form className="post-editor-container" onSubmit={uploadPost}>
                <div className="post-editor-user h5">{user.first_name + ' ' + user.last_name}</div>
                
                <textarea className="post-editor" type="textarea" placeholder="Share your thoughts..." onChange={handlePostContent} value={posted ? "" : postContent}></textarea>
                <p className="text-end mx-5 text-secondary">{characterCount}/250 characters</p>

                <div className="post-editor-image mx-5 mb-4">
                    <label className="mb-2">Upload an image (Under Construction... 🦺)</label> <br></br>
                    <label htmlFor="image" className="btn border-dark me-3 disabled">choose</label>
                    <input id="image" type="file" accept="image/*" onChange={handlePostImage} className={"collapse"}/>
                    <img src={postImage === null || postImage === undefined ? "" : URL.createObjectURL(postImage)} alt="post pic" className={postImage === null || postImage === undefined ? "collapse" : "img-fluid post-image"}></img>
                </div>
                
                <div className="post-editor-submit text-end">
                    <input type="submit" className="btn btn-dark" value="Post" />
                </div>
                <div className="h5 text-danger px-3 pt-3">{errorMessage === "" ? "" : errorMessage}</div>
            </form>

            <hr></hr>

            <Posts top="Your Posts" user={user} />
        </>
    )
}