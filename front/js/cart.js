const cart = []

retrievItemsFromCache()
cart.forEach((item) => displayItem(item))

// altTxt: "Photo d'un canapé jaune et noir, quattre places"
// color: "Black/Yellow"
// id: "415b7cacb65d43b2b5c1ff70f3393ad1"
// imageUrl: "http://localhost:3000/images/kanap02.jpeg"
// name: "Kanap Cyllène"
// price: 4499
// quantity: 2

function retrievItemsFromCache() {
  const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}

function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCartContent(item)
  article.appendChild(cardItemContent)
  displayArticle(article) 
  displayTotalQuantity(item)
}

function displayTotalQuantity(item) {
  const totalQuantity = document.querySelector("#totalQuantity")
  totalQuantity.textContent = item.quantity
}
function makeCartContent(item){
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")
  const description = makeDescription(item)
  const settings = makeSettings(item)
  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings)
  return settings
}
function addDeleteToSettings(settings) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  const p = document.createElement("p")
  p.textContent = "supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")
  
  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color;
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €";

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement('img')
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}


