const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener("DOMContentLoaded", main)
const TOYS = 'http://localhost:3000/toys';

function main(){
  getToys()
}

getToys = () => {
    fetch(TOYS)
    .then(response => response.json())
    .then(toys => displayToys(toys));
}

displayToys = toys => {
  toys.forEach(toy => buildToyContent(toy)
  )
}


buildToyContent = toy => {
  let toyPane = document.getElementById("toy-collection")
  let toyCard = document.createElement("div")
  toyCard.classList.add("card")
  toyCard.id = toy.id

  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"

  let name = document.createElement("h2")
  name.innerText = toy.name

  let likes = document.createElement("p")
  likes.innerText = `This toy has ${toy.likes} likes`

  let button = document.createElement("button")
  button.classList.add('like-btn')
  button.innerText = "Like <3"
  button.onclick = (e) => {
    theLikening(toy)
    console.log(toy.likes)
  }
  toyPane.appendChild(toyCard)
  toyCard.appendChild(img)
  toyCard.appendChild(name)
  toyCard.appendChild(likes)
  toyCard.appendChild(button)
}

theLikening = toy => {
  return fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: ++toy.likes
    })
  })
  .then(response => response.json())
  .then(results => updateLikes(results))
}

updateLikes = results => {
  console.log(results.likes)
  console.log(document.getElementById(`${results.id}`).childNodes[2].innerText = `This toy has ${results.likes} likes` )
}
//1)event listener. line 57. 2) update backend = theLikening. 3) rerender dom =updateLikes.

let toyFarm = document.getElementById("add-toy-form")
console.log(toyFarm)
toyFarm.addEventListener("submit", e=> {
  e.preventDefault()
  addNewToy(e)
})

addNewToy = e => {
  console.log(e)
    fetch('http://localhost:3000/toys',{
        "method": "POST",
        headers: {
            "Content-Type": "application/json"
            // Accept: "application/json"
        },
        body: JSON.stringify({
            name: e.target[0].value,
            image: e.target[1].value,
            likes: 0
        })
    })
    .then(response => response.json())
    .then(result => buildToyContent(result));
}