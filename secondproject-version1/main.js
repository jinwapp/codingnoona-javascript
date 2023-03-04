//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.

// delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.

//진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은 끝난 아이템만, 진행중은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴.

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let filterList = [];
let mode = 'all';
let list = [];

for (let i = 1; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function (event) {
		filter(event);
	});
}

addButton.addEventListener('click', addTask);

function addTask() {
	let task = {
		id: getRandom(),
		taskContent: taskInput.value,
		isComplete: false,
	};
	taskList.push(task);
	console.log('taskList', taskList);
	render();
}

function render() {
	if (mode == 'all') {
		list = taskList;
	} else if (mode == 'ongoing' || mode == 'done') {
		list = filterList;
	}
	let resultHTML = '';
	for (let i = 0; i < list.length; i++) {
		if (list[i].isComplete == true) {
			resultHTML += `
			<div class="task">
				<div class = "task-done">${list[i].taskContent}</div>
				<div>
					<button onclick = "completedToggle('${list[i].id}')">check</button>
					<button onclick = "deleteTask('${list[i].id}')"> delete </button>
				</div>
			</div>`;
		} else {
			resultHTML += `
			<div class="task">
				<div>${list[i].taskContent}</div>
				<div>
					<button onclick = "completedToggle('${list[i].id}')">check</button>
					<button onclick = "deleteTask('${list[i].id}')"> delete </button>
				</div>
			</div>`;
		}
	}
	document.getElementById('task-list').innerHTML = resultHTML;
}

function completedToggle(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList[i].isComplete = !taskList[i].isComplete;
			break;
		}
	}
	render();
}

function filter(event) {
	mode = event.target.id;
	filterList = [];
	if (mode == 'all') {
		render();
	} else if (mode == 'ongoing') {
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete == false) {
				filterList.push(taskList[i]);
			}
		}
		render();
	} else if (mode == 'done') {
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete == true) {
				filterList.push(taskList[i]);
			}
		}
		render();
	}
}

function deleteTask(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList.splice(i, 1);
			break;
		}
	}
	render();
}

function getRandom() {
	return Math.random();
}
