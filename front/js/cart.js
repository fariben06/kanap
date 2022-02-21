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

//récupérer les éléments du cache
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
  // Insertion de l'élément "div" pour l'image produit
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCartContent(item)
  article.appendChild(cardItemContent)
  // afficher la quantité et le prix totale des articles
  displayArticle(article) 
  displayTotalQuantity()
  displayTotalPrice()
}
// Quantité totale d'articles au panier
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total 
}
// totale prix
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}
// créer un élément de contenu du panier
function makeCartContent(item){
   // Insertion de l'élément "div" pour la description produit
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")
  const description = makeDescription(item)
  const settings = makeSettings(item)
  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

function makeSettings(item) {
  // Insertion de l'élément "div"
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
  //ajouter les paramètres Quantité aux paramètres, "élément"
  addQuantityToSettings(settings, item)
  // ajouter les paramètres de suppression aux paramètres
  addDeleteToSettings(settings, item)
  return settings
}
function addDeleteToSettings(settings, item) {
  // Insertion de l'élément "div"
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))
  // Insertion de "p" supprimer
  const p = document.createElement("p")
  p.textContent = "supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
// enregistrer l'id et la couleur séléctionnés par le bouton supprimer
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color)
cart.splice(itemToDelete, 1)
displayTotalPrice()
displayTotalQuantity()
deleteDataFromCache(item)
deleteArticleFromPage(item)
}
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
    // filtrer l'élément cliqué par le bouton supprimer
}
function addQuantityToSettings(settings, item) {
  // Insertion de l'élément "div"
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
   // Insertion de "Qté : "
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  // Insertion de la quantité
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  // mise à jour de l'ID d'article de prix et de quantité, entrée. valeur, "article"
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
  quantity.appendChild(input)
  settings.appendChild(quantity)
}
// mise à jour l'id du prix et la quantité, nouvelle valeur, article
function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}
// enregistrer les nouvelles données dans le cache "élément"
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}
// Insertion de l'élément "div" pour la description produit
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")
   // Insertion du titre h2
  const h2 = document.createElement("h2")
  h2.textContent = item.name
  // Insertion de la couleur
  const p = document.createElement("p")
  p.textContent = item.color;
   // Insertion du prix
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €";
  // ajout de la description Enfant h2, p, p2
  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}
// Création de la balise "article" et insertion dans la section
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  // couleur de l'ensemble de données d'article
  article.dataset.color = item.color
  return article
}

function makeImageDiv(item) {
  // Insertion de l'élément "div" pour l'image produit
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  // Insertion de l'image
  const image = document.createElement('img')
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}


