import {API} from './config.js'
import Request from './request.js'

const API_URL_article = `${API._HOST + API._DIR }articles`;
const API_URL_commentaire = `${API._HOST + API._DIR }commentaire`;

const userid = sessionStorage.getItem("user_id");
const token =  sessionStorage.getItem('token');

sessionStorage.setItem("token", token);
sessionStorage.setItem("user_id",userid);

function allArticle() {
    Request.call({
        headers : {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url : API_URL_article,
        status : 200
    }).then((result)=>{
        showArticle(result.result);
        enregistrerNewCommentaire();
    }).catch((result)=> {
    });
}
enregistrerNewCommentaire();
function enregistrerNewCommentaire() {
    var enregisterCommentaire = document.getElementsByClassName('enregisterCommentaire');
    for (let i = 0; i < enregisterCommentaire.length; i++) {
        enregisterCommentaire[i].addEventListener('click', function () {
            const json = {
                "Iduser": sessionStorage.getItem("user_id"),
                "commentaire":  document.getElementsByClassName('commentairetext')[i].value,
                "idArticle": document.getElementsByClassName('enregisterCommentaire')[i].value,
            };
            Request.call({
                status: 201,
                url: API_URL_commentaire,
                method: 'POST',
                headers: {



                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: JSON.stringify(json)
            }).then((result) => {
                let elts = document.getElementById('card');
                elts.innerHTML = "";
                allArticle();
            }).catch((result) => {
                alert('Veuillez recommencer')
            });
        });
    }
}

window.onload = function() {


    var url = new URL(window.location);
    var id = url.searchParams.get("id")
    var choix = url.searchParams.get("choix")
    // suppression d'un article
    if (id !== null && choix ==="delete") {
        const json = {
            "userId": sessionStorage.getItem("user_id"),
            "profil": sessionStorage.getItem("profil"),
            "IdArticle": id
        };
        Request.call({
            status: 400,
            url: API_URL_article + '/:id',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: JSON.stringify(json)
        }).then((result) => {
            window.location = "articles.html"
        }).catch((result) => {
            alert('Veuillez r€comm€nc€r')
        });
    }
// recherche et affichage modification d'un article
    if (id !== null && choix ==="modify") {
        Request.call({
            status: 200,
            url: API_URL_article + '/' +id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }).then((result) => {
            let elts = document.getElementById('card');
            elts.innerHTML = "";
            showOneArticle(result)
            // validation de la modification d'un article
            var boutton_validation_modification = document.getElementById('boutton_validation_modification');
            boutton_validation_modification.addEventListener('click',function () {
                var url = new URL(window.location);
                var id = url.searchParams.get("id")
                var form_data = new FormData();
                form_data.append("article",
                    JSON.stringify({
                        "userId": sessionStorage.getItem("user_id"),
                        "profil": sessionStorage.getItem("profil"),
                        "IdArticle": id,
                        "titre": document.getElementById('titreModifie').value,
                        "commentaire": document.getElementById('commentaireModifie').value,
                    })
                );
                form_data.append(
                    "images", document.getElementById('photoModifie').files[0]
                );
                Request.call({
                    method: 'PUT',
                    status: 200,
                    url: API_URL_article + '/' + id,
                    headers: {
                        'Authorization': token
                    },
                    data: form_data
                }).then((result) => {
                    window.location = "articles.html"
                }).catch((result) => {
                    alert('Veuillez recommencerrrr')
                });
            });
        }).catch((result) => {
            alert('Veuillez recommencerrRRRR')
        });
    }

}

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
        allArticle();
    }).catch((result) => {
      alert(result)
    });
});

