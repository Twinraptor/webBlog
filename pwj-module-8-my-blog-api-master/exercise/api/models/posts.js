const PATH = "./data.json"
const fs = require("fs");


class Post{
    getAllPosts(){
        return this.readData();
    }

    getOnePost(id){
        let posts = this.readData();
        let foundPost= posts.find((posts)=> posts.id == id );
        return foundPost;
    }

    addPost(newPost) {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData()  {
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }
    storeData(rawdata) {
        let data = JSON.stringify(rawdata);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;