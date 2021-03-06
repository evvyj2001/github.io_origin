// const { list } = require('postcss');

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

    const CLASS_IS = '__on';

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

            document.querySelector(`.${CLASS_IS}`).classList.remove(CLASS_IS);
            item.parentNode.classList.add(CLASS_IS);
        }
    }
}

// header mobile nav
function mobileNav() {
    const navBtn = document.querySelector('.nav-btn');
    const navWrap = document.querySelector('.nav-wrap');
    const screenSize = document.body.clientWidth;
    const CLASS_IS = '__on';

    navBtn.addEventListener('click', () => {
        if (!navBtn.classList.contains(CLASS_IS)) {
            navBtn.classList.add(CLASS_IS);
            navWrap.style.transform = `translateX(0)`;
        } else {
            navBtn.classList.remove(CLASS_IS);
            navWrap.style.transform = `translateX(100%)`;
        }
    });

    if (screenSize > 690) {
        navBtn.classList.remove(CLASS_IS);
        navWrap.style.transform = `translateX(100%)`;
    }
}

// header mobile nav menu
function mobileNavMenu() {
    const navList = document.querySelectorAll('.nav-wrap > ul > li');
    const CLASS_IS = '__on';

    navList.forEach(el => {
        const item = el.querySelector('a');

        item.addEventListener('click', elm => {
            for (let i = 0; i < navList.length; i++) {
                navList[i].classList.remove(CLASS_IS);
            }

            elm.target.parentNode.classList.add(CLASS_IS);
        });
    });
}

// header indicator
function scrollIndicator() {
    const winScroll = document.querySelector('.container').scrollTop;
    const height =
        document.querySelector('.container').scrollHeight - document.querySelector('.container').clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator > span').style.width = scrolled + '%';
}

// tab menu
// ??? wrap ?????? tab??? ???????????? ?????? ???
function tabMenuFunction() {
    const tabWrap = document.querySelectorAll('[data-tab-wrap]');
    const CLASS_IS = '__on';

    for (let a = 0; a < tabWrap.length; a++) {
        const tabMenu = tabWrap[a].querySelector('[tab-menu-wrap]');
        const tabBtn = tabMenu.querySelectorAll('[data-tab-menu]');

        tabBtn.forEach(e => {
            const btnText = e.dataset.tabMenu;
            const tabContainer = e.parentElement.nextElementSibling;
            const tabContents = tabContainer.children;

            // ?????? ?????? ??? all??? ?????? ?????? ?????? ??????, ?????? ?????? ???????????? ??????
            if (btnText === 'all') {
                for (let b = 0; b < tabContents.length; b++) {
                    tabContents[b].classList.add(CLASS_IS);
                }
            } else {
                tabContainer.firstElementChild.classList.add(CLASS_IS);
            }

            // tabBtn ?????? ?????????
            e.addEventListener('click', () => {
                const tabContentSelect = tabContainer.querySelector(`[data-tab-content=${btnText}]`);

                for (let c = 0; c < tabContents.length; c++) {
                    tabContents[c].classList.remove(CLASS_IS);
                }

                for (let d = 0; d < tabBtn.length; d++) {
                    tabBtn[d].classList.remove(CLASS_IS);
                }

                if (btnText === 'all') {
                    for (let f = 0; f < tabContents.length; f++) {
                        tabContents[f].classList.add(CLASS_IS);
                    }
                    for (let g = 0; g < tabBtn.length; g++) {
                        tabBtn[g].classList.remove(CLASS_IS);
                    }
                } else {
                    tabContentSelect.classList.add(CLASS_IS);
                    tabContentSelect.parentElement.scrollTop = 0;
                }

                e.classList.add(CLASS_IS);
            });
        });
    }
}

