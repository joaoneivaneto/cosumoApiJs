const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector('#loading')
const postsContainer = document.querySelector('#post-container')


const postpage = document.querySelector('#post')
const postContainer = document.querySelector('#post-container')
const commentsContainer= document.querySelector('#comments-container')

const commentForm = document.querySelector('#comment-form')
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector("#body")

//get id form url
const UrlSeachParams = new URLSearchParams(window.location.search);
const postId = UrlSeachParams.get("id")

//get alll post
 async function getAllPosts(id){
    const response = await fetch(url)

    console.log(response)
    
    const data = await response.json();

    console.log(data)

    loadingElement.classList.add("hide");

    data.map((post) =>{
        const div = document.createElement("div")
        const title= document.createElement("h2")
        const body= document.createElement("p")
        const link= document.createElement("a")

        title.innerText = post.title
        body.innerText = post.body
        link.innerText="ler"
        link.setAttribute("href", `/post.html?id=${post.id}`)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsContainer.appendChild(div)
        

    })
}
// get individual post
async function getpost(id){
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])
    const dataPost = await responsePost.json()

    const dataComments = await responseComments.json()

    loadingElement.classList.add("hide")
    postpage.classList.remove("hide")
    
    const title = document.createElement("h1");
    const body = document.createElement("p")

    title.innerHTML = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    console.log(dataComments)
    dataComments.map((comment)=>{
        createComment(comment)
    })
}

function createComment(comment){
    const div = document.createElement("div")
    const email = document.createElement("h3")
    const commentBody = document.createElement("p")

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    commentsContainer.appendChild(div);

}

async function postComment(comment){
    const response = await fetch(`${url}/${postId}/comments`,{
        method:"post",
        body: comment,
        headers:{
            "content-type":"application/json",
        }
    })
    data = await response.json()
    createComment(data)
}
if(!postId){
    getAllPosts()
}
else{
    getpost(postId)

    //add event
    commentForm.addEventListener("submit",(e) =>{
        e.preventDefault()

        let comment ={
            email: emailInput.value,
            body: bodyInput.value
        }

       comment = JSON.stringify(comment)

       postComment(comment)
    })

}
