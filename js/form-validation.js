// Check the contact form before showing the demo message.
$(document).ready(function () {
    function clearErrors() {
        $('#contact-form .field-error').text('');
        $('#contact-form .form-control').removeClass('is-invalid').removeAttr('aria-invalid');
    }

    function showError(id, message) {
        $('#' + id).addClass('is-invalid').attr('aria-invalid', 'true');
        $('#' + id + '-error').text(message);
    }

    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        clearErrors();
        $('#contact-result').prop('hidden', true);

        const name = $('#contact-name').val().trim();
        const email = $('#contact-email').val().trim();
        const phone = $('#contact-phone').val().trim();
        const message = $('#contact-message').val().trim();
        let valid = true;

        if (name.length < 2) {
            showError('contact-name', 'Enter at least 2 characters.');
            valid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('contact-email', 'Enter a valid email address.');
            valid = false;
        }
        if (phone && !/^\+[1-9][0-9]{7,14}$/.test(phone)) {
            showError('contact-phone', 'Use international format, for example +77001234567.');
            valid = false;
        }
        if (message.length < 10 || message.length > 500) {
            showError('contact-message', 'Message must have 10–500 characters.');
            valid = false;
        }

        if (valid) {
            this.reset();
            $('#contact-result').text('Demo form checked successfully. No message was sent or saved.')
                .prop('hidden', false).hide().fadeIn(200);
        }
    });
});
