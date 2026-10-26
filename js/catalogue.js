const searchInput = document.getElementById("shoeSearch");
const cards = document.querySelectorAll("#productGrid .card");
const searchCount = document.getElementById("searchCount");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const search = searchInput.value.trim().toLowerCase();
    let found = 0;

    cards.forEach(function (card) {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const match = title.includes(search);
        card.hidden = !match;
        if (match) found++;
    });

    searchCount.textContent = found + " products found";
    noResults.hidden = found !== 0;
});

const form = document.getElementById("favouriteForm");
const input = document.getElementById("favouriteInput");
const list = document.getElementById("favouriteList");
const count = document.getElementById("favouriteCount");
const error = document.getElementById("favouriteError");
let shoes = JSON.parse(localStorage.getItem("favouriteShoes") || "[]");

function showShoes() {
    list.textContent = "";
    shoes.forEach(function (name, index) {
        const item = document.createElement("li");
        const text = document.createElement("span");
        const remove = document.createElement("button");

        text.textContent = name;
        remove.textContent = "Remove";
        remove.type = "button";
        remove.addEventListener("click", function () {
            shoes.splice(index, 1);
            saveShoes();
        });

        item.appendChild(text);
        item.appendChild(remove);
        list.appendChild(item);
    });
    count.textContent = shoes.length;
}

function saveShoes() {
    localStorage.setItem("favouriteShoes", JSON.stringify(shoes));
    showShoes();
}

function addShoe(name) {
    if (name === "") {
        error.textContent = "Please enter a shoe name.";
        return;
    }
    error.textContent = "";
    shoes.push(name);
    saveShoes();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addShoe(input.value.trim());
    if (input.value.trim() !== "") input.value = "";
});

cards.forEach(function (card) {
    card.querySelector(".btn-buy").addEventListener("click", function () {
        addShoe(card.querySelector(".card-title").textContent.trim());
        document.getElementById("favourites").scrollIntoView({ behavior: "smooth" });
    });
});

showShoes();
