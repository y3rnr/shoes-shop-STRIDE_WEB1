// Menu, theme, welcome message and FAQ.
$(document).ready(function () {
    const menuButton = $('#nav-toggle');
    const mobileMenu = $('#mobile-menu');
    const themeButton = $('#theme-toggle');
    let signedIn = false;
    try {
        const session = JSON.parse(localStorage.getItem('stride-demo-session'));
        const users = JSON.parse(localStorage.getItem('stride-demo-users')) || {};
        signedIn = Boolean(session && users[session.email]);
    } catch (error) {
        signedIn = false;
    }
    $('[data-auth-nav]').attr('href', signedIn ? 'profile.html' : 'login.html')
        .text(signedIn ? 'Profile' : 'Log In');
    const currentPage = window.location.pathname.split('/').pop();
    if (['login.html', 'registration.html', 'profile.html'].includes(currentPage)) {
        $('[data-auth-nav]').attr('aria-current', 'page');
    }


    function closeMenu() {
        mobileMenu.removeClass('is-open');
        menuButton.attr('aria-expanded', 'false').attr('aria-label', 'Open menu');
        menuButton.find('span').text('☰');
        $('body').removeClass('menu-open');
    }

    menuButton.on('click', function () {
        if (mobileMenu.hasClass('is-open')) {
            closeMenu();
        } else {
            mobileMenu.addClass('is-open');
            menuButton.attr('aria-expanded', 'true').attr('aria-label', 'Close menu');
            menuButton.find('span').text('×');
            $('body').addClass('menu-open');
        }
    });
    mobileMenu.on('click', 'a', closeMenu);
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const dark = theme === 'dark';
        themeButton.attr('aria-pressed', String(dark));
        themeButton.attr('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    themeButton.on('click', function () {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        const theme = dark ? 'light' : 'dark';
        setTheme(theme);
        localStorage.setItem('stride-theme', theme);
    });

    $('#welcome-form').on('submit', function (event) {
        event.preventDefault();
        const name = $('#welcome-name').val().trim();
        $('#welcome-message').text(name ? 'Welcome to STRIDE, ' + name + '!' : 'Please enter your name.');
    });

    $('.faq-question').on('click', function () {
        const question = $(this);
        const open = question.attr('aria-expanded') === 'true';
        question.attr('aria-expanded', String(!open));
        question.find('.faq-symbol').text(open ? '+' : '−');
        question.next('.faq-answer').stop(true, true).slideToggle(250);
    });
});
