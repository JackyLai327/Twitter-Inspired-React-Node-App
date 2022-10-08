import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {dataURLtoBlob} from "../data/UserData";

export default function Posts(props) {

    // posts component displays all posts created by all users that are stored in the local storage/database
    /* 
    states:
        editing: determine if posts are being edited, boolean type
        editingPost: determine which post is being edited, string type
        newContent: determine the new content after edit, string type
        errorMessage: displays when errors made by users happen, string type
        characterCount: shows the current number of characters in the post when editing, type integer
        comment: shows the new comment creating by user, type string
    variables:
        currentUser: stores the current online user, user type
        onlineStatus: stores the online status of user
    */

    let feed = [];
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [editingPost, setEditingPost] = useState("");
    const [newContent, setNewContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [comment, setComment] = useState("");
    const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const onlineStatus = localStorage.getItem("onlineStatus");


    function handleEditing() {
        setEditing(!editing);
    }

    function handleNewContent(e) {
        setNewContent(e.target.value);
        setCharacterCount(e.target.value.length);
    }

    function handleComment(e) {
        setComment(e.target.value);
    }

    const convertTimestamp = (timestamp) => {
        /* 
        convert time stamp into date-time string
        param => timestamp
        return date-time string
         */
        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            }).format(timestamp);
    }

    const deletePost = (posts, post) => {
        /* 
        find the position of a post in all posts and delete it
        param => all posts (json object), deleting post (json object)
        no return, update database
        */
        const index = posts.indexOf(post);
        posts.splice(index, index+1);
        localStorage.setItem("posts", JSON.stringify(posts));
        navigate("../writepost");
    }

    const editPost = (posts, post) => {
        /* 
        find the position of a post in all posts and make edits to it
        param => all posts (json), editing post (json)
        return => the post that is after edited
        */
        setEditing(true);
        setEditingPost(post.content);
        return posts.indexOf(post);
    }

    const updatePost = (posts, post) => {
        /* 
        find the position of a post in all posts and update it
        param => all posts (json), updating post (json)
        no return, update database
        */
        if (newContent !== "" && newContent.length <= 250) {
            const index = posts.indexOf(post);
            posts[index].content = newContent;
            localStorage.setItem("posts", JSON.stringify(posts));
            setNewContent("");
            handleEditing();
            setErrorMessage("");
        } else if (newContent === "") {
            setErrorMessage("Post cannot be empty.")
        } else if (newContent.length > 250) {
            setErrorMessage("Post cannot have more than 250 characters.")
        }
    }

    const postComment = (posts, post) => {
        /* 
        create a comment and display to user under the right post
        param => all posts (json), commenting post (json)
        no return, update database
        */
        if (comment !== "") {
            const commentData = {
                user: currentUser, 
                comment: comment
            };
            if (post.comments) {
                post.comments.unshift(commentData);
            } else {
                post.comments = [];
                post.comments.unshift(commentData);
            }
            localStorage.setItem("posts", JSON.stringify(posts));
            setComment("");
        }
    }

    if (localStorage.getItem("posts")) {
        const postDatas = JSON.parse(localStorage.getItem("posts"));
        let index = 0;
        
        for (const postData of postDatas) {
            
            // store all posts from database into json objects for easy access
            let post = {
                id: index,
                user: postData.user,
                content: postData.content,
                timestamp: postData.timestamp,
                comment: postData.comments
            };

            // create image based on stored BLOB type data
            const image = dataURLtoBlob(postData.image) !== null ? URL.createObjectURL(dataURLtoBlob(postData.image)) : "";

            // add all these HTML into feed array
            feed.push(

                <div className="post-container" key={post.id}>
                    <div className="d-flex justify-content-between">
                        <div className="h4 post-user">{post.user.name}</div>
                        <div className={editing || (currentUser ? (currentUser.username !== post.user.username) : {}) ? "collapse" : ""}>
                            <button className="btn" onClick={() => editPost(postDatas, postData)}>Edit post</button>
                            <span>|</span>
                            <button className="btn" onClick={() => deletePost(postDatas, postData)}>Delete post</button>
                        </div>
                    </div>
                    <div className={editing ? "post-editing" : "collapse"}>
                        <div className="text-center pt-3 h5">Editing your post...</div>
                        <textarea className="post-editor" placeholder={editingPost} onChange={handleNewContent} ></textarea>
                        <p className="text-end text-secondary mx-4">{characterCount}/250</p>
                        <br></br>
                        <p className={errorMessage !== "" ? "text-danger mx-4" : "collapse"} >{errorMessage}</p>
                        <button className="btn mx-4 mb-3 btn-dark" onClick={() => updatePost(postDatas, postData)}>Submit</button>
                        <button className="btn btn-secondary mb-3" onClick={handleEditing}>Cancel</button>
                    </div>


                    <div className={editing ? "collapse" : "justify-content-between"}>
                        <div>
                            <div className={"post-content mt-3"}>
                                {post.content}
                            </div>
                        </div>
                        <img src={image} alt="lol" className={image !== "" ? "img-fluid post-image" : "collapse"}></img>
                    </div>
                    
                    <div className="post-timestamp text-secondary text-end mt-3">
                        posted on {convertTimestamp(post.timestamp)}
                    </div>

                    <hr></hr>

                    <div className={onlineStatus === "online" ? "d-flex py-3" : "collapse"}>
                        <input placeholder="Leave a comment..." type="text" className="form-control" onChange={handleComment} />
                        <button className="btn" onClick={() => postComment(postDatas, postData)}>Send</button>
                    </div>

                    <div className={onlineStatus === "online" ? "collapse" : ""}>
                        <div className="offline-comment text-secondary">Log in to leave a comment 💬 </div>
                    </div>

                    <div>
                        { postData.comments ? 
                            postData.comments.map(comment => {
                                return (
                                    <div className="d-flex comment" key={postData.comments.indexOf(comment)}>
                                        <div>{comment.user.name}:</div>
                                        <div>{comment.comment}</div>
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
                </div>

            );
            index += 1;
        }
    }

    return (
        <>
            <div className="text-center h3">{props.top}</div>
            {feed} {/* display the whole array that has all posts */}
            <div className="text-center text-secondary">You've reached the end.</div>
        </>
    )
}