const buttonPrompts = [
    "Next Cat",
    "Anotha One",
    "&#x1F4AF C-c-c-combo! &#x1F4AF",
    "Keep em comin &#x1F4AF",
    "&#x1f408",
    "&#x1F4AF",
    "More Cats! &#x1F4AF",
    "I need more! &#x1F525",
    "&#x1F525 ULTRA CAT &#x1F525"
];

/* DOMSTRINGS */

const nextCat = document.querySelector(".next-cat");
const heroCat = document.querySelector(".hero-cat");
const like = document.querySelector(".like");
const dislike = document.querySelector(".dislike");
const likesCollection = document.querySelector(".liked");
const dislikesCollection = document.querySelector(".disliked");
const reset = document.querySelector(".reset");
const votedCats = document.querySelector(".voted-cats");

/* XHR Helper */

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open(method, url);

        xhr.onload = () => res(xhr.response);

        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("x-api-key", "03b91cbc-62c6-404e-bd0d-50f4f680d98b");

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getCat = () => {
    sendHttpRequest("GET", "https://rocky-tundra-37502.herokuapp.com/cats").then(
        (res) => {
            heroCat.src = res[0].url;
            like.id = res[0].id;
            dislike.id = res[0].id;
        }
    );
    changeButton();
};

const getVotes = () => {
    sendHttpRequest("GET", "https://rocky-tundra-37502.herokuapp.com/votes").then((res) => {
        console.log(res);
        res.forEach((vote) => createCatDiv(vote.value, vote.image_id, vote.id));
    });
};

function likeCat() {
    sendHttpRequest("POST", "https://rocky-tundra-37502.herokuapp.com/votes", {
        image_id: this.id,
        value: 1
    });
    createCatDiv(1, this.id);
    getCat();
}

function dislikeCat() {
    sendHttpRequest("POST", "https://rocky-tundra-37502.herokuapp.com/votes", {
        image_id: this.id,
        value: -1
    });
    createCatDiv(-1, this.id);
    getCat();
}

/* Builds an element and appends it to cat collection */

const createCatDiv = (disposition, imageID, voteID) => {
    const catDiv = document.createElement("div");
    catDiv.classList.add("cat-wrapper");
    const catImg = document.createElement("img");
    catImg.classList.add("cat");
    catDiv.id = voteID;
    catDiv.appendChild(catImg);

    const url = "https://rocky-tundra-37502.herokuapp.com/cats/" + imageID;
    sendHttpRequest("GET", url).then((res) => {
        catImg.src = res.url;
    });

    if (disposition == 1) {
        likesCollection.appendChild(catDiv);
    } else if (disposition == -1) {
        dislikesCollection.appendChild(catDiv);
    }
};

/* Doesn't work :( */

// function deleteCat(id) {
//   sendHttpRequest("DELETE", 'https://api.thecatapi.com/v1/votes/' + id).then(res=>{
//     console.log(res);
//   });
// }

/* Also doesn't work, why? :( */

const clearVotes = () => {
    sendHttpRequest("GET", "https://rocky-tundra-37502.herokuapp.com/votes").then((res) => {
        res.forEach((vote) => {
            const url = "https://rocky-tundra-37502.herokuapp.com/votes/" + vote.id;
            sendHttpRequest("DELETE", url).then((res) => console.log(res));
        });
    });
    getVotes();
};

const changeButton = () => {
    nextCat.innerHTML = buttonPrompts[Math.floor(Math.random() * 9)];
};

document.addEventListener("DOMContentLoaded", (e) => {
    getCat();
    getVotes();
    nextCat.addEventListener("click", getCat);
    like.addEventListener("click", likeCat);
    dislike.addEventListener("click", dislikeCat);
    reset.addEventListener("click", clearVotes);
});
