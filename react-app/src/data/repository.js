import axios from "axios";
import e from "cors";

const API_HOST = "http://localhost:4000/";
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
    const response = await axios.post(API_HOST + "api/users", user);
    return response.data;
}

async function findAllUsers() {
    const response = await axios.get(API_HOST + "api/users/");
    console.log(response.data);
    return response.data;
}

async function deleteUser(username) {
    const response = await axios.delete(API_HOST + `api/users/delete/${username}`);
    return response.data;
}

async function updateUserFirstName(user) {
    const response = await axios.put(API_HOST + `api/users/updateFName/${user.username}/${user.first_name}`);
    return response.data;
}

async function updateUserLastName(user) {
    const response = await axios.put(API_HOST + `api/users/updateLName/${user.username}/${user.last_name}`);
    return response.data;
}

async function updateUserProfilePicture(user) {
    const response = await axios.put(API_HOST + `api/users/updatePFP/${user.username}`);
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
    const response = await axios.get(API_HOST + "api/posts/all");
    return response.data;
}

async function createPost(post) {
    const response = await axios.post(API_HOST + "api/posts", post);
    return response.data;
}

async function getPostsByUsername(username) {
    const response = await axios.get(API_HOST + `api/posts/select/${username}`);
    return response.data;
}

async function deletePostByUsername(username) {
    const response = await axios.delete(API_HOST + `api/posts/deletePostByUsername/${username}`)
    return response.data;
}

async function deletePostByPostID(postID) {
    const response = await axios.delete(API_HOST + `api/posts/deletePostByPostID/${postID}`);
    return response.data;
}

async function updatePostByPostID(post) {
    const response = await axios.put(API_HOST + `api/posts/updatePost/${post.post_id}/${post.content}/${post.image}`);
    return response.data;
}

// Comment methods

async function getCommentsByUsername(username) {
    const response = await axios.get(API_HOST + `api/comments/selectByUsername/${username}`);
    return response.data;
}

async function getCommentsByPostID(postID) {
    const response = await axios.get(API_HOST + `api/comments/selectByPostID/${postID}`);
    return response.data;
}

async function createComment(comment) {
    const response = await axios.post(API_HOST + "api/comments/create", comment);
    return response.data;
}

async function getAllComments() {
    const response = await axios.get(API_HOST + "api/comments/all");
    return response.data;
}

async function deleteComment(comment) {
    return
}

async function updateComment(user) {
    const response = await axios.put(API_HOST + `api/users/updateCommentByUser/${user.username}`);
    return response.data;
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
    deleteUser, getAllPosts, createPost, updateUserFirstName,
    getPostsByUsername, deletePostByUsername, updatePostByPostID, getCommentsByUsername, 
    getCommentsByPostID, createComment, deleteComment,
    updateComment, setUser, getUser, removeUser, followUser, unfollowUser,
    updateUserLastName, updateUserProfilePicture, deletePostByPostID, getAllComments
}