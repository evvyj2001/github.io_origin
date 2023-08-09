// screen height
function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// global header
function headerFunc() {
    const header = document.querySelector('#headerArea');
    const navBg = document.querySelector('.header-bg');
    const nav = document.querySelector('nav > ul');
    const navMenu = document.querySelectorAll('nav > ul > li');

    // header bg
    const toggleHeaderBg = () => {
        header.classList.toggle('__white');
    };

    const downNavBg = () => {
        navBg.classList.add('__down');
    };

    const upNavBg = () => {
        navBg.classList.remove('__down');
    };

    header.addEventListener('mouseenter', () => {
        toggleHeaderBg();

        if (window.scrollY > 20) {
            header.classList.add('__white');
        }
    });
    header.addEventListener('mouseleave', () => {
        if (window.scrollY < 20) {
            header.classList.remove('__white');
        } else {
            header.classList.add('__white');
        }
    });

    navMenu.forEach(e => {
        e.addEventListener('mouseenter', downNavBg);
        nav.addEventListener('mouseleave', upNavBg);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('__white');
        } else {
            header.classList.remove('__white');
        }
    });
}

// footer
function familysite() {
    const trg = document.querySelector('.family-site > button');
    const arr = trg.querySelector('i.fas');
    trg.addEventListener('click', e => {
        const parent = e.target.offsetParent;
        if (parent.classList.contains('__open')) {
            parent.classList.remove('__open');
            arr.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            parent.classList.add('__open');
            arr.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });
}

// search bar open/close
function searchBarOpen() {
    const elm = document.querySelector('header');
    if (elm.classList.contains('__up')) {
        elm.classList.remove('__up');
    } else {
        elm.classList.add('__up');
    }
}

// load
window.addEventListener('load', () => {
    setScreenHeight();
    headerFunc();
    familysite();
});
