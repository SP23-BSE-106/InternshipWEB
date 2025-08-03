// function addTodo() {
//   const input = document.getElementById("todo-input");
//   const text = input.value.trim();

//   if (text === "") return;

//   const li = document.createElement("li");
//   li.textContent = text;

//   const span = document.createElement("span");
//   span.textContent = "✖";
//   span.className = "delete";
//   span.onclick = () => li.remove();

//   li.appendChild(span);
//   document.getElementById("todo-list").appendChild(li);

//   input.value = "";
// }
function addTodo() {
  // Step 1: Get the input box and the text written in it
  let input = document.getElementById("todo-input");
  let text = input.value;

  // Step 2: If nothing is typed, do nothing
  if (text.trim() === "") {
    return;
  }

  // Step 3: Create a new list item (li)
  let listItem = document.createElement("li");
  listItem.textContent = text;

  // Step 4: Create a delete (✖) button
  let deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete";

  // Step 5: Remove the list item when ✖ is clicked
  deleteBtn.onclick = function () {
    listItem.remove();
  };

  // Step 6: Add the ✖ button to the list item
  listItem.appendChild(deleteBtn);

  // Step 7: Add the list item to the list
  document.getElementById("todo-list").appendChild(listItem);

  // Step 8: Clear the input box
  input.value = "";
}
