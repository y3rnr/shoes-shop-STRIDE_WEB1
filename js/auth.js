// This is a demo account. Do not use real passwords.
// Save a password check value, not the password itself.
// Phone is optional, but we check its format if entered.
$(function () {
    const usersKey = 'stride-demo-users';
    const sessionKey = 'stride-demo-session';

    function readUsers() {
        try {
            return JSON.parse(localStorage.getItem(usersKey)) || {};
        } catch (error) {
            return {};
        }
    }

    function showError(id, message) {
        $('#' + id).addClass('is-invalid').attr('aria-invalid', 'true');
        $('#' + id + '-error').text(message);
    }

    function clearErrors(form) {
        form.find('.field-error').text('');
        form.find('.is-invalid').removeClass('is-invalid').removeAttr('aria-invalid');
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validPhone(phone) {
        return /^\+[1-9][0-9]{7,14}$/.test(phone);
    }

    function validPassword(password) {
        return password.length >= 8 && /[a-z]/.test(password) &&
            /[A-Z]/.test(password) && /[0-9]/.test(password) &&
            /[^A-Za-z0-9\s]/.test(password);
    }

    async function passwordHash(password, salt) {
        const bytes = new TextEncoder().encode(password);
        const key = await crypto.subtle.importKey('raw', bytes, 'PBKDF2', false, ['deriveBits']);
        const bits = await crypto.subtle.deriveBits({
            name: 'PBKDF2', salt: new Uint8Array(salt), iterations: 100000, hash: 'SHA-256'
        }, key, 256);
        return Array.from(new Uint8Array(bits))
            .map(n => n.toString(16).padStart(2, '0')).join('');
    }

    $('#signup-show-password').on('change', function () {
        $('#reg-password, #reg-confirm').attr('type', this.checked ? 'text' : 'password');
    });
    $('#login-show-password').on('change', function () {
        $('#login-password').attr('type', this.checked ? 'text' : 'password');
    });

    $('#registration-form').on('submit', async function (event) {
        event.preventDefault();
        const form = $(this);
        clearErrors(form);
        $('#registration-result').prop('hidden', true);

        const first = $('#reg-first').val().trim();
        const last = $('#reg-last').val().trim();
        const email = $('#reg-email').val().trim().toLowerCase();
        const phone = $('#reg-phone').val().trim();
        const password = $('#reg-password').val();
        const confirm = $('#reg-confirm').val();
        const country = $('#reg-country').val();
        let valid = true;

        if (first.length < 2) { showError('reg-first', 'Enter at least 2 characters.'); valid = false; }
        if (last.length < 2) { showError('reg-last', 'Enter at least 2 characters.'); valid = false; }
        if (!validEmail(email)) { showError('reg-email', 'Enter a valid email address.'); valid = false; }
        if (phone && !validPhone(phone)) { showError('reg-phone', 'Use international format, for example +77001234567.'); valid = false; }
        if (!validPassword(password)) {
            showError('reg-password', 'Use 8+ characters, upper and lowercase letters, a number and a symbol.');
            valid = false;
        }
        if (confirm !== password || !confirm) { showError('reg-confirm', 'Both passwords must match.'); valid = false; }
        if (!country) { showError('reg-country', 'Choose your country.'); valid = false; }

        const users = readUsers();
        if (users[email]) { showError('reg-email', 'An account with this demo email already exists.'); valid = false; }
        if (!valid) return;

        const button = form.find('button[type="submit"]');
        button.prop('disabled', true).text('Creating...');
        try {
            if (!window.crypto || !crypto.subtle) throw new Error('Browser does not support Web Crypto');
            const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
            const hash = await passwordHash(password, salt);
            users[email] = { first, last, email, phone, country, salt, passwordHash: hash };
            localStorage.setItem(usersKey, JSON.stringify(users));
            window.location.href = 'login.html?registered=1';
        } catch (error) {
            $('#registration-result').text('Could not create your demo account. Please use localhost or HTTPS.')
                .prop('hidden', false);
            button.prop('disabled', false).text('Create Demo Account');
        }
    });

    $('#registration-form').on('reset', function () {
        clearErrors($(this));
        $('#registration-result').prop('hidden', true);
    });

    $('#login-form').on('submit', async function (event) {
        event.preventDefault();
        const form = $(this);
        clearErrors(form);
        $('#login-status').prop('hidden', true);
        const email = $('#login-email').val().trim().toLowerCase();
        const password = $('#login-password').val();
        if (!validEmail(email)) { showError('login-email', 'Enter a valid email.'); return; }
        if (!password) { showError('login-password', 'Enter your demo password.'); return; }

        const button = form.find('button[type="submit"]');
        button.prop('disabled', true).text('Checking...');
        try {
            const user = readUsers()[email];
            const matches = user && user.salt && user.passwordHash &&
                (await passwordHash(password, user.salt)) === user.passwordHash;
            if (!matches) {
                showError('login-password', 'Email or password is incorrect.');
                return;
            }
            localStorage.setItem(sessionKey, JSON.stringify({ email }));
            window.location.href = 'profile.html';
        } catch (error) {
            $('#login-status').text('Unable to read demo account. Use localhost or HTTPS.')
                .prop('hidden', false);
        } finally {
            button.prop('disabled', false).text('Log In');
        }
    });

    if ($('#login-status').length) {
        const action = new URLSearchParams(location.search);
        let message = '';
        if (action.has('registered')) message = 'Your demo account is ready. Please log in.';
        if (action.has('loggedout')) message = 'You have logged out.';
        if (action.has('deleted')) message = 'Your demo account was deleted.';
        if (action.has('login')) message = 'Please log in to see your profile.';
        if (message) $('#login-status').text(message).prop('hidden', false);
    }
});
