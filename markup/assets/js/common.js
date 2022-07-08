// screen height
function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// tabMove
function tabMove() {
    const list = document.querySelectorAll('#header nav li, .nav-wrap ul li');
    list.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', e => {
            const targetElem = e.target.dataset.scroll;
            const scrollElem = document.getElementById(targetElem);
            const scrollTop = scrollElem.offsetTop;
            document.querySelector('.container').scrollTo({
                top: scrollTop,
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

// scroll spy
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
    // for (const i in sections) {

    // }

    for (const i of Object.keys(sections)) {
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

// tab menu
function tabMenuFunction() {
    const tabWrap = document.querySelectorAll('[data-tab-wrap]');
    const CLASS_ON = 'is-on';

    tabWrap.forEach(e => {
        const tabMenu = e.querySelector('.tab-menu');
        const tabBtn = tabMenu.querySelectorAll('button');
        const tabContainer = e.querySelector('.tab-container');
        const tabContent = e.querySelectorAll(`[data-tab-content]`);

        tabBtn.forEach(el => {
            el.addEventListener('click', () => {
                const btnText = el.textContent;
                const tabContentSelect = tabContainer.querySelector(`[data-tab-content=${btnText}]`);

                // tab button class on/off
                for (let i = 0; i < tabBtn.length; i++) {
                    tabBtn[i].classList.remove(CLASS_ON);
                }
                el.classList.add(CLASS_ON);

                tabContent.forEach(elm => {
                    if (btnText === 'ALL') {
                        elm.style.display = 'block';
                    } else {
                        elm.style.display = 'none';
                        tabContentSelect.style.display = 'block';
                    }
                });
            });
        });
    });
}

// date
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

// header indicator
function scrollIndicator() {
    const winScroll = document.querySelector('.container').scrollTop;
    const height =
        document.querySelector('.container').scrollHeight - document.querySelector('.container').clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator > span').style.width = scrolled + '%';
}

// paralle effect
function scrollParalle() {
    const container = document.querySelector('.container');
    container.addEventListener('scroll', () => {
        document.querySelectorAll('[paralle]').forEach(el => {
            let position;
            if (el.dataset.top) {
                position = el.dataset.top;
                const y = ((container.scrollTop - el.scrollTop) * position) / 50;
                el.style.top = `${y}px`;
            }
            if (el.dataset.left) {
                position = el.dataset.left;
                const y = ((container.scrollTop - el.scrollTop) * position) / 50;
                el.style.left = `${y}px`;
            }
        });
        document.querySelectorAll('.shake').forEach(elm => {
            const offset = elm.offsetTop;
            // console.log(`offset: ${offset}, scroll: ${container.scrollTop}`);
            if (offset - 200 >= container.scrollTop) {
                setTimeout(() => {
                    elm.classList.add('is-active');
                }, 300);
            } else {
                elm.classList.remove('is-active');
            }
        });
    });
}

// tooltop
function tooltip() {
    const parentElem = document.querySelectorAll('[data-tooltip]');
    parentElem.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const span = document.createElement('span');
            el.appendChild(span);
            const content = el.dataset.tooltip;
            if (el.classList.contains('star')) {
                const text = '★'.repeat(content);
                span.innerText = text;
                span.style.color = `rgb(255, 255, 0)`;
            } else {
                const text = content;
                span.innerText = text;
            }
            span.style.display = 'block';
        });
        el.addEventListener('mouseout', () => {
            const span = el.childNodes[1];
            span.remove();
        });
    });
}

// isHidden
function isHidden(el) {
    return el.offsetParent === null;
}

// popup open
function popOpen(el) {
    const popDimmed = document.createElement('div');
    popDimmed.classList.add('popup-dimmed');
    const popupId = document.getElementById(`${el}`);
    const popupShow = document.querySelectorAll('.popup.is-show');
    setTimeout(() => {
        popDimmed.classList.add('is-show');
        popupId.classList.add('is-show');
    }, 100);
    if (popupShow.length > 0) {
        // console.log(`${popupShow.length}개의 팝업이 열려있음`);
        popupShow.forEach(e => {
            e.classList.remove('is-show');
        });
    } else {
        popupId.before(popDimmed);
    }
}

