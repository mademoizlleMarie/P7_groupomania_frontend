import {API} from './config.js'
import Request from './request.js'

const API_URL_article = `${API._HOST + API._DIR }articles`;
const API_URL_commentaire = `${API._HOST + API._DIR }commentaire`;

const token =  sessionStorage.getItem('token');

function request() {
    Request.call({
        headers : {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url : API_URL_article,
        status : 200
    }).then((result)=>{
        showArticle(result);
        commentaire();

    }).catch((result)=> {

    });
}

function commentaire() {
    var enregisterCommentaire = document.getElementById('enregisterCommentaire');
    enregisterCommentaire.addEventListener('click', function () {
        const json = {
            "Iduser": sessionStorage.getItem("user_id"),
            "commentaire": document.getElementById('commentairetext').value,
            "idArticle": document.getElementById('enregisterCommentaire').value,
        };
        console.log(json);
        Request.call({
            status: 201,
            url: API_URL_commentaire ,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: JSON.stringify(json)
        }).then((result) => {
            alert('Commentaire bien ajouté')
        }).catch((result) => {
            alert('Veuillez recommencer')
        });
    });
}

request();

var nouvel_article = document.getElementById('nouvel_article');
nouvel_article.addEventListener('click',function () {
    document.getElementById('bloc_nouvel_article').style.display = "block";
});

var enregistrer_nouvel_article = document.getElementById('boutton_envoi');
enregistrer_nouvel_article.addEventListener('click',function () {
    var form_data = new FormData();
    form_data.append("article" ,
        JSON.stringify({
            "userId": sessionStorage.getItem("user_id"),
            "titre": document.getElementById('titre').value,
            "commentaire": document.getElementById('commentaire').value,
         })
    );
    form_data.append(
        "images", document.getElementById('photo').files[0]
    );
    Request.call({
        status : 201,
        method: 'POST',
        url: API_URL_article,
        headers : {
            'Authorization': token
        },
        data: form_data
    }).then((result) => {
        document.getElementById('bloc_nouvel_article').style.display = "none";
        let elts = document.getElementById('card');
        elts.innerHTML = "";
        request();
    }).catch((result) => {
      alert(result)
    });
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
        textCommentaire.setAttribute("id", "commentairetext");
        textCommentaire.setAttribute("rows", "2");
        textCommentaire.setAttribute("cols", "50");
        textCommentaire.setAttribute("placeholder", "ajouter un commentaire");
        ajoutCommentaire.append(textCommentaire)

        var enregisterCommentaireArticle = document.createElement("button");
        enregisterCommentaireArticle.setAttribute("class", "btn");
        enregisterCommentaireArticle.setAttribute("type", "submit");
        enregisterCommentaireArticle.setAttribute("id", "enregisterCommentaire");
        enregisterCommentaireArticle.innerHTML = "Ajouter";
        enregisterCommentaireArticle.value = article.id_article;
        ajoutCommentaire.append(enregisterCommentaireArticle);
        cardBody.append(ajoutCommentaire);

        card.append(img);
        card.append(cardBody);
        elt.append(card);
    }
}



