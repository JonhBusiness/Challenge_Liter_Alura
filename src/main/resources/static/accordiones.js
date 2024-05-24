document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const menu = document.getElementById('navbar-default');

    button.addEventListener('click', function () {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
    });
});
/////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('[data-radix-collection-item]');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const controls = button.getAttribute('aria-controls');

            const content = document.getElementById(controls);

            // Toggle aria-expanded attribute
            button.setAttribute('aria-expanded', !isExpanded);
            button.setAttribute('data-state', isExpanded ? 'closed' : 'open');

            // Toggle content visibility
            if (isExpanded) {
                content.setAttribute('data-state', 'closed');
                content.hidden = true;
            } else {
                content.setAttribute('data-state', 'open');
                content.hidden = false;
            }
        });
    });
});