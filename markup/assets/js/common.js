function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// header nav bottom border effect
function navBottom() {
    const nav = document.querySelector('nav > ul');
    const navWidth = nav.clientWidth;
    const navList = nav.querySelectorAll('li');
    const lineBottom = document.querySelector('.line-bottom');
    const lineMove = lineBottom.querySelector('span');

    lineBottom.style.width = `${navWidth}px`;

    navList.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', elm => {
            const itemWidth = elm.target.clientWidth / 2;
            const position = elm.target.offsetLeft - nav.offsetLeft;
            const lineHalf = lineMove.clientWidth / 2;

            lineMove.style.opacity = 1;
            lineMove.style.transform = `translateX(calc(${position}px + ${itemWidth}px - ${lineHalf}px))`;

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
    const week = ['월', '화', '수', '목', '금', '토', '일'];

    // const hours = String(now.getHours()).padStart(2, '0');
    const hours = String(now.getHours());
    let hour;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (hours > 12) {
        hour = hours - 12;
        dayNight.innerText = '오후';
    } else {
        hour = hours;
        dayNight.innerText = '오전';
    }

    dateElem.innerText = `${year}년 ${month}월 ${date}일 ${week[day]}요일`;
    clockElem.innerText = `${hour}시 ${minutes}분 ${seconds}초`;
}

setInterval(() => {
    isNow();
}, 1000);

// 로드 즉시 실행
document.addEventListener('DOMContentLoaded', () => {
    setScreenHeight();
    navBottom();
    isNow();
});

// scroll
window.addEventListener('scroll', () => {});

// resize
window.addEventListener('resize', () => {
    setScreenHeight();
});

window.addEventListener('touchend', () => {
    setScreenHeight();
});

// mousemove
window.addEventListener('mousemove', e => {
    // const headerBottom = document.querySelector('#header .line-bottom > span');
    // const mouseX = e.clientX - 50;
    // headerBottom.style.transform = `translateX(${mouseX}px)`;
});
