let signInLike=$('.sign-in-like')
let likeEventListener=(signInLike)=>{
    signInLike.on('click',function(e) {
        e.preventDefault()
        $.ajax({
            type:'get',
            url:$(this).prop('href'),
            success:(data)=>{
                let countElement=$(this).find('span')
                let count= parseInt(countElement.text())
                if(data.data.liked==1){//post is liked and increase the count
                    countElement.text(count+1)
                }
                else{
                    countElement.text(count-1)// post is unliked and thus decrease the count
                }
            },
            error:(err)=>{
                console.log(`Error: ${err.responseText}`)
            }
        })
    })
}
likeEventListener(signInLike)