const toDoList = document.querySelector("#list");
const toDoInput = document.querySelector("#input");

const checkBtn = "fa-check-circle";
const uncheckBtn = "fa-circle-thin";
const textLineThrough = "line-through";



let toDoContainer, id;

let toDoData = localStorage.getItem("to-do-item");

if (toDoData) {
  toDoContainer = JSON.parse(toDoData);
  id = toDoContainer.length;
  loadToDoContainer(toDoContainer);
} else {
  toDoContainer = [];
  id = 0;
}

function loadToDoContainer(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// addToDo Function
function addToDo(toDo, id, done, trash) {
  if (trash) return;

  const toDoDone = done ? checkBtn : uncheckBtn;
  const toDoLine = done ? textLineThrough : "";
  const item = `
                <li class="item">
                  <i class="fa ${toDoDone} complete" status="complete" id="${id}"></i>
                  <p class="text ${toDoLine}">${toDo}</p>
                  <i class="fa fa-trash-o delete" status="delete" id="${id}"></i>
                </li>
                `;
  const toDoItemPosition = "beforeend";
  toDoList.insertAdjacentHTML(toDoItemPosition, item);
}

// Adding a to-do the list when the enter key is pressed
document.addEventListener("keyup", displayToDo);

// displayToDo Function
function displayToDo(event) {
  if (
    event.keyCode === 13 ||
    event.target.classList.value === "fa fa-plus-circle"
  ) {
    const toDo = input.value;
    // checking whether the input field is NOT empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      toDoContainer.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("to-do-item", JSON.stringify(toDoContainer));

      id++;
    }
    input.value = "";
  }
}

// When a to do is completed
function completeToDo(toDoItem) {
  toDoItem.classList.toggle(checkBtn);
  toDoItem.classList.toggle(uncheckBtn);
  toDoItem.parentNode.querySelector(".text").classList.toggle(textLineThrough);

  toDoContainer[toDoItem.id].done = toDoContainer[toDoItem.id].done
    ? false
    : true;
}

// When a to do is removed
function removeToDo(toDoItem) {
  toDoItem.parentNode.parentNode.removeChild(toDoItem.parentNode);
  toDoContainer[toDoItem.id].trash = true;
}


// Targeting the dynamically created to do items
toDoList.addEventListener("click", function (evt) {
  if (
    evt.path[0].localName === "p" ||
    evt.path[0].localName === "li" ||
    evt.path[0].localName === "ul"
  )
    return;

  const toDoItem = evt.target;
  const toDoStatus = toDoItem.attributes.status.value;

  if (toDoStatus === "complete") {
    completeToDo(toDoItem);
  } else if (toDoStatus === "delete") {
    removeToDo(toDoItem);
  }

  localStorage.setItem("to-do-item", JSON.stringify(toDoContainer));
});
