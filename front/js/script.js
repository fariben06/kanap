//Création des articles via la liste (console)

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
//Les produits ont été récupérés via la console    

//altTxt: "Photo d'un canapé bleu, deux places"
//colors: (3) ['Blue', 'White', 'Black']
//description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
// mollit anim id est laborum."
//imageUrl: "http://localhost:3000/images/kanap01.jpeg"
//name: "Kanap Sinopé"
//price: 1849
//_id: "107fb5b75607497b96722bda5b504926"

// fonction ajouter des données produits
function addProducts(data) {
   //const _id = Kanap[0]._id
   //const imageUrl = Kanap[0].imageUrl
   //const altTxt = Kanap[0].altTxt
   //const name = Kanap[0].name
   //const description = Kanap[0].description
   
   data.forEach((Kanap) => {
   const { _id, imageUrl, altTxt, name, description } = Kanap
   const anchor = makeAnchor(_id)
   const article = document.createElement("article")
   const image = makeImageDiv(imageUrl, altTxt)
   const h3 = makeH3(name)
   const p = makeParagraph(description)

   appendElementsToArticle(article, [image, h3, p])
   appendArticleToAnchor(anchor, article)
   })
}

function appendElementsToArticle(article, array) {
    array.forEach((items) => {
        article.appendChild(items)
    })
     //article.appendChild(image)
     //article.appendChild(h3)
     //article.appendChild(p)
}

    // Insertion de l'élément "a"
function makeAnchor(id) {
  const anchor = document.createElement("a")
  anchor.href = "./product.html?id=" +id
  return anchor
}
  // fonction ajoute l'article à l'ancre
  // Insertion de l'élément "article"
function appendArticleToAnchor(anchor, article) { 
     const items = document.querySelector("#items") 
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

 // Insertion de l'image
function makeImageDiv(imageUrl, altTxt) {
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
