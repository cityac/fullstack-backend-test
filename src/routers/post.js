const express = require('express')
const Post = require('../models/post')
const router = new express.Router()


router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    for (let i = 0; i < posts.length; i++) {
      // populate user to show in simple html table
      // normally we do not need to populate lists with extradata
      await posts[i].populate('user').execPopulate();
    }
    res.status(201).send(posts);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
 
})

router.get('/posts/:id', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    await post.populate('user').execPopulate();
    res.status(201).send(post);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
 
})

module.exports = router;