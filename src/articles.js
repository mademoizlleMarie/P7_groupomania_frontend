import {API} from './config.js'
import Request from './request.js'

const API_URL = `${API._HOST + API._DIR }articles`;

const token =  sessionStorage.getItem('token');

Request.call({
    headers : {
        'Content-Type': 'application/json',
        'Authorization': token
    },
    url : API_URL
}).then((result)=>{
    showContent(result);
}).catch((result)=> {

    });


/*var getGroupomania = new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(JSON.parse(this.responseText));
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            reject(this.responseText);
        }
    };
    request.open("GET", API_URL );
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', token);
    request.send();
});
getGroupomania.then((result)=>{
    showContent(result);
});
getGroupomania.catch((result)=> {

});*/


// affiche des teddies avec les informations
function showContent(listeProduit) {

    // création d'une carte pour chaque produit
    let elt = document.getElementById('card');
    for (let produit of listeProduit) {

        var card = document.createElement("div");
        card.setAttribute("class", "card");

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", produit.imageUrl);

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerHTML = "Adoptez " + produit.titre_article;
        cardBody.append(title);

        var textDescription = document.createElement("p");
        textDescription.setAttribute("class", "card-text");
        textDescription.innerHTML = produit.corps_article;
        cardBody.append(textDescription);

        card.append(img);
        card.append(cardBody);
        elt.append(card);
    }
}

