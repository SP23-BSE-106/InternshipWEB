function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabContents.forEach(tab => tab.classList.remove("active"));
  tabButtons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
