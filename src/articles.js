import {API} from './config.js'
import Request from './request.js'

const API_URL = `${API._HOST + API._DIR }articles`;

const token =  sessionStorage.getItem('token');

function request() {
    Request.call({
        headers : {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url : API_URL,
        status : 200
    }).then((result)=>{
        showArticle(result);
    }).catch((result)=> {

    });
}
request();

var nouvel_article = document.getElementById('nouvel_article');
nouvel_article.addEventListener('click',function () {
    document.getElementById('bloc_nouvel_article').style.display = "block";
});


// affiche des teddies avec les informations
function showArticle(Articles) {
    // création d'une carte pour chaque produit
    let elt = document.getElementById('card');
    for (let article of Articles) {

        var card = document.createElement("div");
        card.setAttribute("class", "card");

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", article.imageUrl);

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var contenu = document.createElement("div");
        contenu.setAttribute("class", "card-contenu");

        var title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerHTML = article.titre_article;
        contenu.append(title);

        var textDescription = document.createElement("p");
        textDescription.setAttribute("class", "card-text");
        textDescription.innerHTML = article.corps_article;
        contenu.append(textDescription);
        cardBody.append(contenu);

        /* for (let commentaire of Commentaires) {
             var afficheCommentaire = document.createElement('div');
             afficheCommentaire.setAttribute("class", "commentaire");
             afficheCommentaire.innerHTML = commentaire.commentaire;
             cardBody.append(afficheCommentaire);
         }*/

        var ajoutCommentaire = document.createElement("div");
        ajoutCommentaire.setAttribute("class", "ajoutCommentaire");

        var textCommentaire = document.createElement("textarea");
        textCommentaire.setAttribute("id", "commentaire");
        textCommentaire.setAttribute("rows", "2");
        textCommentaire.setAttribute("cols", "50");
        textCommentaire.setAttribute("placeholder", "ajouter un commentaire");
        textDescription.innerHTML = article.corps_article;
        ajoutCommentaire.append(textCommentaire)

        var enregisterCommentaire = document.createElement("a");
        enregisterCommentaire.setAttribute("class", "btn ");
        enregisterCommentaire.setAttribute("id", "enregisterCommentaire");
        enregisterCommentaire.innerHTML = "Ajouter";
        ajoutCommentaire.append(enregisterCommentaire);
        cardBody.append(ajoutCommentaire);

        card.append(img);
        card.append(cardBody);
        elt.append(card);
    }
}



