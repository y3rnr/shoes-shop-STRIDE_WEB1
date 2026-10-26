const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
}

function updateTheme() {
    if (document.body.classList.contains("light-theme")) {
        themeBtn.textContent = "Dark mode";
    } else {
        themeBtn.textContent = "Light mode";
    }
}

if (themeBtn) updateTheme();

if (themeBtn) themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

    updateTheme();
});

const welcomeBtn = document.getElementById("welcomeBtn");

if (welcomeBtn) {
    welcomeBtn.addEventListener("click", function () {
        const name = document.getElementById("customerName").value.trim();
        const message = document.getElementById("welcomeMessage");

        if (name === "") {
            message.textContent = "Please enter your name.";
        } else {
            message.textContent = "Welcome to STRIDE, " + name + "!";
        }
    });
}

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    const password = document.getElementById("regPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const success = document.getElementById("successMessage");

    function checkPasswords() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match");
        } else {
            confirmPassword.setCustomValidity("");
        }
    }

    password.addEventListener("input", checkPasswords);
    confirmPassword.addEventListener("input", checkPasswords);

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        checkPasswords();
        registrationForm.classList.add("was-validated");
        success.classList.toggle("d-none", !registrationForm.checkValidity());
    });

    registrationForm.addEventListener("reset", function () {
        registrationForm.classList.remove("was-validated");
        confirmPassword.setCustomValidity("");
        success.classList.add("d-none");
    });
}


const homeShoes = document.querySelectorAll(".hits-section .card");
homeShoes.forEach(function (card) {
    const button = card.querySelector(".btn-buy");
    button.addEventListener("click", function () {
        const name = card.querySelector("h3").textContent.trim();
        const shoes = JSON.parse(localStorage.getItem("favouriteShoes") || "[]");
        shoes.push(name);
        localStorage.setItem("favouriteShoes", JSON.stringify(shoes));
        window.location.href = "catalogue.html#favourites";
    });
});
