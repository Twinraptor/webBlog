

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method:'GET'

    }).then((response)=> {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    let blogPostsContent = '';
    console.log(blogPosts)
    for(blogPost of blogPosts) {
        postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        const postImage= `${API_BASE_URL}${blogPost.post_image}`
        blogPostsContent +=
        `<div class="blogpost">
            <div class="blogpost-image" style="background-image: url('${postImage}')"></div>
            <div class="blogpost-content">
                <div class="blogpost-date">${postDate}</div>
                <div class="blogpost-title">${blogPost.title}</div>
                <div class="blogpost-preview">
                    ${blogPost.content}
                </div>
            </div>
        </div>`
    }
    document.querySelector('.blog-Posts').innerHTML = blogPostsContent;
}