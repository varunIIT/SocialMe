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
                $(`#comments-list-${data.data.comment.post}>ul`).prepend(newComment)
                //calling deleteComment to get event listener of delete work for newly created comment also
                deleteComment($(`#${data.data.comment._id} .delete-comment-button`))
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
    return `<li id="${comment._id}">
    <p>
        <span>${comment.content}</span><br>
        <small>${comment.user.name}</small>
        <small><a class="delete-comment-button" href="/comment/delete/${comment._id}">Delete</a></small>
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
            },
            error:(err)=>{ 
                console.log(`Error: ${err.responseText}`)
            }
        })
    })
}
deleteComment($('.delete-comment-button') )
