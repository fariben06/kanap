//Création des articles via la liste (console)

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

//Les produits ont été récupérés via la console          

function addProducts(data) {
   data.forEach((Kanap) => {
   const { _id, imageUrl, altTxt, name, description } = Kanap
   const anchor = makeAnchor(_id)
   const article = document.createElement("article")
   const image = makeImage(imageUrl, altTxt)
   const h3 = makeH3(name)
   const p = makeParagraph(description)

   appendElementsToArticle(article, [image, h3, p])
   appendArticleToAnchor(anchor, article)
   })
}
     //fin de la liste de la gamme d'articles exclusifs
function appendElementsToArticle(article, array) {
    array.forEach((items) => {
        article.appendChild(items)
    })
}
    // Insertion de l'élément "a"
function makeAnchor(id) {
  const anchor = document.createElement("a")
  anchor.href = "./product.html?id" +id
  return anchor
}
    // Insertion de l'élément "article"
function appendArticleToAnchor(anchor, article) { 
     const items = document.querySelector("#items") 
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}
    // Insertion de l'image
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
}
    // Insertion du titre "h3"
function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
    // Insertion de la description "p"
function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}
