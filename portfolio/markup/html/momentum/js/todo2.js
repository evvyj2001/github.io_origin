const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn');
const leftItemsElem = document.querySelector('.left-items');

const showAllBtnElem = document.querySelector('.show-all-btn');
const showActiveBtnElem = document.querySelector('.show-active-btn');
const showCompletedBtnElem = document.querySelector('.show-completed-btn');
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn');

let id = 0;
const setId = newId => {
    id = newId;
};

let isAllCompleted = false; // 전체 todos 체크 여부
const setIsAllCompleted = bool => {
    isAllCompleted = bool;
};

let currentShowType = 'all';
// const setCurrentShowType = newShowType => ();
const setCurrentShowType = newShowType => {
    currentShowType = newShowType;
};
let todos = [];

const TODOS_KEYS = 'items';

const setTodos = newTodos => {
    todos = newTodos;
};

const getAllTodos = () => todos;

const getCompletedTodos = () => todos.filter(todo => todo.isCompleted === true);

// 현재 완료되지 않은 리스트 반환
const getActiveTodos = () => todos.filter(todo => todo.isCompleted === false);

const setLeftItems = () => {
    const leftTodos = getActiveTodos();
    // if (leftTodos.length == 0) {
    // 	leftItemsElem.innerHTML = `🔔 할 일이 <span>0개</span> 있습니다.`;
    // } else {
    // 	leftItemsElem.innerHTML = `🔔 할 일이 <span>${leftTodos.length}개</span> 있습니다.`;
    // }
    leftItemsElem.innerHTML = `🔔 할 일이 <span>${leftTodos.length}개</span> 있습니다.`;
};

// 할 일이 추가될 때마다 paintTodos()를 실행
const paintTodo = todo => {
    // 'todo-item'에 해당하는 html을 그려서 'todo-list'추가하기
    const todoItemElem = document.createElement('li');
    todoItemElem.classList.add('todo-item');

    todoItemElem.setAttribute('data-id', todo.id);

    const checkboxElem = document.createElement('div');
    checkboxElem.classList.add('checkbox');
    checkboxElem.addEventListener('click', () => completeTodo(todo.id));

    const divElem = document.createElement('div');
    divElem.classList.add('cont');

    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.addEventListener('dblclick', event => onDbclickTodo(event, todo.id)); // event객체와 할 일의 id를 인자로 받는다.
    todoElem.innerText = todo.content;

    const dateElem = document.createElement('span');
    dateElem.classList.add('date');
    dateElem.innerHTML = todo.date;

    const delBtnElem = document.createElement('button');
    delBtnElem.classList.add('delBtn');
    delBtnElem.addEventListener('click', () => deleteTodo(todo.id)); // delBtn 클릭 시 삭제 이벤트 실행
    delBtnElem.innerHTML = '❌';

    if (todo.isCompleted) {
        todoItemElem.classList.add('checked');
        checkboxElem.innerText = '✔';
    }

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(divElem);
    divElem.appendChild(todoElem);
    divElem.appendChild(dateElem);
    todoItemElem.appendChild(delBtnElem);
    todoListElem.appendChild(todoItemElem);
};

// paintTodos() -> currentShowType에 따라 렌더링 될 수 있도록 분기
const paintTodos = () => {
    todoListElem.innerHTML = null; // todoListElem내 초기화
    const allTodos = getAllTodos();
    const activeTodos = getActiveTodos();
    const completedTodos = getCompletedTodos();
    switch (currentShowType) {
        case 'all':
            allTodos.forEach(todo => {
                paintTodo(todo);
            });
            break;
        case 'active':
            activeTodos.forEach(todo => {
                paintTodo(todo);
            });
            break;
        case 'completed':
            completedTodos.forEach(todo => {
                paintTodo(todo);
            });
            break;
        default:
            break;
    }
};
const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({
        ...todo,
        isCompleted: true,
    }));
    todos.push(newTodos);
    setTodos(newTodos);
    paintTodos();
    saveTodos(newTodos);
};

const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos = getAllTodos().map(todo => ({
        ...todo,
        isCompleted: false,
    }));
    todos.push(newTodos);
    setTodos(newTodos);
    paintTodos();
    saveTodos(newTodos);
};