// popup close
function popClose(el) {
    const popup = el.target.closest('.popup');
    const popDimmed = document.querySelector('.popup-dimmed');

    popDimmed.classList.remove('is-show');
    popup.classList.remove('is-show');
    setTimeout(() => {
        popDimmed.remove();
    }, 500);
}

// 페이지 진입 시 뜨는 layer
const introLayer = setTimeout(() => {
    const layer = document.getElementById('introLayer');
    layer.style.opacity = 0;
    setTimeout(() => {
        layer.remove();
    }, 200);
}, 13000);

// 메인 상단 텍스트
function quoteChange() {
    const textWrap = document.querySelector('.text-greeting > h1');
    const quotes = ['성유진', '웹퍼블리셔', '웹개발자💻', '성실한사람'];
    let i = 0;
    let span;
    const timeOut = () => {
        setTimeout(() => {
            textWrap.innerHTML = '';
        }, 4970);
    };
    timeOut();
    setInterval(() => {
        const str = quotes[i++];
        const splitStr = [...str];
        textWrap.dataset.text = str;
        for (const index of Object.keys(splitStr)) {
            span = document.createElement('span'); // span 생성
            span.innerText = `${splitStr[index]}`; // 위에서 쪼갠 텍스트를 span에 삽입
            textWrap.append(span); // span을 h1에 삽입
            span.style.color = 'rgba(0,0,0,0)'; // 출력 직후 색상 투명으로
            setTimeout(() => {
                // 애니메이션 적용시점에 색상 들어가게
                document.querySelectorAll('.text-greeting > h1 > span').forEach(el => {
                    el.style.color = document.querySelector('.text-greeting > h1').style.color;
                });
            }, 400);
            timeOut();
        }

        if (i === quotes.length) {
            i = 0;
        }
    }, 5000);
}

// cursor
function cursorEvent() {
    const linkElem = document.querySelectorAll('button, a, input, label, [data-tooltip]');
    linkElem.forEach(elm => {
        elm.addEventListener('mouseenter', () => {
            document.querySelector('#cursor').classList.add('is-hover');
        });
        elm.addEventListener('mouseleave', () => {
            document.querySelector('#cursor').classList.remove('is-hover');
        });
    });
}

// drag scroll
function dragScroll() {
    const dragElem = document.querySelectorAll('[scroll-drag]');
    dragElem.forEach(ele => {
        ele.style.cursor = 'grab';

        let pos = {
            top: 0,
            left: 0,
            x: 0,
            y: 0,
        };

        const mouseMoveHandler = function (e) {
            const dx = e.clientX - pos.x;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseDownHandler = function (e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';

            pos = {
                left: ele.scrollLeft,
                // top: ele.scrollTop,

                // current mouse position
                x: e.clientX,
                // y: e.clientY,
            };
            ele.addEventListener('mousemove', mouseMoveHandler);
            ele.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseUpHandler = function () {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');

            ele.removeEventListener('mousemove', mouseMoveHandler);
            ele.removeEventListener('mouseup', mouseUpHandler);
        };

        ele.addEventListener('mousedown', mouseDownHandler);
    });
}

// load
window.addEventListener('DOMContentLoaded', () => {
    const scrollContent = document.querySelector('.container');
    const topBtn = document.querySelector('.btn-top');
    scrollContent.addEventListener('scroll', () => {
        scrollIndicator();
        findScroll();

        if (scrollContent.scrollTop < 300) {
            topBtn.style.opacity = 0;
            topBtn.style.zIndex = -1;
        } else {
            topBtn.style.opacity = 1;
            topBtn.style.zIndex = 1;
        }
    });

    quoteChange();
    setScreenHeight();
    navBottom();
    isNow();
    mobileNav();
    mobileNavMenu();
    tabMove();
    tooltip();
    scrollParalle();
    cursorEvent();
    popOpen('popupIntro');
    dragScroll();
    tabMenuFunction();

    // top button
    topBtn.addEventListener('click', () => {
        scrollContent.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });

    // window.addEventListener('click', e => {
    //     console.log(e.target);
    // });
});

// resize
window.addEventListener('resize', () => {
    setScreenHeight();
});

window.addEventListener('touchend', () => {
    setScreenHeight();
});

// mousemove
window.addEventListener('mousemove', el => {
    const circle = document.querySelector('#cursor');
    const mouseX = el.clientX - 15;
    const mouseY = el.clientY - 15;

    circle.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});
