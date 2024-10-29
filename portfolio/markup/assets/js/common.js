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

            document.querySelector('.container').scrollTo({
                top: scrollElem.offsetTop,
                left: 0,
                behavior: 'smooth',
            });
        });
    });
}

// header nav bottom border effect
function navBottom() {
    const nav = document.querySelector('nav > ul');
    const lineBottom = document.querySelector('.line-bottom');

    if (document.body.contains(nav)) {
        const navWidth = nav.clientWidth;
        lineBottom.style.width = `${navWidth}px`;
    }
}

// scroll spy
function findScroll() {
    const nav = document.querySelector('.header-inner nav > ul');

    if (document.body.contains(nav)) {
        const lineBottom = document.querySelector('.line-bottom');
        const lineMove = lineBottom.querySelector('span');
        const scrollCont = document.querySelector('.scroll-content');
        const section = scrollCont.querySelectorAll('.section');
        const sections = [];

        const CLASS_IS = '__on';

        const scrollPosition = document.documentElement.scrollTop || document.querySelector('.container').scrollTop;

        Array.prototype.forEach.call(section, e => {
            sections[e.id] = e.offsetTop; // section의 id를 매개변수로 하여 해당하는 index의 section에게 e.offsetTop 부여
        });

        for (const i of Object.keys(sections)) {
            if (sections[i] <= scrollPosition + 100) {
                const item = document.querySelector(`a[data-scroll="${i}"]`);
                const itemWidth = item.clientWidth / 2;
                const position = item.offsetLeft - nav.offsetLeft;
                const lineHalf = lineMove.clientWidth / 2;

                lineMove.style.opacity = 1;
                lineMove.style.transform = `translateX(calc(${position}px + ${itemWidth}px - ${lineHalf}px))`;
                document.querySelectorAll(`.header-inner .${CLASS_IS}`).forEach(btn => {
                    btn.classList.remove(CLASS_IS);
                });
                item.parentNode.classList.add(CLASS_IS);
            }
        }
    }
}

// mobile size
function isMobile() {
    const screenSize = document.body.clientWidth;

    if (screenSize < 690) {
        // console.log('모바일 맞음');
        return true;
    }
    // console.log('모바일 아님');
    return false;
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

    if (isMobile !== true && document.body.contains(navWrap)) {
        navBtn.classList.remove(CLASS_IS);
        navWrap.style.transform = `translateX(100%)`;
    }

    // if (screenSize > 690) {
    //     navBtn.classList.remove(CLASS_IS);
    //     navWrap.style.transform = `translateX(100%)`;
    // }
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
    const THEME_STYLE = 'Theme';
    const savedTheme = localStorage.getItem(THEME_STYLE);

    if (savedTheme) {
        document.querySelector(`.btn-${savedTheme}`).classList.add('__on');
    } else {
        document.querySelector('.btn-green').classList.add('__on');
        localStorage.setItem(THEME_STYLE, 'green');
    }

    const themeColors = {
        green: ['#00c73c', '#a2fbbd', '#03862a'],
        red: ['var(--red)', '#ffa0a0', '#a21005'],
        blue: ['var(--blue)', '#8787ff', '#1212ad'],
    };

    function setTheme(theme) {
        const [mainColor, lightMainColor, darkMainColor] = themeColors[theme];
        document.documentElement.style.setProperty('--mainColor', mainColor);
        document.documentElement.style.setProperty('--lightMainColor', lightMainColor);
        document.documentElement.style.setProperty('--darkenMainColor', darkMainColor);
    }

    setTheme(savedTheme || 'green');

    document.querySelectorAll('.theme-select > button').forEach(el => {
        const theme = el.title;
        el.addEventListener('click', () => {
            document.querySelector('.theme-select > button.__on').classList.remove('__on');
            el.classList.add('__on');
            localStorage.setItem(THEME_STYLE, theme);
            setTheme(theme);
        });
    });
}

// tabcontent + tabmenu
function tabMenuFunction() {
    const CLASS_IS = '__on';

    document.querySelectorAll('[data-tab-wrap]').forEach(tabWrap => {
        const tabMenu = tabWrap.querySelector('[tab-menu-wrap]');
        const tabCont = tabWrap.querySelector('[tab-container]');
        const tabBtns = tabMenu.querySelectorAll('[data-tab-menu]');
        const tabContents = tabWrap.querySelectorAll('[data-tab-content]');

        function activateTab(btnText) {
            for (const content of tabContents) {
                if (btnText === 'all' || content.dataset.tabContent === btnText) {
                    // data-tab-content가 btnText와 동일하면 해당 element에 class 추가
                    content.classList.add(CLASS_IS);
                } else {
                    content.classList.remove(CLASS_IS);
                }
            }
            for (const btn of tabBtns) {
                // tabBtns의 btn(매개변수격)의 data-tab-menu가 btnText와 동일하면 해당 element에 class 추가
                if (btn.dataset.tabMenu === btnText) {
                    btn.classList.add(CLASS_IS);
                } else {
                    btn.classList.remove(CLASS_IS);
                }
            }
            tabCont.scrollTop = 0;
        }

        activateTab('all'); // 초기 진입 시 all이 있을 경우 전부 노출, 아닐 경우 첫번째만 노출

        tabMenu.addEventListener('click', e => {
            const btn = e.target.closest('[data-tab-menu]');
            if (btn) {
                activateTab(btn.dataset.tabMenu);
            }
        });
    });
}

