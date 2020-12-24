import {API} from './config.js'
import Request from './request.js'

const API_URL = `${API._HOST + API._DIR }auth`;

const userid = sessionStorage.getItem("user_id");
const token =  sessionStorage.getItem('token');

function profil() {
    const json = {
        "id_user": sessionStorage.getItem("user_id"),
    };
    Request.call({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: API_URL + '/findOneUser',
        status: 200,
        method: 'POST',
        data: JSON.stringify(json)
    }).then((response) => {
        showprofil(response);
        buttonSuppValid();
    }).catch((result) => {
    });
}

function buttonSuppValid() {
    var enregistrerProfil = document.getElementById('boutton_validation_modification');
    enregistrerProfil.addEventListener('click', function () {
        const json = {
            "id_user": userid,
            "email": document.getElementById('email').value,
            "firstName": document.getElementById('firstName').value,
            "lastName": document.getElementById('lastName').value
        };
        Request.call({
            status: 200,
            method: 'PUT',
            url: API_URL + '/updateProfil',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(json)
        }).then((result) => {
            alert('Votre profil est bien été mis à jour')
        }).catch((result) => {
            alert('Merci de recommencer')
        });
    });

    var boutton_suppression = document.getElementById('boutton_suppression');
    boutton_suppression.addEventListener('click', function () {
        const json = {
            "id_user": userid,
        };
        Request.call({
            status: 200,
            method: 'PUT',
            url: API_URL + '/deleteProfil',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(json)
        }).then((result) => {
            window.location = "index.html";
        }).catch((result) => {
            alert('Merci de recommencer')
        });
    });
}

profil();

function showprofil(profils) {

    let elt = document.getElementById('Profil');
    for (let profil of profils) {
        var DivProfil = document.createElement("div");
        DivProfil.setAttribute("class", "form-row");

        var email = document.createElement("div");
        email.setAttribute("class", "form-group col-md-12");

        var labelEmail = document.createElement("label");
        labelEmail.setAttribute("for", "titre");
        labelEmail.innerHTML = "Email : ";
        email.append(labelEmail);

        var inputEmail = document.createElement("input");
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("name", "email");
        inputEmail.setAttribute("id", "email");
        inputEmail.setAttribute("size", "30");
        inputEmail.setAttribute("value", profil.email);
        email.append(inputEmail);

        var postNom = document.createElement("div");
        postNom.setAttribute("class", "form-group col-md-12");

        var labelNom = document.createElement("label");
        labelNom.setAttribute("for", "nom");
        labelNom.innerHTML = "Votre Nom : ";
        postNom.append(labelNom);

        var inputlastName = document.createElement("input");
        inputlastName.setAttribute("type", "text");
        inputlastName.setAttribute("name", "nom");
        inputlastName.setAttribute("size", "30");
        inputlastName.setAttribute("id", "firstName");
        inputlastName.setAttribute("value", profil.firstName);
        postNom.append(inputlastName);

        var postPrenom = document.createElement("div");
        postPrenom.setAttribute("class", "form-group col-md-12");

        var labelPrenom = document.createElement("label");
        labelPrenom.setAttribute("for", "prenom");
        labelPrenom.innerHTML = "Votre Prénom : ";
        postPrenom.append(labelPrenom);

        var inputfirstName = document.createElement("input");
        inputfirstName.setAttribute("type", "text");
        inputfirstName.setAttribute("name", "prenom");
        inputfirstName.setAttribute("size", "30");
        inputfirstName.setAttribute("id", "lastName");
        inputfirstName.setAttribute("value", profil.lastName);
        postPrenom.append(inputfirstName);

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
        validation.innerHTML = "Modifier";
        button.append(validation);
        var suppression = document.createElement("button");
        suppression.setAttribute("id", "boutton_suppression");
        suppression.setAttribute("class", "btn btn-sm font-weight-bold");
        suppression.innerHTML = "suppression";
        button.append(suppression);

        DivProfil.append(email);
        DivProfil.append(postNom);
        DivProfil.append(postPrenom);
        DivProfil.append(button);

        elt.append(DivProfil);
    }
}
