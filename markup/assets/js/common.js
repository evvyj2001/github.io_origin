// screen height
function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// tabMove
function tabMove() {
    const list = document.querySelectorAll('#header nav li');
    list.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', e => {
            const targetElem = e.target.dataset.scroll;
            const scrollElem = document.getElementById(targetElem);
            const scrollTop = scrollElem.offsetTop;
            document.querySelector('.container').scrollTo({
                top: scrollTop - 20,
                left: 0,
                behavior: 'smooth',
            });
        });
    });
}

// header nav bottom border effect
function navBottom() {
    const nav = document.querySelector('nav > ul');
    const navWidth = nav.clientWidth;
    const lineBottom = document.querySelector('.line-bottom');

    lineBottom.style.width = `${navWidth}px`;
}

function findScroll() {
    const nav = document.querySelector('nav > ul');
    const lineBottom = document.querySelector('.line-bottom');
    const lineMove = lineBottom.querySelector('span');

    const section = document.querySelectorAll('.section');
    const sections = [];

    Array.prototype.forEach.call(section, e => {
        sections[e.id] = e.offsetTop;
    });
    const scrollPosition = document.documentElement.scrollTop || document.querySelector('.container').scrollTop;

    // eslint-disable-next-line no-restricted-syntax
    for (const i in sections) {
        if (sections[i] <= scrollPosition + 100) {
            const item = document.querySelector(`a[data-scroll="${i}"]`);
            const itemWidth = item.clientWidth / 2;
            const position = item.offsetLeft - nav.offsetLeft;
            const lineHalf = lineMove.clientWidth / 2;

            lineMove.style.opacity = 1;
            lineMove.style.transform = `translateX(calc(${position}px + ${itemWidth}px - ${lineHalf}px))`;

            document.querySelector('.is-on').classList.remove('is-on');
            item.parentNode.classList.add('is-on');
        }
    }
}

// header mobile nav
function mobileNav() {
    const navBtn = document.querySelector('.nav-btn');
    const navWrap = document.querySelector('.nav-wrap');
    const screenSize = document.body.clientWidth;
    navBtn.addEventListener('click', () => {
        if (!navBtn.classList.contains('is-on')) {
            navBtn.classList.add('is-on');
            navWrap.style.transform = `translateX(0)`;
        } else {
            navBtn.classList.remove('is-on');
            navWrap.style.transform = `translateX(100%)`;
        }
    });

    if (screenSize > 690) {
        navBtn.classList.remove('is-on');
        navWrap.style.transform = `translateX(100%)`;
    }
}

// header mobile nav menu
function mobileNavMenu() {
    const navList = document.querySelectorAll('.nav-wrap > ul > li');

    navList.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', elm => {
            for (let i = 0; i < navList.length; i++) {
                navList[i].classList.remove('is-on');
            }

            elm.target.parentNode.classList.add('is-on');
        });
    });
}

// header date
function isNow() {
    const dateElem = document.querySelector('.now .date');
    const clockElem = document.querySelector('.now .clock');
    const dayNight = document.querySelector('.now .day-night');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay() - 1;
    const week = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    // const hours = String(now.getHours()).padStart(2, '0');
    const hours = String(now.getHours());
    let hour;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (hours > 12) {
        hour = hours - 12;
        dayNight.innerText = 'PM';
    } else {
        hour = hours;
        dayNight.innerText = 'AM';
    }

    dateElem.innerText = `${year}. ${month}. ${date} ${week[day]}`;
    clockElem.innerText = `${hour}:${minutes}:${seconds}`;
}

setInterval(() => {
    isNow();
}, 1000);

function scrollIndicator() {
    const winScroll = document.querySelector('.container').scrollTop;
    const height =
        document.querySelector('.container').scrollHeight - document.querySelector('.container').clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator > span').style.width = scrolled + '%';
}

function popOpen(el) {
    const popDimmed = document.createElement('div');
    popDimmed.classList.add('popup-dimmed');
    const popupId = document.getElementById(`${el}`);
    popupId.before(popDimmed);
    setTimeout(() => {
        popDimmed.classList.add('is-show');
        popupId.classList.add('is-show');
    }, 100);
}

function popClose(el) {
    const popup = el.target.parentNode;
    const popDimmed = document.querySelector('.popup-dimmed');

    popDimmed.classList.remove('is-show');
    popup.classList.remove('is-show');
    setTimeout(() => {
        popDimmed.remove();
    }, 500);
}

const introLayer = setTimeout(() => {
    const layer = document.getElementById('introLayer');
    layer.style.opacity = 0;
    setTimeout(() => {
        layer.remove();
    }, 200);
}, 13000);

// load
window.addEventListener('load', () => {
    const scrollContent = document.querySelector('.container');
    scrollContent.addEventListener('scroll', () => {
        scrollIndicator();
        findScroll();
        // findScrollPosition();
    });
    setScreenHeight();
    navBottom();
    isNow();
    mobileNav();
    mobileNavMenu();
    tabMove();
});

// resize
window.addEventListener('resize', () => {
    setScreenHeight();
});

window.addEventListener('touchend', () => {
    setScreenHeight();
});

// mousemove
window.addEventListener('mousemove', () => {
    // const headerBottom = document.querySelector('#header .line-bottom > span');
    // const mouseX = e.clientX - 50;
    // headerBottom.style.transform = `translateX(${mouseX}px)`;
});
