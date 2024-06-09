const url = 'https://jsonplaceholder.typicode.com/posts'

const loading = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const commentsContainer = document.querySelector("#comments-container")

// Get id from url
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')

// Get all posts
async function getAllPosts() {
    const res = await fetch(url)
    const data = await res.json()
    loading.classList.add('hide')
    data.map(post => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = post.title
        body.innerText = post.body
        link.innerText = "Ler"
        link.setAttribute("href", `/post.html?id=${post.id}`)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsContainer.appendChild(div)
    })
}

async function getPost(id) {
    try {
        // para mais de um fetch assíncrono, é melhor usar o Promise.all
        const [responsePost, responseComments] = await Promise.all([
            fetch(`${url}/${id}`), // buscar o post
            fetch(`${url}/${id}/comments`) // buscar os comentários do post acima
        ])

        const dataPost = await responsePost.json()
        const dataComments = await responseComments.json()

        loading.classList.add('hide')
        postPage.classList.remove('hide')

        const title = document.createElement('h1')
        const body = document.createElement('p')

        title.innerText = dataPost.title
        body.innerText = dataPost.body

        postContainer.appendChild(title)
        postContainer.appendChild(body)

        dataComments.map(comment => {
            const div = document.createElement("div")
            const email = document.createElement("h3")
            const commentBody = document.createElement("p")

            email.innerText = comment.email
            commentBody.innerText = comment.body

            div.appendChild(email)
            div.appendChild(commentBody)

            commentsContainer.appendChild(div)
        })

    } catch (error) {
        console.log(error)
    }
}

if (!postId) {
    getAllPosts()
} else {
    getPost(postId)
}