const inpTask = document.getElementById("inpTask"),
  btnAdd = document.getElementById("add_btn"),
  btndel = document.getElementById("delete_btn"),
  btnsort = document.getElementById("sort_btn"),
  btnclear = document.getElementById("clear_btn"),
  listTasks = document.getElementById("listTasks");
let allTasks = [],
  localStorageTaskList = []; // stores[done/not, name]

window.onload = () => {
  localStorageTaskList = JSON.parse(localStorage.getItem("tasks"));
  if (localStorageTaskList) {
    for (let i = 0; i < localStorageTaskList.length; i++) {
      let taskName = localStorageTaskList[i][1];
      let in_html = getListText(taskName);
      let newTaskListItem = document.createElement("li");
      newTaskListItem.innerHTML = in_html;
      if (i == 0) {
        upButtonDisplayNone(newTaskListItem);
      } else {
        upButtonDisplayVis(newTaskListItem);
      }
      if (i == localStorageTaskList.length - 1) {
        downButtonDisplayNone(newTaskListItem);
      } else {
        downButtonDisplayVis(newTaskListItem);
      }
      listTasks.appendChild(newTaskListItem);
      let val = localStorageTaskList[i][0];
      if (val == 1) {
        newTaskListItem.querySelector("input").checked = true;
        newTaskListItem.querySelector("span").style.textDecoration =
          "line-through";
      }
      allTasks.push([val, newTaskListItem]);
    }
  }
};

function addItemToList(taskName) {
  let in_html = getListText(taskName);
  let newTaskListItem = document.createElement("li");
  newTaskListItem.innerHTML = in_html;
  allTasks.push([0, newTaskListItem]);
  updateButtonDisplay();
  listTasks.appendChild(newTaskListItem);
  updateLocalStorage();
}

function getNewTaskName() {
  return inpTask.value;
}

btnAdd.onclick = function () {
  let newTaskName = getNewTaskName();
  if (newTaskName) addItemToList(newTaskName);
  inpTask.value = "";
};

btndel.onclick = () => {
  let tempList = [];
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i][0] == 1) {
      listTasks.removeChild(allTasks[i][1]);
    } else {
      tempList.push(allTasks[i]);
    }
  }
  allTasks = tempList;
  updateButtonDisplay();
  updateLocalStorage();
};

btnsort.onclick = () => {
  allTasks.sort();
  clearAll();
  for (let i = 0; i < allTasks.length; i++) {
    listTasks.appendChild(allTasks[i][1]);
  }
  updateButtonDisplay();
  updateLocalStorage();
};

btnclear.onclick = () => {
  inpTask.value = "";
};

// function for strike-through
function clickedBox(checkBox) {
  element = checkBox.parentElement;
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i][1] == element) {
      if (allTasks[i][0] == 0) {
        allTasks[i][0] = 1;
        element.querySelector("span").style.textDecoration = "line-through";
        break;
      } else {
        allTasks[i][0] = 0;
        element.querySelector("span").style.textDecoration = "none";
      }
    }
  }
  updateLocalStorage();
}

function up(upButton) {
  element = upButton.parentElement;
  let index = -1;
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i][1] == element) {
      index = i - 1;
      break;
    }
  }
  if (index != -1) {
    swap(index, index + 1);
    clearAll();
    for (let i = 0; i < allTasks.length; i++) {
      listTasks.appendChild(allTasks[i][1]);
    }
    updateButtonDisplay();
  }
  updateLocalStorage();
}

function down(downButton) {
  element = downButton.parentElement;
  let index = -1;
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i][1] == element) {
      index = i;
      break;
    }
  }
  if (index != -1) {
    swap(index, index + 1);
    clearAll();
    for (let i = 0; i < allTasks.length; i++) {
      listTasks.appendChild(allTasks[i][1]);
    }
    updateButtonDisplay();
  }
  updateLocalStorage();
}

inpTask.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName === "Enter") {
    let newTaskName = getNewTaskName();
    if (newTaskName) addItemToList(newTaskName);
    inpTask.value = "";
  }
});

//  utility functions

function updateLocalStorage() {
  let tempList = [],
    element,
    val;
  for (let i = 0; i < allTasks.length; i++) {
    val = allTasks[i][0];
    element = allTasks[i][1];
    let txt = element.querySelector("span").innerText;
    tempList.push([val, txt]);
  }
  localStorage.setItem("tasks", JSON.stringify(tempList));
}

function clearAll() {
  while (listTasks.firstChild) {
    listTasks.removeChild(listTasks.firstChild);
  }
}

function swap(i, j) {
  x = allTasks[i];
  allTasks[i] = allTasks[j];
  allTasks[j] = x;
}

function getListText(taskName) {
  return `<button class="btn btn-info" onclick="up(this)">&#8593;
  </button> <button class="btn btn-info" onclick="down(this)">&#8595;</button> 
  <input type="checkbox" onclick="clickedBox(this)"></button> <span>${taskName}</span>`;
}

function updateButtonDisplay() {
  for (let i = 0; i < allTasks.length; i++) {
    if (i == 0) {
      upButtonDisplayNone(allTasks[i][1]);
    } else {
      upButtonDisplayVis(allTasks[i][1]);
    }
    if (i == allTasks.length - 1) {
      downButtonDisplayNone(allTasks[i][1]);
    } else {
      downButtonDisplayVis(allTasks[i][1]);
    }
  }
}

function upButtonDisplayNone(element) {
  element.firstChild.style.visibility = "hidden";
}

function downButtonDisplayNone(element) {
  element.getElementsByTagName("button")[1].style.visibility = "hidden";
}

function upButtonDisplayVis(element) {
  element.firstChild.style.visibility = "visible";
}
function downButtonDisplayVis(element) {
  element.getElementsByTagName("button")[1].style.visibility = "visible";
}
