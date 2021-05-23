let newPostForm=$('#new-post-form')

//method to submit form data for new post by AJAX
newPostForm.on('submit',(e)=>{
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/post/create',
        data:newPostForm.serialize(),
        success:(data)=>{
            console.log(data)
            $('#posts-list>ul').prepend(newPostDom(data.data.post))
        },
        error:(err)=>{
            console.log(`Error: ${err.responseText}`)
        }
    })
})
//method to create post in DOM
let newPostDom=(post)=>{
    return (`<li id="post-${post._id}">
    <p>
        <span>${post.content}</span><br>
        <small>${post.user.name}</small>
        <small class="delete-post-button"><a href="/post/delete/${post._id}">Delete</a></small>
    </p>
    <form action="/comment/create" method="POST">
        <input type="text" name="content" id="" placeholder="comment here..." required>
        <input type="hidden" name="postId" id="" value="${post._id}$">
        <button type="submit">Comment</button>
    </form>
    <div id="comments-list-${post.id}">
        <ul>
        </ul>
    </div>
</li>`)
}