const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", main)
function main() {
  fetchToys()
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toysData => displayToys(toysData))
  .catch(errors => console.log(errors))
}

displayToys = (toysData) => {
  // debugger
  let toyCollection = document.querySelector("#toy-collection")
  let addToyForm = document.querySelector(".add-toy-form")
  addToyForm.addEventListener("submit", fetchPostToy)
  while (toyCollection.firstChild) {
    toyCollection.firstChild.remove()
  }
  toysData.forEach(toy => {
    let toyCard = document.createElement("div")
    toyCard.className = "card"
    
    let toyName = document.createElement("h2")
    toyName.innerText = toy.name

    let toyPic = document.createElement("img")
    toyPic.src = toy.image
    toyPic.className = "toy-avatar"

    let toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes} Likes`

    let likeBtn = document.createElement("button")
    likeBtn.innerText = "Like"
    likeBtn.addEventListener("click", likeToy(toy))


    //append stuff

    toyCard.appendChild(toyName)
    toyCard.appendChild(toyPic)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(likeBtn)
    toyCollection.appendChild(toyCard)

  })
}

function likeToy(toy) {
  return function(e) {
    // console.log(toy)
    let toyId = toy.id
    let toyLikes = toy.likes + 1
    debugger
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toyLikes
      })
    }).catch(errors => console.log(errors))
    .then(response => {
      fetchToys()
    })
  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
  // debugger
  // addNewToy
})


// OR HERE!
function fetchPostToy(e) {
  debugger
  let toyName = e.target.children[1].value
  let toyPic = e.target.children[3].value 
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyPic, 
      likes: 0
    })
  }).then(response => response.json())
  .then(toyData => console.log(toyData))
  .catch(errors => console.log(errors))
}