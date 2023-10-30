import axois from "axios"

    const API = "http://localhost:8000/api/posts/"
    const headers = {
        'Content-Type': 'application/json'
    }

    export const getPosts = () => {
        return axois.get(API);
    }
    
    export const createPost = (body) => { 
        return axois.post(API, body, headers);
    }
    
    export const updatePost = (body, postId) => { 
        return axois.put(API+`${postId}`, body, headers);
    }
    
    export const deletePost = (postId) => {
        return axois.delete(API+`${postId}`);
    }

    export const searchPost = (searchInput) => {
        return axois.get(API+`search/?q=${searchInput}`);
    }