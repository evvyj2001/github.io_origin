// screen height
function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// header nav Move
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
    const CLASS_ON = 'is-on';
    navBtn.addEventListener('click', () => {
        if (!navBtn.classList.contains(CLASS_ON)) {
            navBtn.classList.add(CLASS_ON);
            navWrap.style.transform = `translateX(0)`;
        } else {
            navBtn.classList.remove(CLASS_ON);
            navWrap.style.transform = `translateX(100%)`;
        }
    });

    if (screenSize > 690) {
        navBtn.classList.remove(CLASS_ON);
        navWrap.style.transform = `translateX(100%)`;
    }
}

// header mobile nav menu
function mobileNavMenu() {
    const navList = document.querySelectorAll('.nav-wrap > ul > li');
    const CLASS_ON = 'is-on';

    navList.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', elm => {
            for (let i = 0; i < navList.length; i++) {
                navList[i].classList.remove(CLASS_ON);
            }

            elm.target.parentNode.classList.add(CLASS_ON);
        });
    });
}

// tab menu (정상작동)
// function tabMenuFunction() {
//     const tabWrap = document.querySelectorAll('[data-tab-wrap]');
//     const CLASS_ON = 'is-on';

//     tabWrap.forEach(e => {
//         const tabMenu = e.querySelector('[tab-menu-wrap]');
//         const tabBtn = tabMenu.querySelectorAll('[data-tab-menu]');
//         const tabContainer = e.querySelector('[tab-container]');
//         const tabContent = tabContainer.querySelectorAll('[data-tab-content]');

//         tabBtn.forEach(el => {
//             el.addEventListener('click', () => {
//                 const btnText = el.dataset.tabMenu;
//                 const tabContentSelect = tabContainer.querySelector(`[data-tab-content=${btnText}]`);

//                 // tab button class on/off
//                 for (let i = 0; i < tabBtn.length; i++) {
//                     tabBtn[i].classList.remove(CLASS_ON);
//                 }
//                 el.classList.add(CLASS_ON);

//                 tabContent.forEach(elm => {
//                     if (btnText === 'all') {
//                         elm.style.display = 'block';
//                     } else {
//                         elm.style.display = 'none';
//                         tabContentSelect.style.display = 'block';
//                     }
//                 });
//             });
//         });
//     });
// }

// 각 wrap 안의 tab만 구동되게 작업 중
function tabMenuFunction() {
    const tabWrap = document.querySelectorAll('[data-tab-wrap]');
    const CLASS_ON = 'is-on';

    for (let a = 0; a < tabWrap.length; a++) {
        const tabMenu = tabWrap[a].querySelector('[tab-menu-wrap]');
        const tabBtn = tabMenu.querySelectorAll('[data-tab-menu]');

        tabBtn.forEach(e => {
            const btnText = e.dataset.tabMenu;
            const tabContainer = e.parentElement.nextElementSibling;
            const tabContents = tabContainer.children;

            // 초기 진입 시 all이 있을 경우 전부 노출, 아닐 경우 첫번째만 노출
            if (btnText === 'all') {
                for (let b = 0; b < tabContents.length; b++) {
                    tabContents[b].classList.add(CLASS_ON);
                }
            } else {
                tabContainer.firstElementChild.classList.add(CLASS_ON);
            }

            // tabBtn 클릭 이벤트
            e.addEventListener('click', () => {
                const tabContentSelect = tabContainer.querySelector(`[data-tab-content=${btnText}]`);

                for (let c = 0; c < tabContents.length; c++) {
                    tabContents[c].classList.remove(CLASS_ON);
                }

                for (let d = 0; d < tabBtn.length; d++) {
                    tabBtn[d].classList.remove(CLASS_ON);
                }

                if (btnText === 'all') {
                    for (let f = 0; f < tabContents.length; f++) {
                        tabContents[f].classList.add(CLASS_ON);
                    }
                    for (let g = 0; g < tabBtn.length; g++) {
                        tabBtn[g].classList.remove(CLASS_ON);
                    }
                } else {
                    tabContentSelect.classList.add(CLASS_ON);
                }

                e.classList.add(CLASS_ON);
            });
        });
    }
}

// accordion
function accordion() {
    const accordionWrap = document.querySelectorAll('[data-accordion]');
    const CLASS_SHOW = 'is-show';

    accordionWrap.forEach(e => {
        const accordionBtn = e.querySelector('[accordion-trg]');
        const accordionCont = e.querySelector('[accordion-cont]');

        accordionBtn.addEventListener('click', trg => {
            const btn = trg.target;
            const parent = btn.parentElement;
            const stat = parent.dataset.accordion;
            const cont = btn.nextElementSibling;

            if (stat === '1') {
                btn.classList.toggle(CLASS_SHOW);
                cont.classList.toggle(CLASS_SHOW);

                if (accordionCont.style.maxHeight) {
                    accordionCont.style.maxHeight = null;
                } else {
                    accordionCont.style.paddingTop = `2rem 0`;
                    // setTimeout(() => {
                    //     accordionCont.style.paddingTop = `2rem 0`;
                    // }, 50);
                    accordionCont.style.maxHeight = `${accordionCont.scrollHeight}px`;
                }
            } else {
                const accordions = parent.parentElement.querySelectorAll('[data-accordion]');

                if (!btn.classList.contains(CLASS_SHOW)) {
                    accordions.forEach(el => {
                        const otherTrg = el.querySelector('[accordion-trg]');
                        const otherCont = el.querySelector('[accordion-cont]');

                        otherTrg.classList.remove(CLASS_SHOW);
                        otherCont.classList.remove(CLASS_SHOW);
                        otherCont.style.maxHeight = null;
                        setTimeout(() => {
                            otherCont.style.padding = 0;
                            cont.style.paddingTop = `2rem 0`;
                        }, 50);
                    });

                    // cont.style.paddingTop = `2rem 0`;
                    btn.classList.add(CLASS_SHOW);
                    cont.classList.add(CLASS_SHOW);
                    cont.style.maxHeight = `${cont.scrollHeight}px`;
                } else {
                    btn.classList.remove(CLASS_SHOW);
                    cont.classList.remove(CLASS_SHOW);
                    cont.style.maxHeight = null;
                }
            }
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
            const content = el.dataset.tooltip;
            el.appendChild(span);
            let text;
            if (el.classList.contains('star')) {
                text = '★'.repeat(content);
                span.innerText = text;
            } else {
                text = content;
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

    if (popupShow.length > 0) {
        // console.log(`${popupShow.length}개의 팝업이 열려있음`);
        popupShow.forEach(e => {
            e.classList.remove('is-show');
        });
    } else {
        popupId.before(popDimmed);
    }

    setTimeout(() => {
        popDimmed.classList.add('is-show');
        popupId.classList.add('is-show');
    }, 100);
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
    const quotes = ['성유진', '웹퍼블리셔', '웹개발자💻', '성실한사람']; // 5글자 이하로
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
    const cursor = document.querySelector('#cursor');
    linkElem.forEach(elm => {
        elm.addEventListener('mouseenter', () => {
            cursor.classList.add('is-hover');
        });
        elm.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-hover');
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
    accordion();

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
