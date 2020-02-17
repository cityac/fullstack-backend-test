const express = require('express');
const axios = require("axios");
require('./db/mongoose');

const Post = require('./models/post')
const User = require('./models/user')

const main = () => {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/users'),
    axios.get('https://jsonplaceholder.typicode.com/posts'),
  ]).then(axios.spread((usersResponse, postsResponse) => {
    extractDataToDB(usersResponse.data, postsResponse.data);
  }));
}

const extractDataToDB = (usersData, postsData) => {
  const data = usersData.map(userData => {
    const user = User.adaptData(userData);
    const posts = Post.adaptAndBindData(postsData, user, userData.id);
    return {
      user,
      posts,
    }
  });


  const usersArray = data.reduce((acc, {user}) => {
    return acc.concat(user);
  }, []);

  const postsArray = data.reduce((acc, {posts}) => {
    return acc.concat(posts);
  }, [])

  User.bulkInsert(usersArray);
  Post.bulkInsert(postsArray);
}

main();