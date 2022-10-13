import { useEffect, useState } from "react";
import { getAllPosts, getPostsByUsername, deletePostByPostID, 
    updatePostByPostID, createComment, getAllComments } from "../data/repository";
import {dataURLtoBlob} from "../data/UserData";
import ReactQuill from "react-quill";

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

    const [editing, setEditing] = useState(false);
    const [editingPost, setEditingPost] = useState("");
    const [newContent, setNewContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [comment, setComment] = useState("");
    let [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = props.user ? props.user : null;
    const onlineStatus = localStorage.getItem("onlineStatus");
    let count = 0
    const [commentsUnderPost, setCommentsUnderPost] = useState([]);

    useEffect(() =>  {
        async function loadPosts() {
            const currentPosts = currentUser === null ? await getAllPosts() : await getPostsByUsername(props.user.username);
            setPosts(currentPosts);
            setIsLoading(false);
        }
        loadPosts();
        
        async function loadComments(postID) {
            const currentComments = await getAllComments();
            setCommentsUnderPost(currentComments);
            setIsLoading(false);
        }
        loadComments();
    }, [currentUser !== null ? currentUser.username : "", props.user, count]);
    

    function handleEditing() {
        setEditing(!editing);
    }

    function handleNewContent(e) {
        setNewContent(e);
        setCharacterCount(e.replace(/(<([^>]+)>)/ig, '').length);
    }

    function handleComment(e) {
        setComment(e.target.value);
    }

    const deletePost = async (posts, post) => {
        /* 
        find the position of a post in all posts and delete it
        param => all posts (json object), deleting post (json object)
        no return, update database
        */
        await deletePostByPostID(post.post_id);
        window.location.reload(false);
    }

    const editPost = (posts, post) => {
        /* 
        find the position of a post in all posts and make edits to it
        param => all posts (json), editing post (json)
        return => the post that is after edited
        */
        console.log(post);
        setEditing(true);
        setEditingPost(post.content);
        return post;
    }

    const updatePost = (posts, post) => {
        /* 
        find the position of a post in all posts and update it
        param => all posts (json), updating post (json)
        no return, update database
        */
        if (newContent !== "" && newContent.length <= 250) {
            post.content = newContent.replace("/", "%2F").replace(".", "%2E");
            console.log(post);
            updatePostByPostID(post);
        } else if(newContent.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            setErrorMessage("A post cannot be empty.");
            return;
        } else if (newContent.length > 250) {
            setErrorMessage("Post cannot have more than 250 characters.")
        }
        handleEditing();
        setErrorMessage("");
    }

    const postComment = (posts, post) => {
        /* 
        create a comment and display to user under the right post
        param => all posts (json), commenting post (json)
        no return, update database
        */
        if (comment !== "") {
            const postComment = {
                user: currentUser, 
                content: comment,
                post: post
            };
            createComment(postComment);
            setComment("");
        }
    }

    return (
        <>
            <div className="text-center h3">{props.top}</div>
            <div>
                {isLoading ?
                <div className="d-6">Loading posts...</div>
                :
                posts.length === 0 ?
                    <p className="text-secondary text-center">It's dead silence here... Write something!</p>
                    :
                    posts.slice(0).reverse().map((postData) => {
                        let comments = [];
                        commentsUnderPost.map(comment => {
                            if (comment.postByUser === postData.post_id) {
                                comments.unshift(comment);
                            }
                        })
                        let post = {
                            id: postData.post_id,
                            user: {
                                name: postData["user.first_name"] + " " + postData["user.last_name"],
                                username: postData.username,
                                profile_picture: postData["user.profile_picture"]
                            },
                            content: postData.content,
                            timestamp: postData.updated_timestamp.substring(0, 10) + ", " + postData.updated_timestamp.substring(11, 19),
                            comments: comments
                        };
                        const image = dataURLtoBlob(postData.image) !== null ? URL.createObjectURL(dataURLtoBlob(postData.image)) : "";

                        return (

                            <div className="post-container" key={post.id}>
                            <div className="d-flex justify-content-between">
                                <div className="h4 post-user">{post.user.name}</div>
                                <div className={editing || (localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user")).username !== post.user.username) : {}) ? "collapse" : ""}>
                                    <button className="btn" onClick={() => editPost(posts, postData)}>Edit post</button>
                                    <span>|</span>
                                    <button className="btn" onClick={() => deletePost(posts, postData)}>Delete post</button>
                                </div>
                            </div>
                            <div className={editing ? "post-editing" : "collapse"}>
                                <div className="text-center pt-3 h5">Editing your post...</div>
                                <ReactQuill theme="snow" value={newContent} onChange={handleNewContent} style={{ height: "180px" }} className="mb-3 mx-3" placeholder={editingPost.replace(/(<([^>]+)>)/ig, '')} preserveWhitespace />
                                <p className="text-end text-secondary mx-4">{characterCount}/250</p>
                                <br></br>
                                <p className={errorMessage !== "" ? "text-danger mx-4" : "collapse"} >{errorMessage}</p>
                                <button className="btn mx-4 mb-3 btn-dark" onClick={() => updatePost(posts, postData)}>Submit</button>
                                <button className="btn btn-secondary mb-3" onClick={handleEditing}>Cancel</button>
                            </div>


                            <div className={editing ? "collapse" : "justify-content-between"}>
                                <div>
                                    <div className={"post-content mt-3"} dangerouslySetInnerHTML={{ __html: post.content.replace("%2F", "/").replace("%2E", ".") }}></div>
                                </div>
                                <img src={image} alt="lol" className={image !== "" ? "img-fluid post-image" : "collapse"}></img>
                            </div>
                            
                            <div className="post-timestamp text-secondary text-end mt-3">
                                posted on {post.timestamp}
                            </div>

                            <hr></hr>

                            <div className={onlineStatus === "online" ? "d-flex py-3" : "collapse"}>
                                <input placeholder="Leave a comment..." type="text" className="form-control" onChange={handleComment} />
                                <button className="btn" onClick={() => postComment(posts, postData)}>Send</button>
                            </div>

                            <div className={onlineStatus === "online" ? "collapse" : ""}>
                                <div className="offline-comment text-secondary">Log in to leave a comment 💬 </div>
                            </div>

                            <div>
                                { 
                                    post.comments.map(comment => {
                                        console.log(comment);
                                        return (
                                            <div className="d-flex comment" key={comment.comment_id}>
                                                <div>{comment.username}:</div>
                                                <div>{comment.content}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                    })
                }
                </div>
            <div className="text-center text-secondary">You've reached the end.</div>
        </>
    )
}