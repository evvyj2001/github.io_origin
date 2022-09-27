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

// 모드 변경
function changeMode() {
    const selectBtns = document.querySelectorAll('.theme-select > button');
    const CLASS_ON = '__on';
    const THEME_STYLE = 'Theme';
    const savedTheme = localStorage.getItem(THEME_STYLE);
    let mainColor;
    let lightMainColor;
    let darkMainColor;

    const painting = () => {
        document.documentElement.style.setProperty('--mainColor', `${mainColor}`);
        document.documentElement.style.setProperty('--lightMainColor', `${lightMainColor}`);
        document.documentElement.style.setProperty('--darkenMainColor', `${darkMainColor}`);
    };

    const greenTheme = () => {
        mainColor = '#00c73c';
        lightMainColor = '#a2fbbd';
        darkMainColor = '#03862a';
    };
    const redTheme = () => {
        mainColor = 'var(--red)';
        lightMainColor = '#ffa0a0';
        darkMainColor = '#a21005';
    };
    const blueTheme = () => {
        mainColor = 'var(--blue)';
        lightMainColor = '#8787ff';
        darkMainColor = '#1212ad';
    };

    if (savedTheme === 'green') {
        greenTheme();
    } else if (savedTheme === 'red') {
        redTheme();
    } else if (savedTheme === 'blue') {
        blueTheme();
    }

    if (!savedTheme) {
        document.querySelector('.btn-green').classList.add(CLASS_ON);
        greenTheme();
    } else {
        document.querySelector(`.btn-${savedTheme}`).classList.add(CLASS_ON);
    }

    painting();

    selectBtns.forEach(el => {
        const $CLASS = el.classList;
        const $TITLE = el.title;

        el.addEventListener('click', () => {
            for (let i = 0; i < selectBtns.length; i++) {
                selectBtns[i].classList.remove(CLASS_ON);
            }
            $CLASS.add(CLASS_ON);

            localStorage.setItem(THEME_STYLE, $TITLE);

            if ($CLASS.contains('btn-green')) {
                greenTheme();
            } else if ($CLASS.contains('btn-red')) {
                redTheme();
            } else if ($CLASS.contains('btn-blue')) {
                blueTheme();
            }
            painting();
        });
    });
}

// tab menu
// 각 wrap 안의 tab만 구동되게 작업 중
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

            // 초기 진입 시 all이 있을 경우 전부 노출, 아닐 경우 첫번째만 노출
            if (btnText === 'all') {
                for (let b = 0; b < tabContents.length; b++) {
                    tabContents[b].classList.add(CLASS_IS);
                }
            } else {
                tabContainer.firstElementChild.classList.add(CLASS_IS);
            }

            // tabBtn 클릭 이벤트
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

// input text del-btn
function delBtn() {
    const inputWrap = document.querySelectorAll('.inp-box.__del');
    inputWrap.forEach(e => {
        const inputElem = e.querySelector('input, textarea');
        const $btn = document.createElement('button');
        $btn.innerText = 'X';
        $btn.classList.add('btn-del');
        inputElem.parentElement.appendChild($btn);

        inputElem.addEventListener('keyup', () => {
            if (inputElem.value) {
                $btn.style.display = 'block';
            } else {
                $btn.style.display = 'none';
            }
        });

        $btn.addEventListener('click', el => {
            inputElem.value = '';
            el.target.style.display = 'none';
        });
    });
}

// input range
function inputRange() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(inp => {
        const parentElem = inp.parentElement;
        const flag = parentElem.querySelector('span');
        inp.addEventListener('input', () => {
            const { min } = inp;
            const { max } = inp;
            const val = inp.value;

            if (parentElem.classList.contains('flag-mode')) {
                flag.innerText = val;

                if (val < 4) {
                    flag.style.left = `25px`;
                } else if (val > 96) {
                    flag.style.left = `calc(100% - 25px)`;
                } else {
                    flag.style.left = `${val}%`;
                }
                // flag.style.left = `calc(${val}% + 1.9rem)`;
            }
            inp.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
        });
    });
}

