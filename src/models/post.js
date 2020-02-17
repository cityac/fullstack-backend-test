const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const User = require('./user')

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: Schema.Types.String,
    trim: true,
  },
  body: {
    type: Schema.Types.String,
    trim: true,
  },

});

postSchema.statics.adaptAndBindData = (posts, user, userId) => {
  return posts
    .filter (post => post.userId === userId)
    .map((post) => {
      const mPost = new Post(post);
      mPost.user = user._id;
      return mPost;
    })
}

postSchema.statics.bulkInsert = (posts) => {
  console.log("before bulk insert posts", posts);
  Post.collection.insertMany(posts);
 }
 

const Post = mongoose.model('Post', postSchema)

module.exports = Post
