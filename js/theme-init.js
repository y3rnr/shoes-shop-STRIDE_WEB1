// Apply the saved theme before the page styles are loaded.
try {
    if (localStorage.getItem('stride-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
} catch (error) {
    // The default light theme works if storage is unavailable.
}
