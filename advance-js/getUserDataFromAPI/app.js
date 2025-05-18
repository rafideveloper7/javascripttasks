const form = document.getElementById("form");
const search = document.getElementById("search-input");
const userData = document.getElementById("user-info");
const userPost = document.getElementById("user-posts");

// form.addEventListener("submit", (event) => {
//     event.preventDefault() // stop page from reloading

//     const userId = search.value.trim()
//     if (isNaN(userId) || userId === "") {
//         alert("Please enter a valid number");
//         return;
//     }

//     // clear old data
//     userData.innerHTML = "";
//     userPost.innerHTML = "";

//     // get user info
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         .then(response => response.json())
//         .then(user => {
//             const li1 = document.createElement("li")
//             li1.textContent = `ID: ${user.id}`

//             const li2 = document.createElement("li")
//             li2.textContent = `Name: ${user.name}`

//             const li3 = document.createElement("li")
//             li3.textContent = `Email: ${user.email}`

//             userData.appendChild(li1)
//             userData.appendChild(li2)
//             userData.appendChild(li3)

//             return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
//         })
//         .then(response => response.json())
//         .then(posts => {
//             posts.forEach(post => {
//                 const li = document.createElement("li")
//                 li.className = "get-post"
//                 li.innerHTML = `<span><strong>${post.title}</strong></span>${post.body}`
//                 userPost.appendChild(li)
//             })
//         })
//         .catch(error => {
//             userData.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`
//         })
// });


form.addEventListener("submit", (event) => {
    event.preventDefault() // stop page from reloading

    const userId = search.value.trim()
    if (isNaN(userId) || userId === "") {
        alert("Please enter a valid number");
        return;
    }

    // clear old data
    userData.innerHTML = "";
    userPost.innerHTML = "";

    // get user info
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const li1 = document.createElement("li")
            li1.textContent = `ID: ${user.id}`

            const li2 = document.createElement("li")
            li2.textContent = `Name: ${user.name}`

            const li3 = document.createElement("li")
            li3.textContent = `Email: ${user.email}`

            userData.appendChild(li1)
            userData.appendChild(li2)
            userData.appendChild(li3)

            return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        })
        .then(response => response.json())
        .then(posts => {
            userPost.innerHTML = ""; // Clear previous posts
            // Create a container for rows
            for (let i = 0; i < posts.length; i += 2) {
                const rowDiv = document.createElement("div");
                rowDiv.className = "post-row";

                for (let j = i; j < i + 2 && j < posts.length; j++) {
                    const post = posts[j];
                    const postDiv = document.createElement("div");
                    postDiv.className = "post-card";

                    const title = document.createElement("div");
                    title.className = "post-title";
                    title.innerHTML = `<strong>${post.title}</strong>`;

                    const body = document.createElement("div");
                    body.className = "post-body";
                    body.textContent = post.body;

                    postDiv.appendChild(title);
                    postDiv.appendChild(body);
                    rowDiv.appendChild(postDiv);
                }
                userPost.appendChild(rowDiv);
            }
        })
        .catch(error => {
            userData.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`
        })
});
