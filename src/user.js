import {API} from './config.js'
import Request from './request.js'

const API_URL = `${API._HOST + API._DIR }auth`;

var login = document.getElementById('LOGIN');
login.addEventListener('click',function () {
    const json = {
        "email": document.getElementById('emailLogin').value,
        "password": document.getElementById('passwordLogin').value
    };
    Request.call({
        method : 'POST',
        url : API_URL + '/login',
        headers : {
            'Content-Type': 'application/json',
        },
        data : JSON.stringify(json)
    }).then((result)=>{
        sessionStorage.setItem("token",'bearer ' + JSON.parse(result).token);
        sessionStorage.setItem("user_id", JSON.parse(result).userId);
        window.location = "articles.html";
    }).catch((result)=> {
        alert('utilisateur introuvable')
    });
});

    var signup = document.getElementById('enregistrement');
signup.addEventListener('click',function () {
        const json = {
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value,
            "firstName": document.getElementById('firstName').value,
            "lastName": document.getElementById('lastName').value
        };
        Request.call({
            method : 'POST',
            url : API_URL + '/signup',
            headers : {
                'Content-Type': 'application/json',
            },
            data : JSON.stringify(json),
            statut : 400
        }).then((result)=>{
            alert('utilisateur crée')
        }).catch((result)=> {
            alert(result)
        });
    });

    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

var deconnexion = document.getElementById('deconnexion');
deconnexion.addEventListener("click",sessionStorage.clear())




