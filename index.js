let users = []
let posts = []

async function fetchUsers(url) {
    let response = await fetch(url)
    let userList = await response.json()
    for(i = 0; i < 5; i++) {
        users.push(userList[i])
        console.log(userList[i].address)
    }
}

async function fetchPosts(url) {
    let response = await fetch(url)
    let postList = await response.json()
    for(i = 0; i < 100; i+=10) {
        posts.push(postList[i])
    }
}

function displayData() {
    for(let i = 0; i < users.length;i++) {
        let userDiv = document.createElement('div')
        userDiv.id = "users"
        userDiv.innerHTML = `
            <img src="https://i.pravatar.cc/150?img=${users[i].id}" id="pfp">
            <h3 class="heading">${users[i].name} (@${users[i].username})</h3>
            <p>${users[i].address.street}, ${users[i].address.city}, ZIP: ${users[i].address.zipcode}</p>
            <h3>Posts:</h3>
            <h4>${posts[i].title}</h4>
            <p>${posts[i].body}</p>
        `
        document.body.appendChild(userDiv)
    }

}

async function fetchDisplay() {
    // Fetch user and comment data concurrently
    const userPromise = fetchUsers('https://jsonplaceholder.typicode.com/users/');
    const commentPromise = fetchPosts('https://jsonplaceholder.typicode.com/posts');
    // Wait for both fetch requests to finish
    await Promise.all([userPromise, commentPromise]);
    displayData()
}

fetchDisplay()