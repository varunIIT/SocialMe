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
    return (`
    <li id="post-${post._id}">
        <p class="post-paragraph mt-3">
            <span>${post.content}</span><br>
            <small><i><a href="/user/profile/${post.user._id}">${post.user.name}</a></i></small><br>
            <small><a class="delete-post-button me-2" href="/post/delete/${post._id}"><i class="fas fa-trash-alt"></i></a></small>
            <small>
            <a class="sign-in-like" href="/like/toggle?id=${post._id}&type=Post"><i class="fas fa-thumbs-up"></i> <span>${post.likes.length}</span></a>
            </small>
        </p>
    
        <form class="new-comment-form" action="/comment/create" method="POST">
            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Comment here..." name="content" required style="background-color:lightyellow;">
                <input type="hidden" name="postId" value="${post._id}">
                <button class="btn btn-primary" type="submit" id="button-addon2">Comment</button>
            </div>
        </form>
        <div id="comments-list-${post._id}">
            <ul class="list-group ps-4">
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
