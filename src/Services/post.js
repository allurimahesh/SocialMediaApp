import axois from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const getPosts = () => {
  return axois.get(process.env.REACT_APP_POST_API_URL);
};

export const createPost = (body) => {
  return axois.post(process.env.REACT_APP_POST_API_URL, body, headers);
};

export const updatePost = (body, postId) => {
  return axois.put(
    process.env.REACT_APP_POST_API_URL + `${postId}`,
    body,
    headers
  );
};

export const deletePost = (postId) => {
  return axois.delete(process.env.REACT_APP_POST_API_URL + `${postId}`);
};

export const searchPost = (searchInput) => {
  return axois.get(
    process.env.REACT_APP_POST_API_URL + `search/?q=${searchInput}`
  );
};
