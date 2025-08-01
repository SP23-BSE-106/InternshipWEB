function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  const span = document.createElement("span");
  span.textContent = "✖";
  span.className = "delete";
  span.onclick = () => li.remove();

  li.appendChild(span);
  document.getElementById("todo-list").appendChild(li);

  input.value = "";
}
