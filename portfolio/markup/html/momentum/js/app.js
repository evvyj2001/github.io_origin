const loginForm = document.querySelector('#loginForm');
const loginInput = document.querySelector('#loginForm input');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

// 100vh
function setScreenSize() {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();

window.addEventListener('resize', () => {
    setScreenSize();
});

// Log In function
const logIn = {
    onLoginSubmit(event) {
        event.preventDefault();
        const username = loginInput.value;
        loginForm.classList.add(HIDDEN_CLASSNAME);
        localStorage.setItem(USERNAME_KEY, username);
        logIn.paintGreeting(username);
    },
    paintGreeting(username) {
        greeting.innerText = `Hello, ${username}💡`;
        greeting.classList.remove(HIDDEN_CLASSNAME);
    },
};

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', logIn.onLoginSubmit);
} else {
    // show the greeting
    logIn.paintGreeting(savedUsername);
}

// Date
const dateElem = document.querySelector('.main-date');
const dateFunc = {
    getDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const day = now.getDay() - 1;
        const week = ['월', '화', '수', '목', '금', '토', '일'];

        dateElem.innerText = `${year}년 ${month}월 ${date}일 ${week[day]}요일`;
    },
};

dateFunc.getDate();
setInterval(dateFunc.getDate, 1000);

// Clock
const clock = document.querySelector('#clock');
const clockFunc = {
    getClock() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        let hour;
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const dayNight = document.querySelector('#daynight');
        if (hours > 12) {
            dayNight.innerText = '오후';
            hour = hours - 12;
        } else {
            dayNight.innerText = '오전';
            hour = hours;
        }
        clock.innerText = `${hour}:${minutes}:${seconds}`;
    },
};

clockFunc.getClock();
setInterval(clockFunc.getClock, 1000);

// Quotes & Author
function quoteChange() {
    const quotes = [
        {
            quote: 'When they go low, we go high',
            author: 'Michelle Obama',
        },
        {
            quote: 'I was never less alone than when by myself',
            author: 'Edward Gibbon',
        },
        {
            quote: 'A friend is a second myself',
            author: 'Aristotle',
        },
        {
            quote: "Don't dream, Be it",
            author: 'Tim curry',
        },
        {
            quote: "I don't want a perfect life, I want a happy life.",
            author: 'Unknown',
        },
        {
            quote: 'Seeing is believing',
            author: 'Thomas Fuller',
        },
        {
            quote: 'When in doubt, choose change',
            author: 'Lily Leung',
        },
        {
            quote: 'Life is unfair, get used to it',
            author: 'Bill Gates',
        },
        {
            quote: 'Time is flying never to return',
            author: 'Virgil',
        },
        {
            quote: 'Happiness is a warm puppy',
            author: 'Charles M. Schulz',
        },
    ];
    const quote = document.querySelector('#quote .qu');
    const author = document.querySelector('#quote .au');

    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

    quote.innerText = todaysQuote.quote;
    author.innerText = `by. ${todaysQuote.author}`;

    // quote.style.animation = "quoteAnimation 5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite";
    // author.style.animation = "quoteAnimation 5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite";

    // setTimeout(function () {}, 5000);
}
quoteChange();
setInterval(quoteChange, 7000);

// Background
// function bgChange() {
//     const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpg'];

//     const chosenImage = images[Math.floor(Math.random() * images.length)];
//     const wrap = document.querySelector('#wrap');

//     // bg로 넣어버리면 아래 제거
//     // const bgImage = document.createElement("img");
//     // bgImage.classList.add("bg");
//     // bgImage.src = `img/${chosenImage}`;
//     // document.body.prepend(bgImage);

//     wrap.style.background = `url(img/${chosenImage}) 50% no-repeat`;
//     wrap.style.backgroundSize = 'cover';
// }
// bgChange();
// setInterval(bgChange, 7000);

// Mode Change
const modeBtn = document.querySelector('#modeSelect');

const MODE_STYLE = 'mode';
const MODE_CLASS = 'light';

const savedMode = localStorage.getItem(MODE_STYLE);
const wrap = document.querySelector('#wrap');

function modeChange(e) {
    // const wrap = document.querySelector("#wrap");
    if (wrap.classList.contains(MODE_CLASS)) {
        wrap.classList.remove(MODE_CLASS);
        e.target.innerText = '⚪';
        localStorage.setItem(MODE_STYLE, 'dark');
    } else {
        wrap.classList.add(MODE_CLASS);
        e.target.innerText = '⚫';
        localStorage.setItem(MODE_STYLE, 'light');
    }
}

if (savedMode === 'dark') {
    wrap.classList.remove(MODE_CLASS);
} else if (savedMode === 'light') {
    wrap.classList.add(MODE_CLASS);
}

modeBtn.addEventListener('click', modeChange);