// textcounting
function textCount() {
    const textfield = document.querySelectorAll('.inp-box.__count');
    textfield.forEach(elm => {
        const area = elm.querySelector('input, textarea');
        area.addEventListener('input', () => {
            const { length } = area.value;
            const cnt = area.nextElementSibling.querySelector('span');
            cnt.innerText = length;
        });
    });
}

// 드롭다운 내 기타 텍스트 필드
function dropdownText(e) {
    const label = e.target.nextElementSibling;
    const textField = label.nextElementSibling;

    if (e.target.checked) {
        textField.disabled = false;
    } else {
        textField.disabled = true;
    }
}

// selectbox === dropdown
function dropdown() {
    const dropdownElem = document.querySelectorAll('[data-selectbox]');
    const CLASS_IS = '__open';
    const CLASS_ON = '__on';

    for (let g = 0; g < dropdownElem.length; g++) {
        const trigger = dropdownElem[g].querySelector('[selectbox-trg]');

        trigger.addEventListener('click', trg => {
            const list = trg.target.nextElementSibling;
            const parentElems = trg.target.parentNode;
            const eachBtn = list.querySelectorAll('button');

            const openEvent = () => {
                // 위치에 따라 방향
                const winHeight = window.innerHeight / 2;
                const targetTop = parentElems.getBoundingClientRect().top;

                // 나머지 드롭다운 리스트 닫힘
                dropdownElem.forEach(e => {
                    e.classList.remove(CLASS_IS, '__down', '__up');
                    e.querySelector('[selectbox-list]').style.maxHeight = 0;
                    e.querySelector('[selectbox-list]').style.border = 0;
                });

                if (targetTop < winHeight) {
                    // 리스트 아래로
                    parentElems.classList.add('__down');
                    list.style.cssText = `
                        border-width: 0 0.5px 0.5px;
                        top: ${parentElems.scrollHeight}px;
                        bottom: auto
                    `;
                } else {
                    // 리스트 위로
                    parentElems.classList.add('__up');
                    list.style.cssText = `
                        border-width: 0.5px 0.5px 0;
                        bottom: ${parentElems.scrollHeight}px;
                        top: auto
                    `;
                }
                parentElems.classList.add(CLASS_IS);
                list.style.zIndex = 15;
                if (list.scrollHeight > 160) {
                    list.style.maxHeight = `160px`;
                    list.style.overflowY = 'scroll';
                } else {
                    list.style.maxHeight = `${list.scrollHeight}px`;
                }
            };

            const removeEvent = () => {
                parentElems.classList.remove(CLASS_IS, '__up', '__down');
                list.style.maxHeight = 0;
                list.style.zIndex = 10;
                setTimeout(() => {
                    list.style.borderWidth = 0;
                }, 150);
                if (parentElems.classList.contains('check')) {
                    checkEvent();
                } else if (parentElems.classList.contains('text')) {
                    textEvent();
                }
            };

            const checkEvent = () => {
                // 체크박스
                // const list = ele.querySelector('[selectbox-list]');
                const checkedInput = list.querySelectorAll('input[type=checkbox]:checked + label');
                const checkCount = checkedInput.length;

                let textIn;

                if (checkCount === 0) {
                    textIn = `선택해주세요.`;
                } else if (checkCount === 1) {
                    textIn = checkedInput[0].innerText;
                } else if (checkCount >= 2) {
                    textIn = `${checkedInput[0].innerText} 외 ${checkCount - 1}건`;
                }
                trg.target.innerText = textIn;
            };

            const textEvent = () => {
                // 체크된 항목 다 보이게
                const checkedInput = list.querySelectorAll('input[type=checkbox]:checked + label');
                // const checkArray = new Array();
                const checkArray = [];

                for (let i = 0; i < checkedInput.length; i++) {
                    const checkedText = ` ${checkedInput[i].innerHTML}`;
                    checkArray.push(checkedText);
                }

                // if (checkedInput.length !== 0) {
                //     trg.target.innerHTML = checkArray;
                // }
                if (checkedInput.length === 0) {
                    trg.target.innerText = `선택해주세요.`;
                } else {
                    trg.target.innerHTML = checkArray;
                }
            };

            if (!parentElems.classList.contains(CLASS_IS)) {
                openEvent();
            } else {
                removeEvent();
            }

            // 텍스트 출력
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
    //         console.log('닫힘X');
    //     } else {
    //         console.log('닫힘O');
    //         // removeEvent();
    //     }
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
    const week = ['월', '화', '수', '목', '금', '토', '일'];
    // const hours = String(now.getHours()).padStart(2, '0');
    const hours = String(now.getHours());
    let hour;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (hours > 12) {
        hour = hours - 12;
        dayNight.innerText = '지금은 오후';
    } else {
        hour = hours;
        dayNight.innerText = '지금은 오전';
    }

    dateElem.innerText = `오늘은 ${year}년 ${month}월 ${date}일 ${week[day]}요일`;
    clockElem.innerText = `${hour}시 ${minutes}분 ${seconds}초 입니다.`;
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
                text = '★'.repeat(content);
                span.innerText = text;
            } else {
                text = content;
                span.innerText = text;
            }
            span.style.display = 'block';
        });
        el.addEventListener('mouseout', () => {
            // const span = el.childNodes[1];
            const span = el.querySelector('span');
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

// popup_dimmed remove
function popDimmedRemove() {
    const CLASS_IS = '__show';
    const popDimmed = document.querySelector('.popup-dimmed');

    popDimmed.classList.remove(CLASS_IS);
    setTimeout(() => {
        popDimmed.remove();
    }, 500);
}

// popup close
function popClose(el) {
    const CLASS_IS = '__show';
    const popup = el.target.closest('.popup');
    popDimmedRemove();
    popup.classList.remove(CLASS_IS);
}

// toast popup
function toast(el) {
    const CLASS_ON = '__show';
    const elem = document.createElement('div');
    const footer = document.querySelector('#footer');
    elem.classList.add('popup-toast');
    elem.innerHTML = `${el}`;
    footer.after(elem);
    document.querySelector('#wrap').style.pointerEvents = 'none';
    setTimeout(() => {
        elem.classList.add(CLASS_ON);
        setTimeout(() => {
            elem.classList.remove(CLASS_ON);
            document.querySelector('#wrap').style.pointerEvents = 'visible';
            setTimeout(() => {
                elem.remove();
            }, 500);
        }, 1500);
    }, 200);
}

// 페이지 진입 시 뜨는 layer
const introLayer = setTimeout(() => {
    const layer = document.getElementById('introLayer');
    layer.style.opacity = 0;
    setTimeout(() => {
        layer.remove();
    }, 200);
}, 10000);

// 메인 상단 텍스트
function quoteChange() {
    const textWrap = document.querySelector('.text-greeting > h1');
    const quotes = ['성유진의', '퍼블리싱', '성실한', '웹퍼블리셔']; // 5글자 이하로
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
    // scroll event
    const scrollContent = document.querySelector('.container');
    const topBtn = document.querySelector('.btn-top');

    scrollContent.addEventListener('scroll', () => {
        scrollIndicator();
        findScroll();

        // top-btn
        if (scrollContent.scrollTop < 300) {
            topBtn.style.opacity = 0;
            topBtn.style.zIndex = -1;
        } else {
            topBtn.style.opacity = 1;
            topBtn.style.zIndex = 1;
        }
    });

    // quoteChange();
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
    changeMode();
    inputRange();
    delBtn();
    // themeChange();
    textCount();

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
    document.addEventListener('keyup', e => {
        const CLASS_IS = '__show';
        // esc 누르면 팝업 닫기
        const popupId = document.querySelector('.popup.__show');
        if (document.body.contains(popupId)) {
            // body에 .popup.__show있는지 여부 확인
            if (e.keyCode === 27) {
                popupId.classList.remove(CLASS_IS);
                popDimmedRemove();
            }
        }
    });
});

// scroll up/down
window.addEventListener('wheel', e => {
    const scrollY = e.deltaY;
    // const scrollX = e.deltaX;

    if (scrollY < 0) {
        console.log('scroll up!');
    } else {
        console.log('scroll down!');
    }
});

// resize
window.addEventListener('resize', () => {
    navBottom();
    setScreenHeight();
});

window.addEventListener('touchend', () => {
    setScreenHeight();
});

// mousemove
window.addEventListener('mousemove', el => {
    const cursor = document.querySelector('#cursor');
    const mouseX = el.clientX - 20;
    const mouseY = el.clientY - 20;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});
