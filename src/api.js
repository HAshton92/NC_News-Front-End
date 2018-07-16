const axios = require("axios");
const apiURL = "https://nc-news-by-howard.herokuapp.com/api/";

export const getArticles = () => {
  return axios.get(`${apiURL}articles`).then(({ data }) => data);
};

export const getArticlesByTopic = topicSlug => {
  return axios
    .get(`${apiURL}topics/${topicSlug}/articles`)
    .then(({ data }) => data);
};

export const getArticleById = articleID => {
  return axios.get(`${apiURL}articles/${articleID}`).then(({ data }) => data);
};

export const getTopics = () => {
  return axios.get(`${apiURL}topics`).then(({ data }) => {
    return data;
  });
};

export const getCommentsForArticle = articleID => {
  return axios
    .get(`${apiURL}articles/${articleID}/comments`)
    .then(({ data }) => data);
};

export const voteOnArticle = (articleID, vote) => {
  return axios
    .put(`${apiURL}articles/${articleID}?vote=${vote}`)
    .then(({ data }) => data);
};

export const voteOnComment = (commentID, vote) => {
  return axios
    .put(`${apiURL}comments/${commentID}?vote=${vote}`)
    .then(({ data }) => data);
};

export const addComment = (articleID, newComment) => {
  return axios
    .post(`${apiURL}articles/${articleID}/comments`, newComment)
    .then(({ data }) => data);
};

export const deleteComment = commentID => {
  return axios
    .delete(`${apiURL}comments/${commentID}`)
    .then(({ data }) => data);
};

export const getUserById = userID => {
  return axios.get(`${apiURL}users/${userID}`).then(({ data }) => data);
};
