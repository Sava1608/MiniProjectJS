let postID = new URL(location.href).searchParams.get('id');
let postID2 = new URL(location.href).searchParams.get('postId')
let postURL = `https://jsonplaceholder.typicode.com/users/${postID}/posts`;
fetch(postURL).then(res => res.json())
    .then(postData => {
        let postInfo = document.getElementById('info-posts');
        let div = document.createElement('div');
        let ul = document.createElement('ul')
        for (let i = 0; i < postData.length; i++) {
            const element = postData[i];
            console.log(element.id)
            if(`${element.id}` === postID2){
                let li = document.createElement('li')
                let p = document.createElement('p')
                let p2 = document.createElement('p')
                li.innerText =`User ID: (${element.userId}) ID: (${element.id})`
                p.innerText =`Title: (${element.title})`
                p2.innerText =`Body: (${element.body})`
                ul.append(li,p,p2)
            }
            div.appendChild(ul)
            postInfo.appendChild(div)
        }
        let button = document.createElement('button')
        button.addEventListener('click', ()=>{
            let commentsURL =`https://jsonplaceholder.typicode.com/posts/${postID2}/comments`
            fetch(commentsURL).then(res => res.json())
                .then(commentsData =>{
                    let ul = document.createElement('ul')
                    for (let i = 0; i < commentsData.length; i++) {
                        let comData = commentsData[i];
                        let li = document.createElement('li')
                        let p1 =document.createElement('p')
                        let p2 = document.createElement('p')
                        let p3 = document.createElement('p')
                        p1.innerText = `Post ID: (${comData.postId}) ID: (${comData.id})`;
                        p2.innerText = `Name: (${comData.name}) Email@: (${comData.email})`
                        p3.innerText = `Body: (${comData.body})`
                        li.append(p1,p2,p3)
                        ul.appendChild(li)
                    }
                    postInfo.appendChild(ul)
                })
        })
        button.innerText = 'Comments'
        postInfo.appendChild(button)
    })