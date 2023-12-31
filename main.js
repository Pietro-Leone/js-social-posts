'use strict'

//Creo l'array di oggetto
const posts = [{
    "id": 1,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/300?image=171",
    "author": {
        "name": "Phil Mangione",
        "image": "https://unsplash.it/300/300?image=15"
    },
    "likes": 80,
    "created": "2021-06-25"
}, {
    "id": 2,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=112",
    "author": {
        "name": "Sofia Perlari",
        "image": "https://unsplash.it/300/300?image=10"
    },
    "likes": 120,
    "created": "2021-09-03"
}, {
    "id": 3,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=234",
    "author": {
        "name": "Chiara Passaro",
        "image": "https://unsplash.it/300/300?image=20"
    },
    "likes": 78,
    "created": "2021-05-15"
}, {
    "id": 4,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=24",
    "author": {
        "name": "Luca Formicola",
        "image": null
    },
    "likes": 56,
    "created": "2021-04-03"
}, {
    "id": 5,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=534",
    "author": {
        "name": "Alessandro Sainato",
        "image": "https://unsplash.it/300/300?image=29"
    },
    "likes": 95,
    "created": "2021-03-05"
}
];

//dichiaro le altre variabili globali
const container = document.getElementById("container");
let counter = [];

//Ciclo For in cui stampo i singoli Post con tutte le informazioni estrapolate dall'array di oggetti
posts.forEach((post, i) => {

    const singleAuthor = post.author;
    const date = itDate(post)
    let propic = singleAuthor.image;
    let posts = document.createElement("div");

    posts.classList.add("post");
    posts.innerHTML = `<div class="post__header">
                            <div class="post-meta">
                                <div class="post-meta__icon">
                                    <img class="profile-pic" src="${propic}" alt="${singleAuthor.name}">
                                </div>
                                <div class="post-meta__data">
                                    <div class="post-meta__author">${singleAuthor.name}</div>
                                    <div class="post-meta__time">${date}</div>
                                </div>
                            </div>
                        </div>
                        <div class="post__text">${post.content}</div>
                        <div class="post__image">
                            <img src="${post.media}" alt="media">
                        </div>
                        <div class="post__footer">
                            <div class="likes js-likes">
                                <div class="likes__cta">
                                    <a class="like-button js-like-button" href="#0" data-postid="1">
                                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                        <span class="like-button__label">Mi Piace</span>
                                    </a>
                                </div>
                                <div class="likes__counter">
                                    Piace a <b id="like-counter-1" class="js-likes-counter">${post.likes}</b> persone
                                </div>
                            </div>
                        </div>`

    container.append(posts);
});

//Ciclo per il Button Like e per cambiare la propic se non è presente
posts.forEach((post, i) => {

    if (post.author.image === null) {
        const initials = nameLetter(post.author);
        const propic = initials;
        let divPropic = document.querySelectorAll(".post-meta__icon");
        const divPropicI = divPropic[i];
        divPropicI.innerHTML = ` <div class="profile-pic-default"><span>${propic}</span></div> `
    }

    let btnLike = document.querySelectorAll(".like-button");
    btnLike[i].addEventListener("click", function () {

        //il toggle restituisce un booleano
        let controllo = this.classList.toggle("like-button--liked");

        if (controllo === false) {
            let likeCounter = document.querySelectorAll(".js-likes-counter");
            likeCounter[i].innerHTML = post.likes;

            //Controllo se il like è già presente
            if (counter.indexOf(post.id) !== -1) {
                let positionId = counter.indexOf(post.id);
                counter.splice(positionId, 1)
            }
            console.log("-1");
        }
        else {
            let likeCounter = document.querySelectorAll(".js-likes-counter");
            likeCounter[i].innerHTML = post.likes + 1;

            //Controllo se il like è già presente
            if (counter.indexOf(post.id) !== -1) {
                let positionId = counter.indexOf(post.id);
                counter.splice(positionId, 1)
            }
            else {
                counter.push(post.id);
            }
            console.log("+1");
        }
        console.log("likes:", counter.length, "\nliked ID:", counter.toString());
    })

});

//Funzione che inverte la data e la trasforma in formato IT
function itDate(post) {

    const date = post.created;
    const dateSplit = date.split("-");
    dateSplit.reverse();
    const itDate = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
    return itDate;

}

//Funzione che in caso dell'assenza di una propic  crea un elemento di fallback contenente le iniziali dell'utente
function nameLetter(singleAuthor) {

    const nameSplit = singleAuthor.name.split(" ");
    const firstName = nameSplit[0][0];
    const lastName = nameSplit[1][0];
    const nameLetter = `${firstName} ${lastName}`
    return nameLetter;

}