// selectbox === dropdown
function dropdown() {
    const dropdownElem = document.querySelectorAll('[data-selectbox]');
    const CLASS_IS = '__open';
    const CLASS_ON = '__on';
    const bodyEl = document.querySelector('body');

    for (let g = 0; g < dropdownElem.length; g++) {
        const trigger = dropdownElem[g].querySelector('[selectbox-trg]');

        trigger.addEventListener('click', trg => {
            const list = trg.target.nextElementSibling;
            const parentElems = trg.target.parentNode;
            const eachBtn = list.querySelectorAll('button');

            const removeEvent = () => {
                parentElems.classList.remove(CLASS_IS);
                list.style.maxHeight = 0;

                setTimeout(() => {
                    list.style.borderWidth = 0;
                }, 150);
            };

            if (!parentElems.classList.contains(CLASS_IS)) {
                parentElems.classList.add(CLASS_IS);
                list.style.maxHeight = `${list.scrollHeight}px`;
                list.style.borderWidth = `0 0.5px 0.5px`;
            } else {
                removeEvent();
            }

            eachBtn.forEach(ev => {
                ev.addEventListener('click', () => {
                    trg.target.innerText = ev.textContent;

                    for (let ea = 0; ea < eachBtn.length; ea++) {
                        eachBtn[ea].classList.remove(CLASS_ON);
                        ev.classList.add(CLASS_ON);
                    }
                    removeEvent();
                });
            });
        });
    }

    // bodyEl.addEventListener('click', event => {
    //     if (event.target === event.currentTarget.querySelector('[selectbox-trg]')) {
    //         console.log('??????X');
    //     } else {
    //         console.log('??????O');
    //         // removeEvent();
    //     }
    // });

    // dropdownElem.forEach(e => {
    //     const trigger = e.querySelector('[selectbox-trg]');
    //     const list = e.querySelector('[selectbox-list]');

    //     bodyEl.addEventListener('click', el => {
    //         if (el.target === el.currentTarget.querySelector('[selectbox-trg]')) {
    //             // body ?????? ??? ?????? ????????? selectbox-trg ????????????
    //             if (!e.classList.contains(CLASS_IS)) {
    //                 // data-dropdown??? __open??? ???????????? ?????????
    //                 trigger.parentElement.classList.add(CLASS_IS);
    //                 list.style.maxHeight = `${list.scrollHeight}px`;
    //                 list.style.borderWidth = `0 0.5px 0.5px`;
    //             } else {
    //                 // __open ???????????????
    //                 trigger.parentElement.classList.remove(CLASS_IS);
    //                 list.style.maxHeight = 0;
    //                 setTimeout(() => {
    //                     list.style.borderWidth = 0;
    //                 }, 150);
    //             }
    //             list.addEventListener('click', val => {
    //                 trigger.innerText = val.target.textContent;
    //             });
    //         } else {
    //             // body ?????? ????????? selectbox-trg ??? ???????????????
    //             trigger.parentElement.classList.remove(CLASS_IS);
    //             list.style.maxHeight = 0;
    //             setTimeout(() => {
    //                 list.style.borderWidth = 0;
    //             }, 150);
    //         }
    //     });
    // });
}