// 전체 todos의 체크 여부(isCompleted)
const checkIsAllCompleted = () => {
    if (getAllTodos().length === getCompletedTodos().length) {
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    } else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
};

const onClickCompleteAll = () => {
    if (!getAllTodos().length) {
        // todos 배열 길이가 0이면 return
        return;
    }

    if (isAllCompleted) {
        // isAllCompleted가 true이면 todos 전체 미완료 처리
        incompleteAll();
    } else {
        // false면 전체 완료 처리
        completeAll();
    }
    setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
    paintTodos();
    setLeftItems();
};

const saveTodos = () => {
    localStorage.setItem(TODOS_KEYS, JSON.stringify(todos));
};
// getAlltodos()로 가지고 온 배열을 .concat을 통해 추가된 배열을 newTodos에 저장
const appendTodos = text => {
    const newId = id + 1;
    setId(newId);
    const date = new Date();
    const year = date.getFullYear();
    const getMonth = String(date.getMonth() + 1);
    const month = getMonth.padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const now = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 등록`;

    const newTodos = getAllTodos().concat({ id: newId, isCompleted: false, content: text, date: now });

    todos.push(newTodos);
    setTodos(newTodos);
    setLeftItems();
    checkIsAllCompleted();
    paintTodos();
    saveTodos(newTodos);
};

const deleteTodo = todoId => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);

    todos.push(newTodos);
    setTodos(newTodos);
    setLeftItems();
    paintTodos();
    saveTodos(newTodos);
};

const completeTodo = todoId => {
    const newTodos = getAllTodos().map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
    todos.push(newTodos);
    setTodos(newTodos);
    setLeftItems();
    paintTodos();
    checkIsAllCompleted();
    saveTodos(newTodos);
};

const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const date = new Date();
    const year = date.getFullYear();
    const getMonth = String(date.getMonth() + 1);
    const month = getMonth.padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const now = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 수정`;
    // const newTodos = getAllTodos().map((todo) => (todo.id === todoId ? { ...todo, content: text } : todo));
    const newTodos = currentTodos.map(todo => (todo.id === todoId ? { ...todo, content: text, date: `${now}` } : todo));

    todos.push(newTodos);
    setTodos(newTodos);
    paintTodos();
    saveTodos(newTodos);
};

const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');

    const onClickBody = evt => {
        if (evt.target !== inputElem) {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody);
        }
    };

    inputElem.addEventListener('keypress', evt => {
        if (evt.key === 'Enter') {
            updateTodo(evt.target.value, todoId); // 엔터키 눌리면 updateTodo() 실행 및 텍스트 수정
            document.body.removeEventListener('click', onClickBody);
        }
    });

    document.body.addEventListener('click', onClickBody);
    todoItemElem.appendChild(inputElem); // todo 텍스트 위에 올라가는 input(수정용)
};

const clearCompletedTodos = () => {
    const newTodos = getActiveTodos();
    todos.push(newTodos);
    setTodos(newTodos);
    paintTodos();
    saveTodos(newTodos);
};

const onClickShowTodosType = e => {
    const currentBtnElem = e.target;
    const newShowType = currentBtnElem.dataset.type;

    if (currentShowType === newShowType) return;

    const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
    preBtnElem.classList.remove('selected');

    currentBtnElem.classList.add('selected');
    setCurrentShowType(newShowType);

    paintTodos();
};

const init = () => {
    todoInputElem.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            if (todoInputElem.value === '') {
                alert('내용을 입력해주세요');
                return;
            }
            appendTodos(e.target.value);
            todoInputElem.value = '';
        }
    });

    completeAllBtnElem.addEventListener('click', onClickCompleteAll);
    showAllBtnElem.addEventListener('click', onClickShowTodosType);
    showActiveBtnElem.addEventListener('click', onClickShowTodosType);
    showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
    clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);

    const savedToDos = localStorage.getItem(TODOS_KEYS);
    if (savedToDos !== null) {
        const parsedTodos = JSON.parse(savedToDos);
        todos = parsedTodos;
        parsedTodos.forEach(paintTodos);
        id = todos.length;
    }
    setLeftItems();
};

init();
