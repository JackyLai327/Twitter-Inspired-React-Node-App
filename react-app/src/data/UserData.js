const USERS_KEY = "users";
const USER_KEY = "user";

export function initUsers(name, username, password) {
    /* 
    create a user and stored the information 
    param => name, username, password (all string type)
    no return, update database
    */

    let user = {name: name, username: username, password: password};
    let users = JSON.parse(localStorage.getItem(USERS_KEY));
    
    if (localStorage.getItem(USERS_KEY) !== null && users.length !== undefined) {
        // if local storage can't access key "users"
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser(username);
    } else if (localStorage.getItem(USERS_KEY) === null) {
        // if local storage has key "users" but there is no users in there
        users = [];
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser(username);
    } else {
        // if there are some users
        users = [users];
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser(username);
    }
}

export function getUsers() {
    /* 
    get all users' details from local storage
    param => none
    return => json object that contains all users 
    */
    const users = localStorage.getItem(USERS_KEY);
    return JSON.parse(users);
}

export function signIn(username, password) {
    /* 
    sign a user in
    param => username, password (both string type)
    return => the user that is signed in | null
    */
    if (getUsers() !== null) {
        const users = getUsers();
    
        for (const user of users) {
            if (username === user.username && password === user.password ) {
                return user;
            }
        }
    }

    return null;
}

export function setUser(username) {
    /* 
    set the current online user
    param => username that is already registered
    no return, update local storage on key "user"
    */
    let users = getUsers();
    for (const user of users) {
        if (user["username"] === username) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    }

    localStorage.setItem("name", JSON.parse(localStorage.getItem(USER_KEY))["name"]);
    localStorage.setItem("username", JSON.parse(localStorage.getItem(USER_KEY))["username"]);
    localStorage.setItem("password", JSON.parse(localStorage.getItem(USER_KEY))["password"]);
}

export function getUser() {
    /* 
    get one single user details who is currently online
    param => none
    return => the current online user
    */
    return localStorage.getItem(USER_KEY);
}

export function signOut() {
    /* 
    Log the user out
    param => none
    no return, update local storage on key "user", "onlineStatus"
    */
    localStorage.removeItem(USER_KEY);
    localStorage.setItem("onlineStatus", "offline");
}

export function createPost(postContent, postImage) {
    /* 
    create a post and display to the UI, then update local storage on key "posts"
    param => content (string type), image (BLOB type)
    no return, update database
    */

    // create a timestamp when the post is submitted to the server
    const timestamp = Date.now();

    // if there is no image
    if (postImage === null || postImage === undefined) {

        let posts;

        // create post object
        const post = {
            user: JSON.parse(localStorage.getItem("user")),
            content: postContent,
            image: null,
            timestamp: timestamp
        }

        // if there is no key "posts" in local storage
        if (!localStorage.getItem("posts")) {
            localStorage.setItem("posts", "[]");
        }
        posts = JSON.parse(localStorage.getItem("posts"));
        posts.unshift(post);
        localStorage.setItem("posts", JSON.stringify(posts));

    } else {

        let reader = new FileReader();
        reader.readAsDataURL(postImage);
        reader.onload = function() {
            let posts;
            const post = {
                user: JSON.parse(localStorage.getItem("user")),
                content: postContent,
                image: reader.result,
                timestamp: timestamp
            }
            if (!localStorage.getItem("posts")) {
                localStorage.setItem("posts", "[]");
            }
            posts = JSON.parse(localStorage.getItem("posts"));
            posts.unshift(post);
            localStorage.setItem("posts", JSON.stringify(posts));
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    }
    
    
}

export function dataURLtoBlob(dataURL) {
    // referenced from https://gist.github.com/davoclavo/4424731
    // pass in dataURL and returns a blob object | null

    if (dataURL) {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURL.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }
    
        var dataView = new DataView(arrayBuffer);
        var blob = new Blob([dataView], { type: mimeString });
        return blob;
    }

    return null;

}