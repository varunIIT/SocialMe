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
            //calling deletePost to get event listener of delete work for newly created post also
            deletePost($(`#post-${data.data.post._id} .delete-post-button`))
            createCommentAJAX($(`#post-${data.data.post._id} .new-comment-form`))
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
        <small><a class="delete-post-button" href="/post/delete/${post._id}">Delete</a></small>
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
