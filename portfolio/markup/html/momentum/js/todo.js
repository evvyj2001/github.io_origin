// const toDoForm = document.getElementById("todoForm");
// const toDoInput = document.querySelector("#todoForm input");
// const toDoList = document.getElementById("todoList");

// let toDos = [];
// const stat = "";

// const TODOS_KEYS = "todos";

// const toDo = {
// 	saveToDos () {
// 		localStorage.setItem(TODOS_KEYS, JSON.stringify(toDos));
// 	},
// 	deleteToDo (event) {
// 		const li = event.target.parentElement;
// 		li.remove();
// 		toDos = toDos.filter(delToDo => delToDo.id !== parseInt(li.id));
// 		toDo.saveToDos();
// 	},
// 	checkToDo (e) {
// 		const span = e.target.parentElement;
// 		const li = span.parentElement;

// 		if (!li.classList.contains("is-checked")) {
// 			li.classList.add("is-checked");
// 			statue = true;
// 		} else {
// 			li.classList.remove("is-checked");
// 			statue = false;
// 		}
// 		console.log(statue);
// 		toDos = toDos.map(check => (check.id === li.id ? { ...check, statue: !check.statue } : check));

// 		toDo.saveToDos();
// 		// toDo.paintToDo(e);
// 	},
// 	paintToDo (newTodo) {
// 		const li = document.createElement("li");
// 		li.id = newTodo.id;
// 		const span = document.createElement("span");
// 		const button = document.createElement("button");
// 		const label = document.createElement("label");
// 		const input = document.createElement("input");

// 		button.innerText = "❌";
// 		button.addEventListener("click", toDo.deleteToDo);
// 		li.appendChild(span);
// 		li.appendChild(button);
// 		span.appendChild(input);
// 		span.appendChild(label);
// 		input.setAttribute("type", "checkbox");
// 		input.setAttribute("id", `${newTodo.id}@`);
// 		label.setAttribute("for", `${newTodo.id}@`);
// 		label.innerHTML = `${newTodo.text}<em>${newTodo.date} 등록</em>`;
// 		label.addEventListener("click", toDo.checkToDo);
// 		toDoList.appendChild(li);
// 	},
// 	handletoDoSubmit (event) {
// 		event.preventDefault();
// 		const newTodo = toDoInput.value;
// 		const date = new Date();
// 		const year = date.getFullYear();
// 		const month = String(date.getMonth()).padStart(2, "0");
// 		const day = String(date.getDate()).padStart(2, "0");
// 		const hours = String(date.getHours()).padStart(2, "0");
// 		const minutes = String(date.getMinutes()).padStart(2, "0");

// 		toDoInput.value = "";
// 		// stat = "false";

// 		const newTodoObj = {
// 			text: newTodo,
// 			id: Date.now(),
// 			statue: false,
// 			date: `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`,
// 		};
// 		toDos.push(newTodoObj);
// 		toDo.paintToDo(newTodoObj);
// 		toDo.saveToDos();
// 	},
// };

// toDoForm.addEventListener("submit", toDo.handletoDoSubmit);

// const savedToDos = localStorage.getItem(TODOS_KEYS);

// // 로컬스토리지가 비어있지 않으면 화면 노출되게
// if (savedToDos !== null) {
// 	const parsedToDos = JSON.parse(savedToDos);
// 	toDos = parsedToDos;
// 	parsedToDos.forEach(toDo.paintToDo);
// }

// const toDoItem = document.querySelectorAll("#todoList li");

// toDoItem.forEach(el => {
// 	const item = el.querySelector("label");
// 	item.addEventListener("click", toDo.checkToDo);
// });
