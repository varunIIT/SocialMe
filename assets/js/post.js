let newPostForm=$('#new-post-form')
//method to submit form data for new post by AJAX
newPostForm.on('submit',(e)=>{
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/post/create',
        data:newPostForm.serialize(),
        success:(data)=>{
            //console.log(data)
            const newPost=newPostDom(data.data.post)
            $('#posts-list>ul').prepend(newPost)
            notify(data)
            //defining event listeners to links of newly created post also to function those features such as delete,comment,like
            deletePost($(`#post-${data.data.post._id} .delete-post-button`))
            createCommentAJAX($(`#post-${data.data.post._id} .new-comment-form`))
            likeEventListener($(`#post-${data.data.post._id} .sign-in-like`))
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
        <small>${post.user.name}</small><br>
        <small><a class="delete-post-button" href="/post/delete/${post._id}">Delete</a></small>
        <small>
            <a class="sign-in-like" href="/like/toggle?id=${post._id}&type=Post">Likes <span>${post.likes.length}</span></a>
        </small>
    </p>
    
    <form class="new-comment-form" action="/comment/create" method="POST">
        <input type="text" name="content" id="" placeholder="comment here..." required>
        <input type="hidden" name="postId" id="" value="${post._id}">
        <button type="submit">Comment</button>
    </form>
    <div id="comments-list-${post._id}">
        <ul>
        </ul>
    </div>
</li>`)
}
//method to delete post from dom
let deletePost=(deleteLink)=>{
    deleteLink.on('click',function(e){// not using arrow function because 'this' will refer to global instead of selector
        e.preventDefault()
        $.ajax({
            type:'get',
            url: $(this).prop('href'),
            success:(data)=>{
                $(`#post-${data.data.post_id}`).remove()
                notify(data)
            },
            error:(err)=>{ 
                console.log(`Error: ${err.responseText}`)
            }
        })
    })
}
deletePost($('.delete-post-button'))
