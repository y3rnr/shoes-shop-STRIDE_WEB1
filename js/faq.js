const questions = document.querySelectorAll(".faq-question");

questions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        answer.hidden = !answer.hidden;

        if (answer.hidden) {
            question.setAttribute("aria-expanded", "false");
            icon.textContent = "+";
        } else {
            question.setAttribute("aria-expanded", "true");
            icon.textContent = "−";
        }
    });
});

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    contactForm.classList.add("was-validated");
    if (contactForm.checkValidity()) {
        window.location.href = "demo_result.html";
    }
});
