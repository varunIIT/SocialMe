let newCommentForm=$('.new-comment-form')
//method to submit form data for new comment by AJAX
 let createCommentAJAX=(newCommentLink)=>{
    newCommentLink.on('submit',function(e){// not using arrow function because 'this' will refer to global instead of selector
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/comment/create',
            data:$(this).serialize(),
            success:(data)=>{
                // console.log(data)
                const newComment=createNewComment(data.data.comment)
                notify(data)
                $(`#comments-list-${data.data.comment.post}>ul`).prepend(newComment)
                //defining event listeners to links of newly created post also to function those features such as delete,like
                deleteComment($(`#${data.data.comment._id} .delete-comment-button`))
                likeEventListener($(`#${data.data.comment._id} .sign-in-like`))
            },
            error:(err)=>{
                console.log(err.responseText)
            }
    
        })
    })
 }
createCommentAJAX(newCommentForm)

//method to create comment in DOM
const createNewComment=(comment)=>{
    return `
    <li id="${comment._id}" class="list-group-item p-0" style="width: 70%;">
        <p class="comment-paragraph">
            <span>${comment.content}</span><br>
            <small><i><a href="/user/profile/${comment.user._id}">${comment.user.name}</a></i></small>
            <span style="float: right;">
                <small><a class="delete-comment-button me-2" href="/comment/delete/${comment._id}"><i class="fas fa-trash-alt"></i></a></small>
                <small><a class="sign-in-like" href="/like/toggle?id=${comment._id}&type=Comment"><i class="fas fa-thumbs-up"></i> <span>${comment.likes.length}</span></a></small>
            </span>
        </p>
    </li>`
}


let deleteComment=(deleteCommentButton)=>{
    deleteCommentButton.on('click',function(e){
        e.preventDefault()
        $.ajax({
            type:'get',
            url:$(this).prop('href'),
            success:(data)=>{
                $(`#${data.data.comment_id}`).remove()
                notify(data)
            },
            error:(err)=>{ 
                console.log(`Error: ${err.responseText}`)
            }
        })
    })
}
deleteComment($('.delete-comment-button') )
