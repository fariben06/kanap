//Récupération de l'id via les paramètres de l'url
const orderId = getOrderId()
// affiche l'identifiant de la commande
displayOrderId(orderId)


// obtenir l'identifiant de la commande
function getOrderId() {
    // chaîne de requête = window.location.search
    const queryString = window.location.search
    // url Params = nouvelle chaîne de requête de paramètres de recherche d'URL
    const urlParams = new URLSearchParams(queryString)
    // renvoie les paramètres d'url pour obtenir l'identifiant de la commande
    return urlParams.get("orderId")
}


    // affiche l'identifiant de la commande
function displayOrderId(orderId) {
    // élément d'identification de la commande = document récupère l'élément par identifiant
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
