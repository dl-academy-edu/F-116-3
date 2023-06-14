// Отделяем рабочую область и логику под работу с контекстным меню.
(function() {
    const contextMenu = document.querySelector('.contextmenu_js');

    if ( !contextMenu ) return;

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;

        window.addEventListener('click', clickHandler);
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('keydown', escHandler);
        contextMenu.classList.remove('contextmenu_hidden');
    })

    function closeMenu() {
        window.removeEventListener('click', clickHandler);
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('keydown', escHandler);
        contextMenu.classList.add('contextmenu_hidden');
    }

    function clickHandler(e) {
        if (!contextMenu.contains(e.target)) {
            closeMenu();
        }
    }
    
    function scrollHandler(e) {
        closeMenu();
    }

    function escHandler(e) {
        if ( e.keyCode === 27 ) {
            closeMenu();
        }
    }
})();

(function() {
    const buttonToTop = document.querySelector('.button-to-top');

    if ( !buttonToTop ) return;

    window.addEventListener('scroll', () => {

        if ( window.pageYOffset > 1000 ) {
            buttonToTop.classList.remove('button-to-top_hidden');
        } else {
            buttonToTop.classList.add('button-to-top_hidden');
        }
    })

    buttonToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })
})();