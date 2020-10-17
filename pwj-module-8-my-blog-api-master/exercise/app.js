const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(rew, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
  }
})
const getExt = (mimeType) => {
  switch(mimeType){
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
    case "image/bmp":
      return ".bmp";
    default :
      return ".jpg"
  }
}

const upload = multer({ storage: storage});
const app = express();
const PORT = 3000;
const Post = require("./api/models/posts");
const postsData = new Post();



app.use(express.json())

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  next()
})

app.use('/uploads', express.static("uploads"))

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

app.post('/api/posts', upload.single("post-image"), (req,res) => {
  console.log(req.body)
  console.log(req.file)
  const newPost = {
    "id" : `${Date.now()}`,
    "title": req.body.title,
    "post_image": `uploads/${req.file.filename}`,
    "content" :req.body.content,
    "added_date": `${Date.now()}`
  }

  postsData.addPost(newPost)
  res.status(201).send("ok")
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
