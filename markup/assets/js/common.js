const setScreenHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const init = () => {
    setScreenHeight();
};

init();

// scroll 이벤트
window.addEventListener('scroll', () => {});

// resize 이벤트
window.addEventListener('resize', () => {
    setScreenHeight();
});
