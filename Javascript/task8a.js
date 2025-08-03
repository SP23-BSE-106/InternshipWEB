function openTab(evt, tabName) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  contents.forEach(content => content.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}



// function openTab(event, tabName) {
//   // Step 1: Hide all tab content
//   let allTabs = document.getElementsByClassName("tab-content");
//   for (let i = 0; i < allTabs.length; i++) {
//     allTabs[i].classList.remove("active");
//   }

//   // Step 2: Remove "active" from all buttons
//   let allButtons = document.getElementsByClassName("tab-btn");
//   for (let i = 0; i < allButtons.length; i++) {
//     allButtons[i].classList.remove("active");
//   }

//   // Step 3: Show the tab that was clicked
//   let selectedTab = document.getElementById(tabName);
//   selectedTab.classList.add("active");

//   // Step 4: Add "active" to the clicked button
//   event.currentTarget.classList.add("active");
// }
