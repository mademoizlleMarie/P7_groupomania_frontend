import {API} from './config.js'
import Request from './request.js'

const API_URL = `${API._HOST + API._DIR }auth`;


$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var login = document.getElementById('LOGIN');
login.addEventListener('click',function () {
    const json = {
        "email": document.getElementById('username').value,
        "password": document.getElementById('password').value
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

   /* var Login = new Promise((resolve, reject) => {

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                reject(this.responseText);
            }
        };
        request.open("POST", API_URL + '/login');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(json));
    });

    Login.then((result) => {
        sessionStorage.setItem("token",'bearer ' + JSON.parse(result).token);
        sessionStorage.setItem("user_id", JSON.parse(result).userId);
        window.location = "articles.html";
    });
    Login.catch((result) => {
       alert('utilisateur introuvable')
    });*/
});
