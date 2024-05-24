document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.hs-dropdown-toggle2');
    const dropdownMenu = document.querySelector('.hs-dropdown-menu2');
    const dropdownIcon = dropdownToggle.querySelector('svg');

    dropdownToggle.addEventListener('click', function () {
        const isOpen = dropdownMenu.classList.contains('hs-dropdown-open:opacity-100');

        if (isOpen) {
            dropdownMenu.classList.remove('hs-dropdown-open:opacity-100');
            dropdownMenu.classList.add('opacity-0');
            dropdownMenu.classList.add('hidden');
            dropdownIcon.classList.remove('rotate-180');
        } else {
            dropdownMenu.classList.remove('opacity-0');
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.classList.add('hs-dropdown-open:opacity-100');
            dropdownIcon.classList.add('rotate-180');
        }
    });

    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('hs-dropdown-open:opacity-100');
            dropdownMenu.classList.add('opacity-0');
            dropdownMenu.classList.add('hidden');
            dropdownIcon.classList.remove('rotate-180');
        }
    });
});
//////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.hs-dropdown-toggle');
    const dropdownMenu = document.querySelector('.hs-dropdown-menu');
    const dropdownIcon = dropdownToggle.querySelector('svg');

    dropdownToggle.addEventListener('click', function () {
        const isOpen = dropdownMenu.classList.contains('hs-dropdown-open:opacity-100');

        if (isOpen) {
            dropdownMenu.classList.remove('hs-dropdown-open:opacity-100');
            dropdownMenu.classList.add('opacity-0');
            dropdownMenu.classList.add('hidden');
            dropdownIcon.classList.remove('rotate-180');
        } else {
            dropdownMenu.classList.remove('opacity-0');
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.classList.add('hs-dropdown-open:opacity-100');
            dropdownIcon.classList.add('rotate-180');
        }
    });

    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('hs-dropdown-open:opacity-100');
            dropdownMenu.classList.add('opacity-0');
            dropdownMenu.classList.add('hidden');
            dropdownIcon.classList.remove('rotate-180');
        }
    });
});
