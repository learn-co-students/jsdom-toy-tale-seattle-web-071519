document.addEventListener('DOMContentLoaded', main)

function main(event){
  showToys()
}

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyURL = 'http://localhost:3000/toys'
let addToy = false

const submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', submitToy)
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



function showToys(){
  let div = document.getElementById('toy-collection')

  fetch(toyURL)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        let card = createCard(toy)
        div.appendChild(card)
      })
    })
}

function createCard(toy){
    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', toy.id)

    let h2 = document.createElement('h2')
    h2.textContent = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.classList.add('toy-avatar')

    let p = document.createElement('p')
    p.textContent = `${toy.likes} Likes`

    let btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.innerText = ' Like '
    btn.addEventListener('click', event => {
      toy.likes = parseInt(toy.likes) + 1
      p.textContent = `${toy.likes} Likes`
      incrementLikes(toy)
    })

    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)

    return card
}

function submitToy(event){
  let newName = document.getElementById('new-name').value
  let newImg = document.getElementById('new-img').value
  let toy = {
    'name': newName,
    'image': newImg,
    'likes': 0
  }
  createCard(toy)

  fetch(toyURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(toy)
  })

}


function incrementLikes(toy){
  fetch(`${toyURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
}