// input text del-btn
function delBtn() {
    document.querySelectorAll('.inp-box.__del').forEach(inputWrap => {
        const inputElem = inputWrap.querySelector('input, textarea');
        const btn = inputElem.parentElement.appendChild(document.createElement('button'));
        // btn.innerText = 'X';
        btn.classList.add('btn-del');
        btn.style.display = 'none';

        inputElem.addEventListener('input', () => {
            btn.style.display = inputElem.value ? 'block' : 'none';
        });
        btn.addEventListener('click', () => {
            inputElem.value = '';
            btn.style.display = 'none';
        });
    });
}

// input range
function inputRange() {
    document.querySelectorAll('input[type="range"]').forEach(inp => {
        const parentElem = inp.parentElement;

        inp.addEventListener('input', e => {
            const { min, max, value: val, offsetWidth } = e.target;
            const move = `${(offsetWidth / 100) * val}`;
            const more = `${2.5 * (val / 10) - 12.5}`;

            if (parentElem.classList.contains('flag-mode')) {
                const flag = parentElem.querySelector('.result-wrap span');
                flag.innerText = val;

                const moveResult = Number(move) + (more < 0 ? Math.abs(more) : more * -1);
                flag.style = `transform: translateX(${moveResult}px)`;
            }

            inp.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`;
        });
    });
}

// textcounting
function textCount() {
    document.querySelectorAll('.inp-box.__count').forEach(textfield => {
        const area = textfield.querySelector('input, textarea');
        if (area) {
            area.addEventListener('input', () => {
                const { length } = area.value;
                const cnt = area.nextElementSibling.querySelector('span');
                cnt.innerText = length;
            });
        }
    });
}

// 드롭다운 내 기타 텍스트 필드
function dropdownText(e) {
    const label = e.target.nextElementSibling;
    const textField = label.nextElementSibling;

    // if (e.target.checked) {
    //     textField.disabled = false;
    // } else {
    //     textField.disabled = true;
    // }
    textField.disabled = !e.target.checked;
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

    // 외부 영역 클릭 시 닫힘 이벤트 작동 시 text, check 이벤트 안돌아가서 일단 보류 ㅠㅠ
    // const handleOutSideClick = hdEvent => {
    //     dropdownElem.forEach(each => {
    //         if (each && !each.contains(hdEvent.target)) {
    //             const list = each.querySelector('ul');
    //             each.className = '';
    //             list.style.maxHeight = 0;
    //             list.style.zIndex = 10;
    //             setTimeout(() => {
    //                 list.style.borderWidth = 0;
    //             }, 150);
    //         }
    //     });
    // };

    // document.addEventListener('click', handleOutSideClick);
}

function toggleAccordion(accordionBtn, accordionCont) {
    const CLASS_IS = '__show';
    const parent = accordionBtn.parentElement;
    const stat = parent.dataset.accordion;

    if (stat === '1') {
        accordionBtn.classList.toggle(CLASS_IS);
        accordionCont.classList.toggle(CLASS_IS);

        accordionCont.style.maxHeight = accordionCont.style.maxHeight ? null : `${accordionCont.scrollHeight}px`;
        accordionCont.style.paddingtop = accordionCont.style.maxHeight ? null : `2rem 0`;
    } else {
        const accordions = parent.parentElement.querySelectorAll('[data-accordion]');

        if (!accordionBtn.classList.contains(CLASS_IS)) {
            accordions.forEach(el => {
                const otherTrg = el.querySelector('[accordion-trg]');
                const otherCont = el.querySelector('[accordion-cont]');

                otherTrg.classList.remove(CLASS_IS);
                otherCont.classList.remove(CLASS_IS);
                otherCont.style.maxHeight = null;

                setTimeout(() => {
                    otherCont.style.padding = 0;
                    accordionCont.style.paddingTop = `2rem 0`;
                }, 50);
            });

            accordionBtn.classList.add(CLASS_IS);
            accordionCont.classList.add(CLASS_IS);
            accordionCont.style.maxHeight = `${accordionCont.scrollHeight}px`;
        } else {
            accordionBtn.classList.remove(CLASS_IS);
            accordionCont.classList.remove(CLASS_IS);
            accordionCont.style.maxHeight = null;
        }
    }
}

function accordion() {
    document.querySelectorAll('[data-accordion]').forEach(accordionWrap => {
        const accordionBtn = accordionWrap.querySelector('[accordion-trg]');
        const accordionCont = accordionWrap.querySelector('[accordion-cont]');

        accordionBtn.addEventListener('click', () => {
            toggleAccordion(accordionBtn, accordionCont);
        });
    });
}

// date
function isNow() {
    const now = new Date();
    const hour = now.getHours();
    const dayNight = hour >= 12 ? '오후' : '오전';
    const hours12 = hour % 12 || 12; // 0시를 12시로 표기하기 위함
    const week = ['월', '화', '수', '목', '금', '토', '일'];

    document.querySelectorAll('.now').forEach(elem => {
        const dateElem = elem.querySelector('.date');
        const clockElem = elem.querySelector('.clock');
        const dayOfWeek = week[now.getDay() - 1];
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (dateElem) {
            dateElem.innerText = `오늘은 ${year}년 ${month}월 ${date}일 ${dayOfWeek}요일`;
        }

        if (clockElem) {
            clockElem.innerText = `지금은 ${dayNight} ${hours12}시 ${minutes}분 ${seconds}초 입니다.`;
        }
    });
}

setInterval(isNow, 1000);

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

function tooltip() {
    const tooltipElem = document.querySelectorAll('[data-tooltip]');

    const tooltipActive = el => {
        const span = document.createElement('span');
        const content = el.dataset.tooltip;
        el.appendChild(span);
        let text;
        if (el.classList.contains('star')) {
            text = '★'.repeat(content);
        } else {
            text = content;
        }
        span.innerText = text;
        span.style.display = 'block';
    };

    const tooltipRemove = el => {
        const span = el.lastChild;
        if (span && span.tagName === 'SPAN') {
            span.remove();
        }
    };

    tooltipElem.forEach(el => {
        el.addEventListener('mouseenter', () => {
            tooltipActive(el);
        });
        el.addEventListener('focus', () => {
            tooltipActive(el);
        });
        el.addEventListener('mouseout', () => {
            tooltipRemove(el);
        });
        el.addEventListener('blur', () => {
            tooltipRemove(el);
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
}, 6000);

// 메인 상단 텍스트
function quoteChange() {
    const textWrap = document.querySelector('.text-greeting > h1');
    const quotes = ['성유진의', '퍼블리싱', '성실한', '웹퍼블리셔', '프론트엔드']; // 5글자 이하로
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

// sub page nav 미노출
function subPageFunction() {
    const nav = document.querySelectorAll('nav, .nav-wrap');
    nav.forEach(e => {
        e.remove();
    });
}

// circle effect
function circeEffect() {
    const circleWrap = document.querySelectorAll('.circle-pregress');
    circleWrap.forEach(e => {
        const pauseBtn = e.querySelector('.btn-pause');
        const leftBar = e.querySelector('.left .bar');
        const rightBar = e.querySelector('.right .bar');

        pauseBtn.addEventListener('click', el => {
            const txt = el.target.innerText;
            if (txt === 'paused') {
                el.target.innerText = 'running';
            } else {
                el.target.innerText = 'paused';
            }

            leftBar.style.animationPlayState = txt;
            rightBar.style.animationPlayState = txt;
        });
    });
}

// circle svg effect
function svgCircle() {
    const circleWrap = document.querySelectorAll('.circle-progress-wrap');

    if (circleWrap) {
        circleWrap.forEach(e => {
            const control = e.querySelector('#control');
            const bar = e.querySelector('.bar');
            const value = e.querySelector('.value');

            const RADIUS = 54;
            const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

            const progress = per => {
                const progressCal = per / 100;
                const dashoffset = CIRCUMFERENCE * (1 - progressCal);

                value.innerHTML = per + '%';
                bar.style.strokeDashoffset = dashoffset;
            };

            control.addEventListener('input', event => {
                progress(event.target.valueAsNumber);
            });
            control.addEventListener('change', event => {
                progress(event.target.valueAsNumber);
            });
            bar.style.strokeDasharray = CIRCUMFERENCE;
            progress(60);
        });
    }
}

// load
window.addEventListener('DOMContentLoaded', () => {
    // scroll event
    const scrollContent = document.querySelector('.container');
    const topBtn = document.querySelector('.btn-top');

    scrollContent.addEventListener('scroll', () => {
        scrollIndicator();
        findScroll(); // nav tab

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
    dragScroll();
    tabMenuFunction();
    accordion();
    dropdown();
    changeMode();
    inputRange();
    delBtn();
    textCount();
    isMobile();
    circeEffect();
    svgCircle();

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
// window.addEventListener('wheel', e => {
//     const scrollY = e.deltaY;
//     // const scrollX = e.deltaX;

//     if (scrollY < 0) {
//         console.log('scroll up!');
//     } else {
//         console.log('scroll down!');
//     }
// });

// scroll
// const container = document.querySelector('.container');

// container.addEventListener('scroll', () => {

// });

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
