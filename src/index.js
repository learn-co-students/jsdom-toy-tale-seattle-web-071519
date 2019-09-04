const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", main)

function main(){
  fetchToys()
  let newToyForm = document.getElementById("add-toy-form")
  newToyForm.onsubmit = e =>{
    e.preventDefault()
      newName = e.target[0].value
      newImg = e.target[1].value
    e.target.reset()
    generateNewToy(newName, newImg)

    let newToyBox = document.getElementById("toy-collection")

    while (newToyBox.firstChild) {
      newToyBox.firstChild.remove()
    }

    fetchToys()
}}

function generateNewToy(){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // id: e.target.parentNode.id,
      name: newName,
      image: newImg,
      likes: 0
    })
  })
}


fetchToys = e => {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(results => generateToyCards(results))
}

generateToyCards = (toyArray) => {
  console.log(toyArray)
  let toyBox = document.getElementById("toy-collection")
  toyArray.forEach(toy => {
    let toySlot = document.createElement("div")
    toySlot.classList.add("card")
    toySlot.id = toy.id
    let toyName = document.createElement("h2")
    toyName.innerText = toy.name
    let toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.classList.add("toy-avatar")
    let toyLikes = document.createElement("p")
    toyLikes.innerText = parseInt(toy.likes) + " Likes"
    toyLikes.id = `likes${toy.id}`
    let likesBtn = document.createElement("button")
    likesBtn.innerText = "Like <3"
    likesBtn.classList.add("like-btn")

    likesBtn.onclick = () => {
      incrementLikes(toy)
    }

    toyBox.appendChild(toySlot)
    toySlot.appendChild(toyName)
    toySlot.appendChild(toyImg)
    toySlot.appendChild(toyLikes)
    toySlot.appendChild(likesBtn)
  })

  function incrementLikes(toy){
    return fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: ++toy.likes
    })
    }).then(response=>response.json()).then(results=>updateLikesCount(results))

  }
  function updateLikesCount(toy){
    let newToyLikes = document.getElementById(`likes${toy.id}`)
    newToyLikes.innerText = toy.likes + " Likes"
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
})


// OR HERE!
