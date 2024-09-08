let ID = new URL(location.href).searchParams.get('id');
let userURL = 'https://jsonplaceholder.typicode.com/users/'+ID;
fetch(userURL).then(res => res.json())
    .then(userData => {
        console.log(userData);
        let infoBlock = document.getElementById('infoUser')
        let div = document.createElement('div')
        for (let userDatum in userData) {
            let p = document.createElement('p')
            if(userDatum === 'address' || userDatum === 'company'){
                for (let element in userData[userDatum]) {
                    let p1 = document.createElement('p');
                    if(typeof userData[userDatum][element] === 'object' && userData[userDatum][element] !== null){
                        for(let geo in userData[userDatum][element]){
                            let p2 = document.createElement('p')
                            p2.innerText = `${element}:${geo}: (${userData[userDatum][element][geo]})`
                            div.appendChild(p2)
                            infoBlock.appendChild(div)
                        }
                    }else {
                        p1.innerText = `${element}: (${userData[userDatum][element]})`
                        div.appendChild(p1);
                        infoBlock.appendChild(div);
                    }
                }
            }else {
                p.innerText = `${userDatum}: (${userData[userDatum]})`
                div.appendChild(p);
                infoBlock.appendChild(div);
            }
        }
        let button = document.createElement('button')
        button.addEventListener('click', ()=> {
            let titleURL = `https://jsonplaceholder.typicode.com/users/${ID}/posts`
            fetch(titleURL).then(res => res.json())
                .then(titleData =>{
                    let ul = document.createElement('ul')
                    for (let i = 0; i < titleData.length; i++) {
                        const title = titleData[i];
                        console.log(title.title)
                        let li = document.createElement('li');
                        let click = document.createElement('button')
                        click.addEventListener('click', ()=>{
                            location.href=`post-details.html?id=${title.userId}&postId=${title.id}`
                        })
                        click.innerText ='Posts'
                        li.innerText = `${title.id}: ${title.title}`
                        ul.append(li,click)

                    }
                    infoBlock.appendChild(ul)
                })
        })
        button.innerText = 'post of current user'
        infoBlock.appendChild(button)
    })