// affiche des te avec les informations
function showArticle(Articles) {
    // création d'une carte pour chaque produit
    let elt = document.getElementById('card');
    for (let article of Articles) {

        var card = document.createElement("div");
        card.setAttribute("class", "card");

        var row = document.createElement("div");
        row.setAttribute("class","row");

        var auteurArticle = document.createElement("div");
        auteurArticle.setAttribute("class", "auteur col-lg-8");
        var auteur = document.createElement('h6');
        auteur.innerHTML = "Posté par "+article.lastName+ " " +article.firstName+" : "
        auteurArticle.append(auteur);
        row.append(auteurArticle);

if(article.id_user == sessionStorage.getItem("user_id") || sessionStorage.getItem("profil") === 'admin') {
    var modifsupp = document.createElement("div");
    modifsupp.setAttribute("class", "modifSupp col-lg-4");

    var modif = document.createElement("a");
    modif.setAttribute("id", "boutton_modification");
    modif.setAttribute("class", "btn btn-sm");
    modif.setAttribute("href", "articles.html?id=" + article.id_article + "&choix=modify");
    modif.innerHTML = "modifier";
    modifsupp.append(modif);
    var supp = document.createElement("a");
    supp.setAttribute("id", "boutton_suppression");
    supp.setAttribute("class", "btn btn-sm");
    supp.setAttribute("href", "articles.html?id=" + article.id_article + "&choix=delete");
    supp.innerHTML = "supprimer";
    modifsupp.append(supp);
    row.append(modifsupp);
}

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

        for (let commentaire of article.listecomment) {
             var afficheCommentaire = document.createElement('div');
             afficheCommentaire.setAttribute("class", "commentaire");
            var nomCommentaire = document.createElement('h6');
            nomCommentaire.innerHTML = "Commentaire de "+commentaire.lastName+ " " +commentaire.firstName+" : "
            var texteCommentaire = document.createElement('p');
            texteCommentaire.innerHTML = commentaire.commentaire;
            afficheCommentaire.append(nomCommentaire);
            afficheCommentaire.append(texteCommentaire);
             cardBody.append(afficheCommentaire);
         }

        var ajoutCommentaire = document.createElement("div");
        ajoutCommentaire.setAttribute("class", "ajoutCommentaire");

        var textCommentaire = document.createElement("textarea");
        textCommentaire.setAttribute("class", "commentairetext");
        textCommentaire.setAttribute("rows", "2");
        textCommentaire.setAttribute("cols", "50");
        textCommentaire.setAttribute("placeholder", "ajouter un commentaire");
        ajoutCommentaire.append(textCommentaire)

        var enregisterCommentaireArticle = document.createElement("button");
        enregisterCommentaireArticle.setAttribute("class", "btn enregisterCommentaire");
        enregisterCommentaireArticle.setAttribute("type", "submit");
        enregisterCommentaireArticle.setAttribute("id", "enregisterCommentaire");
        enregisterCommentaireArticle.innerHTML = "Ajouter";
        enregisterCommentaireArticle.value = article.id_article;
        ajoutCommentaire.append(enregisterCommentaireArticle);
        cardBody.append(ajoutCommentaire);

        card.append(row);
        card.append(img);
        card.append(cardBody);
        elt.append(card);
    }

}

function showOneArticle(Articles) {
    let elt = document.getElementById('bloc_modification_article');
    for (let article of Articles) {
        var post = document.createElement("div");
        post.setAttribute("class", "form-row");

        var postTitre = document.createElement("div");
        postTitre.setAttribute("class", "form-group col-md-12");

        var labelTitre = document.createElement("label");
        labelTitre.setAttribute("for", "titre");
        labelTitre.innerHTML = "titre";
        postTitre.append(labelTitre);

        var inputTitre = document.createElement("textarea");
        inputTitre.setAttribute("type", "text");
        inputTitre.setAttribute("name", "titre");
        inputTitre.setAttribute("id", "titreModifie");
        inputTitre.setAttribute("rows", "1");
        inputTitre.innerText = article.titre_article;
        postTitre.append(inputTitre);

        var postTexte = document.createElement("div");
        postTexte.setAttribute("class", "form-group col-md-12");

        var labelTexte = document.createElement("label");
        labelTexte.setAttribute("for", "commentaire");
        labelTexte.innerHTML = "commentaire";
        postTexte.append(labelTexte);

        var inputTexte = document.createElement("textarea");
        inputTexte.setAttribute("type", "text");
        inputTexte.setAttribute("cols", "60");
        inputTexte.setAttribute("rows", "4");
        inputTexte.setAttribute("name", "commentaire");
        inputTexte.setAttribute("id", "commentaireModifie");
        inputTexte.innerText = article.corps_article;
        postTexte.append(inputTexte);


        var postImg = document.createElement("div");
        postImg.setAttribute("class", "form-group col-md-12 img");
         var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", article.imageUrl);
        postImg.append(img);

        var divImg = document.createElement("div");

        var labelImg = document.createElement("label");
        labelImg.setAttribute("for", "photo");
        labelImg.innerHTML = "Choisir un nouveau fichier : ";
        divImg.append(labelImg);

        var inputImg = document.createElement("input");
        inputImg.setAttribute("type", "file");
        inputImg.setAttribute("name", "images");
        inputImg.setAttribute("accept", "image/png, image/jpeg");
        inputImg.setAttribute("id", "photoModifie");
        divImg.append(inputImg);

        var button = document.createElement("div");
        button.setAttribute("class", "button");

        var Annulation = document.createElement("a");
        Annulation.setAttribute("href", "articles.html");
        Annulation.setAttribute("class", "btn btn-sm font-weight-bold");
        Annulation.innerHTML = "Annuler";
        button.append(Annulation);
        var validation = document.createElement("button");
        validation.setAttribute("id", "boutton_validation_modification");
        validation.setAttribute("class", "btn btn-sm font-weight-bold");
        validation.innerHTML = "Valider";
        button.append(validation);

        post.append(postTitre);
        post.append(postTexte);
        post.append(postImg);
        post.append(divImg);
        post.append(button);
        elt.append(post);
    }
}

allArticle();
