let URL = 'https://jsonplaceholder.typicode.com/users';

function getUsers(url){
    fetch(url).then(res => res.json())
        .then(data => {
            console.log(data);
            renUsers(data);
        })
}
function renUsers(users){
    let user = document.getElementById('users');
    user.innerHTML = '';
    for (let userElement of users) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let button = document.createElement('button');
        p.innerText = `id: ${userElement.id}. Name: ${userElement.name}`
        button.addEventListener('click',() => {
            location.href='user-details.html?id='+userElement.id;
        });
        button.innerText ='Click to Change Info'
        div.append(p,button);
        user.appendChild(div);
    }
}
getUsers(URL);