var arrItems = [];
let deleteItemIndex = -1;

let addButtom = document.querySelector(".todo-action-add");
let deleteButtom = document.querySelector(".todo-action-delete");
let submitButtom = document.querySelector("input[type='submit']");

function initData() {
  for (let i = 0; i < arrItems.length; i++) {
    let item = document.createElement("div");
    item.classList.add("todo-item");
    item.setAttribute("onclick", `onviewDescription(${i})`);

    let title = document.createElement("p");
    title.innerHTML = arrItems[i].title;
    item.appendChild(title);

    let todoList = document.querySelector(".todo-list");
    todoList.appendChild(item);
  }
}
function removeData() {
  let todoItems = document.querySelectorAll(".todo-item");
  for (let i = 0; i < todoItems.length; i++) {
    todoItems[i].remove();
  }
}

initData();

function onviewDescription(index) {
  deleteItemIndex = index;
  for (const itemIndex in arrItems) {
    let itemClick = document.querySelector(
      `.todo-item:nth-child(${Number(itemIndex) + 1})`
    );
    if (index === Number(itemIndex)) {
      let todoContent = document.querySelector(".todo-description");
      let todoAdd = document.querySelector(".todo-add");
      let titleItem = document.querySelector("#title");
      let descriptionItem = document.querySelector("#description");

      titleItem.innerHTML = arrItems[index].title;
      descriptionItem.innerHTML = arrItems[index].description;

      if (todoContent.classList.contains("display-none")) {
        if (!todoAdd.classList.contains("display-none")) {
          todoAdd.classList.add("display-none");
        }
        todoContent.classList.remove("display-none");
      }
      if (!itemClick.classList.contains("item-action")) {
        itemClick.classList.add("item-action");
      }
    } else if (itemClick.classList.contains("item-action")) {
      itemClick.classList.remove("item-action");
    }
  }
}

addButtom.addEventListener("click", () => {
  let todoContent = document.querySelector(".todo-description");
  let todoAdd = document.querySelector(".todo-add");
  if (todoAdd.classList.contains("display-none")) {
    if (!todoContent.classList.contains("display-none")) {
      todoContent.classList.add("display-none");
    }
    todoAdd.classList.remove("display-none");
  }
});

deleteButtom.addEventListener("click", () => {
  for (let i = 0; i < arrItems.length; i++) {
    if (i === deleteItemIndex) {
      arrItems.splice(deleteItemIndex, 1);
      document.querySelector("#title").innerHTML = "";
      document.querySelector("#description").innerHTML = "";
      removeData();
      initData();
    }
  }
});

submitButtom.addEventListener("click", (event) => {
  let inputTitle = document.querySelector("#input-title");
  let inputDescription = document.querySelector("#input-description");
  if (inputTitle.value && inputDescription.value) {
    arrItems.push({
      title: inputTitle.value,
      description: inputDescription.value,
    });
    removeData();
    initData();
    inputTitle.value = "";
    inputDescription.value = "";
  } else {
    // alert("Input not required");
    if (!inputTitle.value) {
      inputTitle.focus();
    } else if (!inputDescription.value) {
      inputDescription.focus();
    }
  }
});
