import axios from "axios";

const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

async function verifyUser(username, password) {
    const response = await axios.get(API_HOST + "api/users/login", {
        params: { username, password }
    });
    const user = response.data;

    if (user !== null) setUser(user);

    return user;
}

// User methods

async function findUser(username) {
    const response = await axios.get(API_HOST + `api/users/select/${username}`);
    return response.data;
}

async function createUser(user) {
    const response = await axios.post(API_HOST + "/api/users", user);
    return response.data;
}

async function findAllUsers() {
    const response = await axios.get(API_HOST + "/api/users/")
    return response.data;
}

async function deleteUser(username) {
    const response = await axios.delete(API_HOST + `/api/users/${username}`);
    return response.data;
}

async function updateUserFistName(username) {
    const response = await axios.put(API_HOST + `/api/users/updateFName/${username}`);
    return response.data;
}

async function updateUserLastName(username) {
    const response = await axios.put(API_HOST + `/api/users/updateLName/${username}`);
    return response.data;
}

async function updateUserProfilePicture(username) {
    const response = await axios.put(API_HOST + `/api/users/updatePFP/${username}`);
    return response.data;
}

async function followUser(username, followUsername) {
    return
}

async function unfollowUser(username, unfollowUsername) {
    return
}

// Post methods

async function getAllPosts() {
    const response = await axios.get(API_HOST + "/api/posts");
    return response.data;
}

async function createPost(post) {
    const response = await axios.post(API_HOST + "/api/posts", post);
    return response.data;
}

async function getPostsByUsername(username) {
    const response = await axios.get(API_HOST + `/api/posts/select/${username}`);
    return response.data;
}

async function deletePost() {
    return
}

async function updatePost() {
    return
}

// Comment methods

async function getCommentsByUsername(username) {
    const response = await axios.get(API_HOST + `/api/comments/${username}`);
    return response.data;
}

async function getCommentsByPostID(postID) {
    const response = await axios.get(API_HOST + `/api/comments/${postID}`);
    return response.data;
}

async function createComment(comment) {
    const response = await axios.post(API_HOST + "api/comments", comment);
    return response.data;
}

async function deleteComment(comment) {
    return
}

async function updateComment(comment) {
    return
}

// Helper Functions

function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
    localStorage.removeItem(USER_KEY);
}

export {
    verifyUser, findUser, createUser, findAllUsers,
    deleteUser, getAllPosts, createPost, updateUserFistName,
    getPostsByUsername, deletePost, updatePost, getCommentsByUsername, 
    getCommentsByPostID, createComment, deleteComment,
    updateComment, setUser, getUser, removeUser, followUser, unfollowUser,
    updateUserLastName, updateUserProfilePicture
}