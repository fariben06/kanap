//Récupération de l'id via les paramètres de l'url

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName 
}
    //Récupération de l'article grace a l'id + affichage des données de ce dernier

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

function handleData(kanap) {
    //Récupération des sélecteurs pour les futurs modifications
   
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}
//Récupération de l'article grace a l'id + affichage des données de ce dernier

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name) {
    // Insertion du titre h1
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price) {
    // Insertion du prix
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    // Insertion de la description "p"
    const p = document.querySelector("#description") // requête de document Description du sélecteur
    if (p != null) p.textContent = description
}
// fonction crée des couleurs
function makeColors(colors) {
    
    //Interroger les couleurs du sélecteur
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => { // couleurs pour chaque couleur
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option) // sélectionnez l'option d'ajout d'enfant
        })
    }
}
    // click Ajouté un article au panier 
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 
// poignée de la fonction Clic
function handleClick() {
    // requête Couleurs du sélecteur et quantité
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    //si la commande "couleur" "quantité"  n'est pas valide "return"
    if (isOrderInValid(color, quantity)) return
    saveOrder(color, quantity) // enregistre la couleur de la commande, et la quantité
    redirectToCart()  // rediriger vers le panier 
}
    // sauvegarder le detail de la commande
function saveOrder(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(key, JSON.stringify(data))
}
function isOrderInValid(color, quantity) {
     if (color == null || color === "" || quantity == null || quantity == 0) {
        //  alert("veuillez sélectionner une couleur et une quantité")
        alert("please select a color and quantity")
        return true // renvoie vrai
    }
}
function redirectToCart() {
    window.location.href = "cart.html"
}