// accordion
function accordion() {
    const accordionWrap = document.querySelectorAll('[data-accordion]');
    const CLASS_IS = '__show';

    accordionWrap.forEach(e => {
        const accordionBtn = e.querySelector('[accordion-trg]');
        const accordionCont = e.querySelector('[accordion-cont]');

        accordionBtn.addEventListener('click', trg => {
            const btn = trg.target;
            const parent = btn.parentElement;
            const stat = parent.dataset.accordion;
            const cont = btn.nextElementSibling;

            if (stat === '1') {
                btn.classList.toggle(CLASS_IS);
                cont.classList.toggle(CLASS_IS);

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

                if (!btn.classList.contains(CLASS_IS)) {
                    accordions.forEach(el => {
                        const otherTrg = el.querySelector('[accordion-trg]');
                        const otherCont = el.querySelector('[accordion-cont]');

                        otherTrg.classList.remove(CLASS_IS);
                        otherCont.classList.remove(CLASS_IS);
                        otherCont.style.maxHeight = null;
                        setTimeout(() => {
                            otherCont.style.padding = 0;
                            cont.style.paddingTop = `2rem 0`;
                        }, 50);
                    });

                    // cont.style.paddingTop = `2rem 0`;
                    btn.classList.add(CLASS_IS);
                    cont.classList.add(CLASS_IS);
                    cont.style.maxHeight = `${cont.scrollHeight}px`;
                } else {
                    btn.classList.remove(CLASS_IS);
                    cont.classList.remove(CLASS_IS);
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
    const week = ['???', '???', '???', '???', '???', '???', '???'];
    // const hours = String(now.getHours()).padStart(2, '0');
    const hours = String(now.getHours());
    let hour;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (hours > 12) {
        hour = hours - 12;
        dayNight.innerText = '????????? ??????';
    } else {
        hour = hours;
        dayNight.innerText = '????????? ??????';
    }

    dateElem.innerText = `????????? ${year}??? ${month}??? ${date}??? ${week[day]}??????`;
    clockElem.innerText = `${hour}??? ${minutes}??? ${seconds}??? ?????????.`;
}

setInterval(() => {
    isNow();
}, 1000);

// paralle effect
function scrollParalle() {
    const container = document.querySelector('.container');
    container.addEventListener('scroll', () => {
        document.querySelectorAll('[paralle]').forEach(el => {
            let position;
            let y;

            if (el.dataset.top) {
                position = el.dataset.top;
                y = ((container.scrollTop - el.scrollTop) * position) / 50;
                el.style.top = `${y}px`;
            }
            if (el.dataset.left) {
                position = el.dataset.left;
                y = ((container.scrollTop - el.scrollTop) * position) / 50;
                el.style.left = `${y}px`;
            }
        });
        document.querySelectorAll('.shake').forEach(elm => {
            const CLASS_IS = '__active';
            const offset = elm.offsetTop;
            // console.log(`offset: ${offset}, scroll: ${container.scrollTop}`);
            // console.dir(elm);
            if (offset - 200 >= container.scrollTop) {
                setTimeout(() => {
                    elm.classList.add(CLASS_IS);
                }, 300);
            } else {
                elm.classList.remove(CLASS_IS);
            }
        });
    });
}

// tooltop
function tooltip() {
    const tooltipElem = document.querySelectorAll('[data-tooltip]');

    tooltipElem.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const span = document.createElement('span');
            const content = el.dataset.tooltip;
            el.appendChild(span);
            let text;
            if (el.classList.contains('star')) {
                text = '???'.repeat(content);
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
    const CLASS_IS = '__show';
    const popDimmed = document.createElement('div');
    popDimmed.classList.add('popup-dimmed');
    const popupId = document.getElementById(`${el}`);
    const popupShow = document.querySelectorAll(`.popup.${CLASS_IS}`);

    if (popupShow.length > 0) {
        popupShow.forEach(e => {
            e.classList.remove(CLASS_IS);
        });
    } else {
        popupId.before(popDimmed);
    }

    setTimeout(() => {
        popDimmed.classList.add(CLASS_IS);
        popupId.classList.add(CLASS_IS);
    }, 100);
}

// popup close
function popClose(el) {
    const CLASS_IS = '__show';
    const popup = el.target.closest('.popup');
    const popDimmed = document.querySelector('.popup-dimmed');

    popDimmed.classList.remove(CLASS_IS);
    popup.classList.remove(CLASS_IS);
    setTimeout(() => {
        popDimmed.remove();
    }, 500);
}

// ????????? ?????? ??? ?????? layer
const introLayer = setTimeout(() => {
    const layer = document.getElementById('introLayer');
    layer.style.opacity = 0;
    setTimeout(() => {
        layer.remove();
    }, 200);
}, 13000);

// ?????? ?????? ?????????
function quoteChange() {
    const textWrap = document.querySelector('.text-greeting > h1');
    const quotes = ['?????????', '???????????????', '????????????????', '???????????????']; // 5?????? ?????????
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
            span = document.createElement('span'); // span ??????
            span.innerText = `${splitStr[index]}`; // ????????? ?????? ???????????? span??? ??????
            textWrap.append(span); // span??? h1??? ??????
            span.style.color = 'rgba(0,0,0,0)'; // ?????? ?????? ?????? ????????????
            setTimeout(() => {
                // ??????????????? ??????????????? ?????? ????????????
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
    const CLASS_IS = '__hover';
    linkElem.forEach(elm => {
        elm.addEventListener('mouseenter', () => {
            cursor.classList.add(CLASS_IS);
        });
        elm.addEventListener('mouseleave', () => {
            cursor.classList.remove(CLASS_IS);
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
    dropdown();

    // top button
    topBtn.addEventListener('click', () => {
        scrollContent.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });

    // document.addEventListener('click', e => {
    //     console.dir(e.target);
    //     console.dir(e.currentTarget);
    //     // console.log(`target: ${e.target}, currentTarget: ${e.currentTarget}`);
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
