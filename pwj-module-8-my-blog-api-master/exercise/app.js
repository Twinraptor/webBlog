const express = require("express");

const app = express();
const PORT = 3000;
const Post = require("./api/models/posts");
const postsData = new Post();


app.get('/api/posts', (req,res) => {
  res.status(200).send(postsData.getAllPosts());
})
app.get('/api/posts/:post_id', (req,res) => {
  let id= req.params.post_id
  let foundPost = postsData.getOnePost(id);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Not Found");
  }
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
