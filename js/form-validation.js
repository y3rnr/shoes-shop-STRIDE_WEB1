// Contact and Registration form validation with jQuery.
// The website is a demo. No information is sent to a server.
$(document).ready(function () {
    function clearErrors() {
        $('.field-error').text('');
        $('.form-control, .form-select').removeClass('is-invalid');
    }

    function showError(id, message) {
        $('#' + id).addClass('is-invalid');
        $('#' + id + '-error').text(message);
    }

    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        clearErrors();
        $('#contact-result').prop('hidden', true);

        const name = $('#contact-name').val().trim();
        const email = $('#contact-email').val().trim();
        const message = $('#contact-message').val().trim();
        let valid = true;

        if (name.length < 2) {
            showError('contact-name', 'Enter at least 2 characters.');
            valid = false;
        }
        if (email === '' || !document.getElementById('contact-email').checkValidity()) {
            showError('contact-email', 'Enter a valid email address.');
            valid = false;
        }
        if (message.length < 10 || message.length > 500) {
            showError('contact-message', 'Message must have 10-500 characters.');
            valid = false;
        }

        if (valid) {
            this.reset();
            $('#contact-result').text('Demo only: no message was sent.')
                .prop('hidden', false).hide().fadeIn(200);
        }
    });

    $('#registration-form').on('submit', function (event) {
        event.preventDefault();
        clearErrors();
        $('#registration-result').prop('hidden', true);

        const first = $('#reg-first').val().trim();
        const last = $('#reg-last').val().trim();
        const email = $('#reg-email').val().trim();
        const password = $('#reg-password').val();
        const confirm = $('#reg-confirm').val();
        const country = $('#reg-country').val();
        let valid = true;

        if (first.length < 2) {
            showError('reg-first', 'Enter at least 2 characters.');
            valid = false;
        }
        if (last.length < 2) {
            showError('reg-last', 'Enter at least 2 characters.');
            valid = false;
        }
        if (email === '' || !document.getElementById('reg-email').checkValidity()) {
            showError('reg-email', 'Enter a valid email address.');
            valid = false;
        }
        if (password.length < 8) {
            showError('reg-password', 'Password must have at least 8 characters.');
            valid = false;
        }
        if (confirm !== password || confirm.length < 8) {
            showError('reg-confirm', 'Passwords must match.');
            valid = false;
        }
        if (country === '') {
            showError('reg-country', 'Please choose a country.');
            valid = false;
        }

        if (valid) {
            this.reset();
            $('#registration-result').text('Demo only: no account was created.')
                .prop('hidden', false).hide().fadeIn(200);
        }
    });

    $('#registration-form').on('reset', function () {
        clearErrors();
        $('#registration-result').prop('hidden', true);
    });
});
