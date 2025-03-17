/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/addTask.js":
/*!***************************!*\
  !*** ./src/js/addTask.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTaskModal: () => (/* binding */ addTaskModal)
/* harmony export */ });
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskManager */ "./src/js/taskManager.js");

const openTaskButton = document.getElementById("addTaskButton");
const addTaskButton = document.getElementById("addTaskModalButton");
const smokeScreen = document.getElementById("modalSmokeScreen");
const modal = document.getElementById("addTaskModal");
const title = document.getElementById("taskTitle");
const description = document.getElementById("taskDescription");
const priority = document.getElementById("prioritySelect");
const date = document.getElementById("dueDateSelect");
const project = document.getElementById("projectsSelect");
Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
var form = document.getElementById("addTaskForm");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener('submit', handleForm);
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    modal.classList.remove("hidden"); // Ensure modal is visible
    title.focus(); // Focus on the invalid field
  }
});
function hideModal() {
  modal.classList.add("hidden");
}
function getTaskData() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const priority = document.getElementById("prioritySelect").value;
  const date = document.getElementById("dueDateSelect").value;
  const project = document.getElementById("projectsSelect").value;
  if (title) {
    (0,_taskManager__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, description, date, priority, project);
    hideModal();
  }
}
function addTaskModal() {
  smokeScreen.addEventListener("click", function () {
    modal.classList.toggle("hidden");
  });
  openTaskButton.addEventListener("click", function () {
    document.getElementById('dueDateSelect').value = new Date().toDateInputValue();
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = '';
    modal.classList.remove("hidden");
  });
  addTaskButton.addEventListener("click", function () {
    getTaskData();
  });
}

/***/ }),

/***/ "./src/js/checkDate.js":
/*!*****************************!*\
  !*** ./src/js/checkDate.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkFilterDate: () => (/* binding */ checkFilterDate)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/startOfDay.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isTomorrow.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isThisWeek.js");

function checkFilterDate(date, filterDate) {
  const targetDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(date);
  var currentFilter;
  if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(targetDate)) currentFilter = "Today";else if ((0,date_fns__WEBPACK_IMPORTED_MODULE_2__.isTomorrow)(targetDate)) currentFilter = "Tomorrow";else if ((0,date_fns__WEBPACK_IMPORTED_MODULE_3__.isThisWeek)(targetDate)) currentFilter = "Week";else currentFilter = "Planned";
  if (filterDate == currentFilter) return true;else return false;
}

/***/ }),

/***/ "./src/js/currentPage.js":
/*!*******************************!*\
  !*** ./src/js/currentPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stats: () => (/* binding */ stats)
/* harmony export */ });
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskManager */ "./src/js/taskManager.js");
/* harmony import */ var _checkDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkDate */ "./src/js/checkDate.js");


const titlePage = document.getElementById("titlePage");
const PendingCount = document.getElementById("PendingCount");
const CompletedCount = document.getElementById("CompletedCount");
const TodayCountElement = document.getElementById("TodayCount");
const TomorrowCountElement = document.getElementById("TomorrowCount");
const WeekCountElement = document.getElementById("WeekCount");
const PlannedCountElement = document.getElementById("PlannedCount");
const CompletedCountElement = document.getElementById("CompletedCount");
function stats() {
  const counts = {
    completed: 0,
    today: 0,
    tomorrow: 0,
    week: 0,
    planned: 0
  };
  console.log(titlePage);
  if (_taskManager__WEBPACK_IMPORTED_MODULE_0__.currentFilter == "Week") titlePage.innerHTML = "This Week";else titlePage.innerHTML = _taskManager__WEBPACK_IMPORTED_MODULE_0__.currentFilter;
  _taskManager__WEBPACK_IMPORTED_MODULE_0__.tasks.forEach(task => {
    if (task.completed) counts.completed++;
    if (!task.completed) counts.planned++;
    if ((0,_checkDate__WEBPACK_IMPORTED_MODULE_1__.checkFilterDate)(task.date, "Today")) counts.today++;
    if ((0,_checkDate__WEBPACK_IMPORTED_MODULE_1__.checkFilterDate)(task.date, "Tomorrow")) counts.tomorrow++;
    if ((0,_checkDate__WEBPACK_IMPORTED_MODULE_1__.checkFilterDate)(task.date, "Week")) counts.week++;
  });
  TodayCountElement.innerHTML = counts.today;
  TomorrowCountElement.innerHTML = counts.tomorrow;
  WeekCountElement.innerHTML = counts.week;
  PlannedCountElement.innerHTML = counts.planned;
  CompletedCountElement.innerHTML = counts.completed;
  PendingCount.innerHTML = counts.planned;
  CompletedCount.innerHTML = counts.completed;
}

/***/ }),

/***/ "./src/js/filter.js":
/*!**************************!*\
  !*** ./src/js/filter.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTasks: () => (/* binding */ formatTasks)
/* harmony export */ });
/* harmony import */ var _checkDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkDate */ "./src/js/checkDate.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/compareAsc.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/parseISO.js");


function sortTasksByDate(tasks) {
  tasks.sort((a, b) => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.compareAsc)((0,date_fns__WEBPACK_IMPORTED_MODULE_2__.parseISO)(a.date), (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.parseISO)(b.date)));
}
function filter(task, filterTask) {
  if (filterTask) {
    switch (filterTask) {
      case "Completed":
        if (task.Completed == true) return true;
        break;
      case "Today":
      case "Tomorrow":
      case "Week":
        if ((0,_checkDate__WEBPACK_IMPORTED_MODULE_0__.checkFilterDate)(task.date, filterTask)) {
          if (task.Completed == false) return true;
        }
        break;
      case "Planned":
        if (task.Completed == false) return true;
        break;
      default:
        return false;
    }
    return false;
  } else if (task.Completed == false) return true;
}
function formatTasks(tasks, filterTask) {
  console.log(filterTask);
  var formatedTasks = [];

  // var filterTask = "Today"

  sortTasksByDate(tasks);
  tasks.forEach(task => {
    if (filter(task, filterTask)) {
      formatedTasks.push(task);
    }
  });
  return formatedTasks;
}

/***/ }),

/***/ "./src/js/images.js":
/*!**************************!*\
  !*** ./src/js/images.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setImages: () => (/* binding */ setImages)
/* harmony export */ });
/* harmony import */ var _pictures_icon_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pictures/icon.svg */ "./src/pictures/icon.svg");
/* harmony import */ var _pictures_sidebar_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pictures/sidebar.svg */ "./src/pictures/sidebar.svg");
/* harmony import */ var _pictures_Today_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pictures/Today.svg */ "./src/pictures/Today.svg");
/* harmony import */ var _pictures_Week_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pictures/Week.svg */ "./src/pictures/Week.svg");
/* harmony import */ var _pictures_tommorow_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pictures/tommorow.svg */ "./src/pictures/tommorow.svg");
/* harmony import */ var _pictures_Planned_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pictures/Planned.svg */ "./src/pictures/Planned.svg");
/* harmony import */ var _pictures_Completed_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pictures/Completed.svg */ "./src/pictures/Completed.svg");
/* harmony import */ var _pictures_project_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pictures/project.svg */ "./src/pictures/project.svg");
/* harmony import */ var _pictures_add_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pictures/add.svg */ "./src/pictures/add.svg");
/* harmony import */ var _pictures_priority_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pictures/priority.svg */ "./src/pictures/priority.svg");










function createImageDiv(element, id) {
  const tempImg = new Image();
  tempImg.src = element;
  tempImg.classList.add("iconSvg");
  var parentElement = document.getElementById(id);
  parentElement.append(tempImg);
}
function createMultipleImageDiv(element, id) {
  document.querySelectorAll(id).forEach(el => {
    const tempImg = new Image();
    tempImg.src = element;
    tempImg.classList.add("iconSvg");
    el.append(tempImg);
  });
}
function setImages() {
  createImageDiv(_pictures_icon_svg__WEBPACK_IMPORTED_MODULE_0__, "icon");
  createImageDiv(_pictures_sidebar_svg__WEBPACK_IMPORTED_MODULE_1__, "sidebarIcon");
  createImageDiv(_pictures_sidebar_svg__WEBPACK_IMPORTED_MODULE_1__, "sidebarIcon2");
  createImageDiv(_pictures_Today_svg__WEBPACK_IMPORTED_MODULE_2__, "TodayImg");
  createImageDiv(_pictures_tommorow_svg__WEBPACK_IMPORTED_MODULE_4__, "tommorowImg");
  createImageDiv(_pictures_Week_svg__WEBPACK_IMPORTED_MODULE_3__, "WeekImg");
  createImageDiv(_pictures_Planned_svg__WEBPACK_IMPORTED_MODULE_5__, "PlannedImg");
  createImageDiv(_pictures_Completed_svg__WEBPACK_IMPORTED_MODULE_6__, "CompletedImg");
  createImageDiv(_pictures_add_svg__WEBPACK_IMPORTED_MODULE_8__, "addImg");
  createImageDiv(_pictures_priority_svg__WEBPACK_IMPORTED_MODULE_9__, "flagImg");
  createImageDiv(_pictures_Planned_svg__WEBPACK_IMPORTED_MODULE_5__, "calendarImg");
  createImageDiv(_pictures_project_svg__WEBPACK_IMPORTED_MODULE_7__, "projectModalImg");
  window.onload = createMultipleImageDiv(_pictures_project_svg__WEBPACK_IMPORTED_MODULE_7__, ".projectImg");
}

/***/ }),

/***/ "./src/js/relativeDate.js":
/*!********************************!*\
  !*** ./src/js/relativeDate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRelativeDate: () => (/* binding */ getRelativeDate)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/startOfDay.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isTomorrow.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/differenceInDays.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/differenceInWeeks.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/differenceInMonths.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/differenceInYears.js");

function getRelativeDate(date) {
  const Today = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(new Date()); // Normalize Today's date to midnight
  const targetDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(date); // Normalize the target date to midnight

  if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isToday)(targetDate)) return "Today";
  if ((0,date_fns__WEBPACK_IMPORTED_MODULE_2__.isTomorrow)(targetDate)) return "Tomorrow";
  const daysDiff = (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.differenceInDays)(targetDate, Today);
  const WeeksDiff = (0,date_fns__WEBPACK_IMPORTED_MODULE_4__.differenceInWeeks)(targetDate, Today);
  const monthsDiff = (0,date_fns__WEBPACK_IMPORTED_MODULE_5__.differenceInMonths)(targetDate, Today);
  const yearsDiff = (0,date_fns__WEBPACK_IMPORTED_MODULE_6__.differenceInYears)(targetDate, Today);
  if (daysDiff < 7) return `In ${daysDiff} days`; // "In 3 days"
  if (WeeksDiff === 1) return "Next Week"; // "Next Week"
  if (WeeksDiff > 1 && monthsDiff < 1) return `In ${WeeksDiff} Weeks`; // "In 2 Weeks"
  if (monthsDiff === 1) return "Next month"; // "Next month"
  if (monthsDiff > 1 && monthsDiff < 5) return `In ${monthsDiff} months`; // "In 4 months"
  if (yearsDiff === 1) return "In a year"; // "In a year"
  return `In ${yearsDiff} years`; // "In 4 years"
}

/***/ }),

/***/ "./src/js/sidebar.js":
/*!***************************!*\
  !*** ./src/js/sidebar.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sidebarLogic: () => (/* binding */ sidebarLogic)
/* harmony export */ });
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const sidebarToggleButton2 = document.getElementById('sidebarIcon2');
const sidebarToggleButton = document.getElementById('sidebarIcon');
const smokeScreen = document.getElementById('smokeScreen');
var windowSize = window.matchMedia("(max-width: 780px)");
function responsiveSidebar(windowSize) {
  if (windowSize.matches) {
    main.classList.add("fullscreen");
    sidebar.classList.add("hidden");
    if (sidebarToggleButton.classList.contains("hiddenBtn")) {
      sidebarToggleButton.classList.remove("hiddenBtn");
      sidebarToggleButton2.classList.add("hiddenBtn");
    }
  } else {
    main.classList.remove("fullscreen");
    sidebar.classList.remove("hidden");
    smokeScreen.classList.add("hidden");
    if (sidebarToggleButton2.classList.contains("hiddenBtn")) {
      sidebarToggleButton2.classList.remove("hiddenBtn");
      sidebarToggleButton.classList.add("hiddenBtn");
    }
  }
}
function toggleSidebar() {
  sidebar.classList.toggle("hidden");
  main.classList.toggle("fullscreen");
  sidebarToggleButton2.classList.toggle("hiddenBtn");
  sidebarToggleButton.classList.toggle("hiddenBtn");
  if (windowSize.matches) {
    if (sidebarToggleButton2.classList.contains("hiddenBtn")) smokeScreen.classList.add("hidden");else smokeScreen.classList.remove("hidden");
  }
}
function sidebarLogic() {
  sidebarToggleButton2.addEventListener("click", function () {
    toggleSidebar();
  });
  sidebarToggleButton.addEventListener("click", function () {
    toggleSidebar();
  });
  smokeScreen.addEventListener("click", function () {
    toggleSidebar();
  });
  windowSize.addEventListener("change", function () {
    responsiveSidebar(windowSize);
  });
}

/***/ }),

/***/ "./src/js/taskManager.js":
/*!*******************************!*\
  !*** ./src/js/taskManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   currentFilter: () => (/* binding */ currentFilter),
/* harmony export */   getAllTasks: () => (/* binding */ getAllTasks),
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   tasks: () => (/* binding */ tasks)
/* harmony export */ });
/* harmony import */ var _relativeDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./relativeDate */ "./src/js/relativeDate.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./src/js/filter.js");
/* harmony import */ var _currentPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentPage */ "./src/js/currentPage.js");



const taskContainer = document.getElementById("taskContainer");
const TodayBtn = document.getElementById("Today");
const tommorrowBtn = document.getElementById("Tomorrow");
const WeekBtn = document.getElementById("Week");
const PlannedBtn = document.getElementById("Planned");
const CompletedBtn = document.getElementById("Completed");
var currentFilter = "Today";
var tasks = [];
function Task(title, details, date, priority, project, Completed) {
  this.title = title;
  this.details = details;
  this.date = date;
  this.priority = priority;
  if (project) this.project = project;else this.project = "Default";
  if (Completed) this.Completed = Completed;else this.Completed = false;
}
function renderTask(task) {
  const taskCard = document.createElement("div");
  const container = document.createElement("div");
  const inputCheckmark = document.createElement("input");
  const label = document.createElement("label");
  const spanCheckmark = document.createElement("span");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  const taskTitle = document.createElement("span");
  const dueDate = document.createElement("div");
  taskCard.classList.add("taskCard");
  container.classList.add("container");
  inputCheckmark.type = "checkbox";
  inputCheckmark.classList.add("checkbox");
  inputCheckmark.id = `cbx-${task.title + task.date + Math.random() * 10000}`; // Assuming task.id is unique

  label.classList.add("cbx");
  label.setAttribute("for", inputCheckmark.id);
  taskTitle.classList.add("taskTitle");
  dueDate.classList.add("dueDate");

  // Set the task title and due date
  taskTitle.textContent = task.title;
  dueDate.textContent = (0,_relativeDate__WEBPACK_IMPORTED_MODULE_0__.getRelativeDate)(task.date);

  // Create the SVG checkmark
  svg.setAttribute("width", "12px");
  svg.setAttribute("height", "9px");
  svg.setAttribute("viewBox", "0 0 12 9");
  polyline.setAttribute("points", "1 5 4 8 11 1");
  svg.appendChild(polyline);

  // Append the SVG to the spanCheckmark
  spanCheckmark.appendChild(svg);

  // Append all the elements together
  label.appendChild(spanCheckmark);
  label.appendChild(taskTitle);
  container.appendChild(inputCheckmark);
  container.appendChild(label);
  taskCard.appendChild(container);
  taskCard.appendChild(dueDate);
  taskContainer.appendChild(taskCard); // Assuming taskContainer exists

  // Check if the task is Completed, and set the checkbox state
  inputCheckmark.checked = task.Completed;

  // Add event listener to update task completion on checkbox click
  inputCheckmark.addEventListener("change", function () {
    task.Completed = this.checked; // Toggle completion

    // Add animation
    taskCard.classList.add('animate__animated', "animate__fadeOutRight");
    taskCard.addEventListener('animationend', () => {
      renderAllTasks(currentFilter); // Update task list
    });
  });
}
function addTask(title, description, date, priority, project) {
  tasks.push(new Task(title, description, date, priority, project));
  renderAllTasks(currentFilter);
}
function getAllTasks() {
  return tasks;
}
function clearTasks() {
  taskContainer.innerHTML = '';
}
function renderAllTasks(filterTask) {
  clearTasks();
  (0,_currentPage__WEBPACK_IMPORTED_MODULE_2__.stats)();
  var formatedTasks = (0,_filter__WEBPACK_IMPORTED_MODULE_1__.formatTasks)(tasks, filterTask);
  formatedTasks.forEach(task => renderTask(task));
}
function buttonSelectedClass(button) {
  // Get all elements with the 'selected' class
  var oldButtons = document.getElementsByClassName("selected");

  // Ensure there are elements before looping
  if (oldButtons.length > 0) {
    Array.from(oldButtons).forEach(el => el.classList.remove("selected"));
  }

  // Add 'selected' class to the clicked button
  button.classList.add("selected");
}
function render() {
  tasks.push(new Task("do", "date", "2025-03-17", "high", "Default"));
  tasks.push(new Task("do", "date", "2025-03-18", "high", "Default"));
  tasks.push(new Task("do", "date", "2025-03-20", "high", "Default"));
  tasks.push(new Task("do", "date", "2025-03-20", "high", "Default"));
  renderAllTasks();
  TodayBtn.addEventListener("click", function () {
    currentFilter = "Today";
    renderAllTasks("Today");
    buttonSelectedClass(TodayBtn);
  });
  tommorrowBtn.addEventListener("click", function () {
    currentFilter = "Tomorrow";
    renderAllTasks("Tomorrow");
    buttonSelectedClass(tommorrowBtn);
  });
  WeekBtn.addEventListener("click", function () {
    currentFilter = "Week";
    renderAllTasks("Week");
    buttonSelectedClass(WeekBtn);
  });
  PlannedBtn.addEventListener("click", function () {
    currentFilter = "Planned";
    renderAllTasks("Planned");
    buttonSelectedClass(PlannedBtn);
  });
  CompletedBtn.addEventListener("click", function () {
    currentFilter = "Completed";
    renderAllTasks("Completed");
    buttonSelectedClass(CompletedBtn);
  });
}

/***/ }),

/***/ "./node_modules/animate.css/animate.css":
/*!**********************************************!*\
  !*** ./node_modules/animate.css/animate.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/pictures/Completed.svg":
/*!************************************!*\
  !*** ./src/pictures/Completed.svg ***!
  \************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNSAwQzExLjYwNDkgMCAxNSAzLjM0NDcgMTUgNy41QzE1IDExLjYwNDkgMTEuNjA0NiAxNSA3LjUgMTVDMy4zNDQ1NCAxNSAwIDExLjYwNDYgMCA3LjVDMCAzLjM0NDU0IDMuMzQ0NyAwIDcuNSAwWk01Ljk3OTc0IDguOTY5NzlDNy4wNDM5OSA2Ljk0MjYzIDguNTY0MjYgNS4yNzAyIDEwLjU5MTQgNC4xMDQ4OUMxMS42NTU3IDMuNDQ2MDkgMTIuMzE0NSA0Ljk2NjM2IDExLjU1NDMgNS4zMjExOEM5LjIyMzE4IDYuNDM2MDggNy41NTA4OCA5LjA3MTM1IDYuNDM1ODEgMTEuMzAxMUM2LjEzMTc0IDExLjgwNzkgNS4zMjA5MSAxMS43NTczIDUuMDE2ODQgMTEuMTk5N0M0LjU2MDczIDEwLjI4NzUgNC42MTEzNyA4LjY2NTg3IDMuMzk1MTggOC4wMDcwOEMyLjU4NDM1IDcuNTUwOTcgMy41OTc4NiA2LjE4Mjc0IDQuNTYwNzMgNi45NDI4MkM1LjE2ODg3IDcuNDQ5NTggNS42NzU2MyA4LjE1OTEyIDUuOTc5NyA4Ljk2OTk4TDUuOTc5NzQgOC45Njk3OVpNNy41IDEuNDE4ODdDNC4xMDQ1NSAxLjQxODg3IDEuNDE4ODcgNC4xMDQ4MiAxLjQxODg3IDcuNUMxLjQxODg3IDEwLjg0NDcgNC4xMDQ4MiAxMy41ODExIDcuNSAxMy41ODExQzEwLjg0NDcgMTMuNTgxMSAxMy41ODExIDEwLjg0NDYgMTMuNTgxMSA3LjVDMTMuNTgxMSA0LjEwNDU1IDEwLjg0NDYgMS40MTg4NyA3LjUgMS40MTg4N1oiIGZpbGw9IiNCNEI0QjQiLz4KPC9zdmc+Cg==";

/***/ }),

/***/ "./src/pictures/Planned.svg":
/*!**********************************!*\
  !*** ./src/pictures/Planned.svg ***!
  \**********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjQ1MzcgMS4yNTc1MUgxMS4wNjA3VjAuMjk4NDlDMTEuMDYwNyAwLjEzNDE2NSAxMC45MjQ2IDAgMTAuNzU3OSAwQzEwLjU5MTMgMCAxMC40NTUyIDAuMTM0MTYyIDEwLjQ1NTIgMC4yOTg0OVYxLjI1NzUxSDQuNTQ0ODFWMC4yOTg0OUM0LjU0NDgxIDAuMTM0MTY1IDQuNDA4NzIgMCA0LjI0MjAzIDBDNC4wNzUzMyAwIDMuOTM5MjQgMC4xMzQxNjIgMy45MzkyNCAwLjI5ODQ5VjEuMjU3NTFIMi41NDYyNEMxLjE0MzExIDEuMjU3NTEgMCAyLjM4MjU3IDAgMy43Njc2M1YxMi40ODk5QzAgMTMuODczMSAxLjE0MTI1IDE1IDIuNTQ2MjQgMTVIMTIuNDUzOEMxMy44NTY5IDE1IDE1IDEzLjg3NDkgMTUgMTIuNDg5OVYzLjc2NzYzQzE1IDIuMzg0NCAxMy44NTg3IDEuMjU3NTEgMTIuNDUzNyAxLjI1NzUxWk0xMC40NTM2IDIuNjcxMDVWMy40ODA5OEMxMC40NTM2IDMuNjQ1MyAxMC41ODk3IDMuNzc5NDcgMTAuNzU2NCAzLjc3OTQ3QzEwLjkyMzEgMy43Nzk0NyAxMS4wNTkyIDMuNjQ1MzEgMTEuMDU5MiAzLjQ4MDk4VjIuNjcxMDVDMTEuMzkyNSAyLjc5MzUyIDExLjYzMjMgMy4xMTAzMyAxMS42MzIzIDMuNDgwOThDMTEuNjMyMyAzLjk1NzE5IDExLjIzOTQgNC4zNDQ0NSAxMC43NTY0IDQuMzQ0NDVDMTAuMjczMyA0LjM0NDQ1IDkuODgwNTEgMy45NTcxNiA5Ljg4MDUxIDMuNDgwOThDOS44ODA1MSAzLjExMDQ2IDEwLjExODcgMi43OTM1MyAxMC40NTM2IDIuNjcxMDVIMTAuNDUzNlpNMy45MzkyOCAyLjY3MTA1VjMuNDgwOThDMy45MzkyOCAzLjY0NTMgNC4wNzUzNyAzLjc3OTQ3IDQuMjQyMDcgMy43Nzk0N0M0LjQwODc2IDMuNzc5NDcgNC41NDQ4NSAzLjY0NTMxIDQuNTQ0ODUgMy40ODA5OFYyLjY3MTA1QzQuODc4MjMgMi43OTM1MiA1LjExOCAzLjExMDMzIDUuMTE4IDMuNDgwOThDNS4xMTggMy45NTcxOSA0LjcyNTEzIDQuMzQ0NDUgNC4yNDIwOSA0LjM0NDQ1QzMuNzU5MDIgNC4zNDQ0NSAzLjM2NjE5IDMuOTU3MTYgMy4zNjYxOSAzLjQ4MDk4QzMuMzY2MTkgMy4xMTA0NiAzLjYwNDM2IDIuNzkzNTMgMy45MzkzNCAyLjY3MTA1SDMuOTM5MjhaTTE0LjM5MjcgMTIuNDg4M0MxNC4zOTI3IDEzLjU0MyAxMy41MjE4IDE0LjM5OTcgMTIuNDUzNyAxNC4zOTk3SDIuNTQ0NTJDMS40NzQ2NCAxNC4zOTk3IDAuNjA1NTU4IDEzLjU0MTIgMC42MDU1NTggMTIuNDg4M1Y1LjY4ODk3SDE0LjM5MjhWMTIuNDg5NkwxNC4zOTI3IDEyLjQ4ODNaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGQ9Ik02LjUwMjU5IDEyLjEwNTdDNi41NjA0OCAxMi4xNzYyIDYuNjQ3MTMgMTIuMjE2NCA2LjczNzMzIDEyLjIxNjRINi43NDQxOUM2LjgzNzY4IDEyLjIxNDcgNi45MjYxNyAxMi4xNjk0IDYuOTgwNjQgMTIuMDkzOUwxMC40NjU3IDcuNDE0MjdDMTAuNTY0MyA3LjI4MTc5IDEwLjUzNTQgNy4wOTQwNyAxMC40MDExIDYuOTk2ODNDMTAuMjY2NyA2Ljg5OTU4IDEwLjA3NjIgNi45MjgwNSA5Ljk3NzYgNy4wNjA1M0w2LjcyNTU4IDExLjQyODNMNS4wNTM2OSA5LjQwNDU0QzQuOTQ4MTkgOS4yNzcxMyA0Ljc1Nzc2IDkuMjU2OTggNC42MjY3OSA5LjM2MDk5QzQuNDk3NTYgOS40NjQ5OSA0LjQ3NzExIDkuNjUyNzEgNC41ODI2MSA5Ljc4MTgyTDYuNTAxMTIgMTIuMTA1OEw2LjUwMjU5IDEyLjEwNTdaIiBmaWxsPSIjQjRCNEI0Ii8+Cjwvc3ZnPgo=";

/***/ }),

/***/ "./src/pictures/Today.svg":
/*!********************************!*\
  !*** ./src/pictures/Today.svg ***!
  \********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzUwXzI1IiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1Ij4KPHBhdGggZD0iTTAgMEgxNVYxNUgwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfNTBfMjUpIj4KPHBhdGggZD0iTTYuMDkxMDQgMS41MDE2N0w2LjczNjI3IDAuNDI2MzQ5QzYuOTg1NzIgMC4wMTA0ODI0IDcuNTI1MTMgLTAuMTI0MzMyIDcuOTQxIDAuMTI1MDkyQzguMDY0NTUgMC4xOTkxOTggOC4xNjgwMiAwLjMwMjY2NSA4LjI0MjI2IDAuNDI2MzQ5TDguODg3NDkgMS41MDE2N0M5LjU0MjcxIDEuNjU0MjMgMTAuMTY1NCAxLjkxMzIxIDEwLjczMzIgMi4yNjY2OUwxMS45NTA3IDEuOTYyNEMxMi40MjExIDEuODQ0NzIgMTIuODk3OCAyLjEzMDgxIDEzLjAxNTUgMi42MDEyOUMxMy4wNTA0IDIuNzQxMTYgMTMuMDUwNCAyLjg4NzM4IDEzLjAxNTUgMy4wMjcyNkwxMi43MTExIDQuMjQ0NTVDMTMuMDY0NiA0LjgxMjUyIDEzLjMyMzcgNS40MzUwOSAxMy40NzYxIDYuMDkwNDNMMTQuNTUxNiA2LjczNTY2QzE0Ljk2NzQgNi45ODUxMSAxNS4xMDIzIDcuNTI0NTIgMTQuODUyNyA3Ljk0MDM5QzE0Ljc3ODYgOC4wNjM5NCAxNC42NzUxIDguMTY3NDEgMTQuNTUxNiA4LjI0MTY1TDEzLjQ3NjEgOC44ODY4OEMxMy4zMjM3IDkuNTQyMSAxMy4wNjQ2IDEwLjE2NDggMTIuNzExMSAxMC43MzI2TDEzLjAxNTUgMTEuOTUwMUMxMy4xMzMxIDEyLjQyMDUgMTIuODQ3IDEyLjg5NzIgMTIuMzc2NSAxMy4wMTQ5QzEyLjIzNjggMTMuMDQ5OCAxMi4wOTA0IDEzLjA0OTggMTEuOTUwNyAxMy4wMTQ5TDEwLjczMzIgMTIuNzEwNUMxMC4xNjU0IDEzLjA2NCA5LjU0MjcxIDEzLjMyMzEgOC44ODc0OSAxMy40NzU1TDguMjQyMjYgMTQuNTUxQzcuOTkyNjkgMTQuOTY2OCA3LjQ1MzI4IDE1LjEwMTYgNy4wMzc0MSAxNC44NTIxQzYuOTEzODYgMTQuNzc4IDYuODEwMzkgMTQuNjc0NSA2LjczNjI3IDE0LjU1MUw2LjA5MTA0IDEzLjQ3NTVDNS40MzU3IDEzLjMyMzEgNC44MTMxMyAxMy4wNjQgNC4yNDUxNiAxMi43MTA1TDMuMDI3ODcgMTMuMDE0OUMyLjU1NzQgMTMuMTMyNSAyLjA4MDU2IDEyLjg0NjQgMS45NjMwMSAxMi4zNzU5QzEuOTI4MDEgMTIuMjM2MSAxLjkyODAxIDEyLjA4OTggMS45NjMwMSAxMS45NTAxTDIuMjY3MyAxMC43MzI2QzEuOTEzNzkgMTAuMTY0OCAxLjY1NDg0IDkuNTQyMSAxLjUwMjI4IDguODg2ODhMMC40MjY5NTkgOC4yNDE2NUMwLjAxMTA5MjcgNy45OTIwOCAtMC4xMjM3MjEgNy40NTI2NyAwLjEyNTcwMiA3LjAzNjhDMC4xOTk4MDggNi45MTMyNSAwLjMwMzI3NiA2LjgwOTc4IDAuNDI2OTU5IDYuNzM1NjZMMS41MDIyOCA2LjA5MDQzQzEuNjU0ODQgNS40MzUwOSAxLjkxMzgyIDQuODEyNTIgMi4yNjczIDQuMjQ0NTVMMS45NjMwMSAzLjAyNzI2QzEuODQ1MzMgMi41NTY3OSAyLjEzMTQyIDIuMDc5OTUgMi42MDE5IDEuOTYyNEMyLjc0MTc3IDEuOTI3NCAyLjg4Nzk5IDEuOTI3NCAzLjAyNzg3IDEuOTYyNEw0LjI0NTE2IDIuMjY2NjlDNC44MTMxMyAxLjkxMzE4IDUuNDM1NyAxLjY1NDIzIDYuMDkxMDQgMS41MDE2N1pNNC41NjcwNyAzLjEwMzk2QzQuNDY0MDggMy4xNzI2NiA0LjMzNjg5IDMuMTk0NzQgNC4yMTY3NSAzLjE2NDc5TDIuODE0ODIgMi44MTQyM0wzLjE2NTM5IDQuMjE2MTVDMy4xOTUzNCA0LjMzNjMgMy4xNzMyNiA0LjQ2MzQ5IDMuMTA0NTUgNC41NjY0OEMyLjcyMzMyIDUuMTM3MjQgMi40NTY2MSA1Ljc3NzIyIDIuMzIxOTIgNi40NTQ3NEMyLjI5NzcyIDYuNTc2MTggMi4yMjMzOCA2LjY4MTc2IDIuMTE3MjEgNi43NDU1M0wwLjg3ODY2NCA3LjQ4ODZMMi4xMTcyMSA4LjIzMTc5QzIuMjIzMzggOC4yOTU0NSAyLjI5NzcyIDguNDAxMTUgMi4zMjE5MiA4LjUyMjU4QzIuNDU2NjMgOS4xOTk5OSAyLjcyMzM1IDkuODQwMDYgMy4xMDQ1NSAxMC40MTA5QzMuMTczMjYgMTAuNTEzNyAzLjE5NTM0IDEwLjY0MSAzLjE2NTM5IDEwLjc2MTJMMi44MTQ4MiAxMi4xNjNMNC4yMTY3NSAxMS44MTI1QzQuMzM2ODkgMTEuNzgyNSA0LjQ2NDA5IDExLjgwNDYgNC41NjcwNyAxMS44NzM0QzUuMTM3ODQgMTIuMjU0NiA1Ljc3NzgxIDEyLjUyMTIgNi40NTUzNCAxMi42NTU5QzYuNTc2NzggMTIuNjgwMSA2LjY4MjM2IDEyLjc1NDQgNi43NDYxMyAxMi44NjA3TDcuNDg5MiAxNC4wOTkxTDguMjMyMzkgMTIuODYwN0M4LjI5NjA1IDEyLjc1NDQgOC40MDE3NCAxMi42ODAxIDguNTIzMTggMTIuNjU1OUM5LjIwMDU5IDEyLjUyMTIgOS44NDA2NiAxMi4yNTQ2IDEwLjQxMTQgMTEuODczNEMxMC41MTQzIDExLjgwNDUgMTAuNjQxNiAxMS43ODI1IDEwLjc2MTggMTEuODEyNUwxMi4xNjM2IDEyLjE2M0wxMS44MTMxIDEwLjc2MTJDMTEuNzgzMSAxMC42NDEgMTEuODA1MSAxMC41MTM3IDExLjg3NCAxMC40MTA5QzEyLjI1NTIgOS44NDAwOSAxMi41MjE4IDkuMjAwMDIgMTIuNjU2NSA4LjUyMjU4QzEyLjY4MDcgOC40MDExNSAxMi43NTUgOC4yOTU0NSAxMi44NjEzIDguMjMxNzlMMTQuMDk5NyA3LjQ4ODZMMTIuODYxMyA2Ljc0NTUzQzEyLjc1NSA2LjY4MTc2IDEyLjY4MDcgNi41NzYxOCAxMi42NTY1IDYuNDU0NzRDMTIuNTIxOCA1Ljc3NzIyIDEyLjI1NTIgNS4xMzcyNyAxMS44NzQgNC41NjY0OEMxMS44MDUxIDQuNDYzNDggMTEuNzgzMSA0LjMzNjI5IDExLjgxMzEgNC4yMTYxNUwxMi4xNjM2IDIuODE0MjNMMTAuNzYxOCAzLjE2NDc5QzEwLjY0MTYgMy4xOTQ3NCAxMC41MTQzIDMuMTcyNjYgMTAuNDExNCAzLjEwMzk2QzkuODQwNjggMi43MjI3MiA5LjIwMDYyIDIuNDU2MDEgOC41MjMxOCAyLjMyMTMyQzguNDAxNzQgMi4yOTcxMyA4LjI5NjA1IDIuMjIyNzkgOC4yMzIzOSAyLjExNjYyTDcuNDg5MiAwLjg3ODA2Nkw2Ljc0NjEzIDIuMTE2NjJDNi42ODIzNiAyLjIyMjc4IDYuNTc2NzggMi4yOTcxMyA2LjQ1NTM0IDIuMzIxMzJDNS43Nzc4MSAyLjQ1NjAzIDUuMTM3ODcgMi43MjI3NSA0LjU2NzA3IDMuMTAzOTZaTTcuNDg5MTcgMTEuODc5MkM1LjA2NDQ1IDExLjg3OTIgMy4wOTg3IDkuOTEzNTMgMy4wOTg3IDcuNDg4NzFDMy4wOTg3IDUuMDYzOTkgNS4wNjQ0OCAzLjA5ODI0IDcuNDg5MTcgMy4wOTgyNEM5LjkxNDAyIDMuMDk4MjQgMTEuODc5NiA1LjA2NDAyIDExLjg3OTYgNy40ODg3MUMxMS44Nzk2IDkuOTEzNTYgOS45MTM5OSAxMS44NzkyIDcuNDg5MTcgMTEuODc5MlpNNy40ODkxNyAxMS4wMDEyQzkuNDI5MDkgMTEuMDAxMiAxMS4wMDE3IDkuNDI4NiAxMS4wMDE3IDcuNDg4NjJDMTEuMDAxNyA1LjU0ODggOS40MjkxNSAzLjk3NjM3IDcuNDg5MTcgMy45NzYzN0M1LjU0OTM1IDMuOTc2MzcgMy45NzY5MiA1LjU0ODk1IDMuOTc2OTIgNy40ODg2MkMzLjk3NjkyIDkuNDI4NTQgNS41NDk1IDExLjAwMTIgNy40ODkxNyAxMS4wMDEyWiIgZmlsbD0iI0I0QjRCNCIvPgo8L2c+Cjwvc3ZnPgo=";

/***/ }),

/***/ "./src/pictures/Week.svg":
/*!*******************************!*\
  !*** ./src/pictures/Week.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNDU4MDkgMi4xODMwMUMzLjQ1ODA5IDIuNTg0ODQgMy4xNjMwOSAyLjkxMDcxIDIuNzk5MzYgMi45MTA3MUMyLjQzNTYxIDIuOTEwNzEgMi4xNDA2MiAyLjU4NDgyIDIuMTQwNjIgMi4xODMwMUMyLjE0MDYyIDEuNzgxMTcgMi40MzU2MyAxLjQ1NTQ0IDIuNzk5MzYgMS40NTU0NEMzLjE2MzExIDEuNDU1NDQgMy40NTgwOSAxLjc4MTIgMy40NTgwOSAyLjE4MzAxWiIgZmlsbD0iI0I0QjRCNCIvPgo8cGF0aCBkPSJNMTAuMjU0MyAyLjE4MzAxQzEwLjI1NDMgMi41ODQ4NCA5Ljk1OTQxIDIuOTEwNzEgOS41OTU2OCAyLjkxMDcxQzkuMjMxOTYgMi45MTA3MSA4LjkzNjk1IDIuNTg0ODIgOC45MzY5NSAyLjE4MzAxQzguOTM2OTUgMS43ODExNyA5LjIzMTk2IDEuNDU1NDQgOS41OTU2OCAxLjQ1NTQ0QzkuOTU5NDEgMS40NTU0NCAxMC4yNTQzIDEuNzgxMiAxMC4yNTQzIDIuMTgzMDFaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGQ9Ik04LjA4MzgyIDExLjE0NjVIMS42MzE4NkMxLjIxMjYyIDExLjE0NjUgMC44NjgzMzggMTAuNzY2MSAwLjg2ODMzOCAxMC4zMDNWNC4zODI1SDExLjUyNzJWNy4zNTkyOUMxMS42NzcgNy4zNDI3NCAxMS44MTE3IDcuMzI2MTggMTEuOTYxMyA3LjMyNjE4QzEyLjExMSA3LjMyNjE4IDEyLjI0NTggNy4zNDI3NCAxMi4zOTU0IDcuMzU5MjlMMTIuMzk1NSAxLjgwMjY3QzEyLjM5NTUgMC44MTAzNTkgMTEuNjYxOSAwIDEwLjc2MzcgMEgxLjYzMTdDMC43MzM1NTggMCAwIDAuODEwMzU5IDAgMS44MDI2N1YxMC4zMDMxQzAgMTEuMjk1NCAwLjczMzU1NyAxMi4xMDU4IDEuNjMxODIgMTIuMTA1OEw4LjA4Mzc4IDEyLjEwNTZDOC4wNjg4IDExLjk1NjggOC4wNTM4MSAxMS43OTE0IDguMDUzODEgMTEuNjQyNUM4LjA1MzkzIDExLjQ3NzIgOC4wNjg5MiAxMS4zMTE4IDguMDgzNzggMTEuMTQ2NEw4LjA4MzgyIDExLjE0NjVaTTAuODY4MDg1IDEuODAyNjdDMC44NjgwODUgMS4zMzk1NCAxLjIxMjM3IDAuOTU5MjEzIDEuNjMxNiAwLjk1OTIxM0gxMC43NjM2QzExLjE4MjggMC45NTkyMTMgMTEuNTI3MSAxLjMzOTU0IDExLjUyNzEgMS44MDI2N1YzLjQwNjgySDAuODY4MjEyTDAuODY4MDg1IDEuODAyNjdaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGQ9Ik0zLjkyMjE5IDUuOTUzNzRIMi4zMjAzNkMyLjA4MDg0IDUuOTUzNzQgMS44ODYyOSA2LjE2ODY3IDEuODg2MjkgNi40MzMyNUMxLjg4NjI5IDYuNjk3ODUgMi4wODA4NiA2LjkxMjc3IDIuMzIwMzYgNi45MTI3N0gzLjkyMjE5QzQuMTYxNzEgNi45MTI3NyA0LjM1NjI3IDYuNjk3ODQgNC4zNTYyNyA2LjQzMzI1QzQuMzU2MjcgNi4xNjg2NiA0LjE2MTcgNS45NTM3NCAzLjkyMjE5IDUuOTUzNzRaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGQ9Ik0zLjkyMjE5IDguMTg2MjJIMi4zMjAzNkMyLjA4MDg0IDguMTg2MjIgMS44ODYyOSA4LjQwMTE1IDEuODg2MjkgOC42NjU3NEMxLjg4NjI5IDguOTMwMzIgMi4wODA4NiA5LjE0NTI2IDIuMzIwMzYgOS4xNDUyNkgzLjkyMjE5QzQuMTYxNzEgOS4xNDUyNiA0LjM1NjI3IDguOTMwMzIgNC4zNTYyNyA4LjY2NTc0QzQuMzU2MjcgOC40MDEyNyA0LjE2MTcgOC4xODYyMiAzLjkyMjE5IDguMTg2MjJaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGQ9Ik03LjAwNTg1IDUuOTUzNzRINS4zODkxNUM1LjE0OTYzIDUuOTUzNzQgNC45NTUwOCA2LjE2ODY3IDQuOTU1MDggNi40MzMyNUM0Ljk1NDk1IDYuNjk3ODUgNS4xNDk2NCA2LjkxMjkxIDUuMzg5MTUgNi45MTI5MUg2Ljk5MDk4QzcuMjMwNSA2LjkxMjkxIDcuNDI1MDUgNi42OTc5OCA3LjQyNTA1IDYuNDMzMzlDNy40MjUwNSA2LjE2ODY2IDcuMjQ1MzUgNS45NTM3NCA3LjAwNTgyIDUuOTUzNzRINy4wMDU4NVoiIGZpbGw9IiNCNEI0QjQiLz4KPHBhdGggZD0iTTcuMDA1ODUgOC4xODYyMkg1LjM4OTE1QzUuMTQ5NjMgOC4xODYyMiA0Ljk1NTA4IDguNDAxMTUgNC45NTUwOCA4LjY2NTc0QzQuOTU1MDggOC45MzAzMiA1LjE0OTY0IDkuMTQ1MjYgNS4zODkxNSA5LjE0NTI2SDYuOTkwOThDNy4yMzA1IDkuMTQ1MjYgNy40MjUwNSA4LjkzMDMyIDcuNDI1MDUgOC42NjU3NEM3LjQyNTA1IDguNDAxMjcgNy4yNDUzNSA4LjE4NjIyIDcuMDA1ODIgOC4xODYyMkg3LjAwNTg1WiIgZmlsbD0iI0I0QjRCNCIvPgo8cGF0aCBkPSJNMTAuMDc0OCA1Ljk1Mzc0SDguNDczMDFDOC4yMzM0OSA1Ljk1Mzc0IDguMDM4OTQgNi4xNjg2NyA4LjAzODk0IDYuNDMzMjVDOC4wMzg5NCA2LjY5Nzg1IDguMjMzNSA2LjkxMjkxIDguNDczMDEgNi45MTI5MUgxMC4wNzQ4QzEwLjMxNDQgNi45MTI5MSAxMC41MDg5IDYuNjk3OTggMTAuNTA4OSA2LjQzMzM5QzEwLjUwODkgNi4xNjg2NiAxMC4zMTQ0IDUuOTUzNzQgMTAuMDc0OCA1Ljk1Mzc0WiIgZmlsbD0iI0I0QjRCNCIvPgo8cGF0aCBkPSJNMTEuOTYxIDguMjg1NzFDMTAuMjg0NCA4LjI4NTcxIDguOTIyMDYgOS43OTA2NyA4LjkyMjA2IDExLjY0MjlDOC45MjIwNiAxMy40OTUxIDEwLjI4NDQgMTUgMTEuOTYxIDE1QzEzLjYzNzcgMTUgMTUgMTMuNDk1MSAxNSAxMS42NDI5QzE1IDkuNzkwNTMgMTMuNjM3OCA4LjI4NTcxIDExLjk2MSA4LjI4NTcxWk0xMS45NjEgMTQuMDQwOUMxMC43NjM1IDE0LjA0MDkgOS43OTAzNiAxMi45NjYgOS43OTAzNiAxMS42NDNDOS43OTAzNiAxMC4zMiAxMC43NjM0IDkuMjQ1MDIgMTEuOTYxIDkuMjQ1MDJDMTMuMTU4NiA5LjI0NTAyIDE0LjEzMTcgMTAuMzIgMTQuMTMxNyAxMS42NDNDMTQuMTMxNyAxMi45NjU5IDEzLjE1ODggMTQuMDQwOSAxMS45NjEgMTQuMDQwOVoiIGZpbGw9IiNCNEI0QjQiLz4KPHBhdGggZD0iTTEyLjUzMDEgMTEuNTc2NkwxMi4zOTU0IDExLjcyNTVWMTAuMzUyOEMxMi4zOTU0IDEwLjA4ODIgMTIuMjAwOCA5Ljg3MzI5IDExLjk2MTMgOS44NzMyOUMxMS43MjE2IDkuODczMjkgMTEuNTI3MSAxMC4wODgyIDExLjUyNzEgMTAuMzUyOFYxMS43MjU1TDExLjM5MjMgMTEuNTc2NkMxMS4yMjc2IDExLjM5NDYgMTAuOTQzMyAxMS4zOTQ2IDEwLjc3ODYgMTEuNTc2NkMxMC42MTM5IDExLjc1ODYgMTAuNjEzOSAxMi4wNzI3IDEwLjc3ODYgMTIuMjU0NkwxMS42NDY5IDEzLjIxMzhDMTEuNzIxNyAxMy4yOTY1IDExLjg0MTQgMTMuMzQ2MSAxMS45NjEyIDEzLjM0NjFDMTIuMDgxIDEzLjM0NjEgMTIuMTg1NyAxMy4yOTY1IDEyLjI3NTUgMTMuMjEzOEwxMy4xNDM4IDEyLjI1NDZDMTMuMzA4NSAxMi4wNzI3IDEzLjMwODUgMTEuNzU4NSAxMy4xNDM4IDExLjU3NjZDMTIuOTY0MiAxMS4zOTQ2IDEyLjY5NDggMTEuMzk0NiAxMi41MzAyIDExLjU3NjZIMTIuNTMwMVoiIGZpbGw9IiNCNEI0QjQiLz4KPC9zdmc+Cg==";

/***/ }),

/***/ "./src/pictures/add.svg":
/*!******************************!*\
  !*** ./src/pictures/add.svg ***!
  \******************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjQzNzM5IDYuNTYyNDZWMC45MzgyN0M4LjQzNzM5IDAuNDIwNzM1IDguMDE3NyAwIDcuNDk5OTggMEM2Ljk4MzE1IDAgNi41NjI0NiAwLjQxOTk5IDYuNTYyNDYgMC45MzgyN1Y2LjU2MjQ2SDAuOTM4MjdDMC40MjA3MzUgNi41NjI0NiAwIDYuOTgyMTUgMCA3LjQ5OTk4QzAgOC4wMTY2NiAwLjQxOTk5IDguNDM3NCAwLjkzODI3IDguNDM3NEg2LjU2MjQ2VjE0LjA2MTZDNi41NjI0NiAxNC41NzkxIDYuOTgyMTUgMTUgNy40OTk5OCAxNUM4LjAxNjY2IDE1IDguNDM3MzkgMTQuNTc5OSA4LjQzNzM5IDE0LjA2MTZWOC40Mzc0SDE0LjA2MTZDMTQuNTc5MSA4LjQzNzQgMTUgOC4wMTc3IDE1IDcuNDk5OThDMTUgNi45ODMxNSAxNC41Nzk5IDYuNTYyNDYgMTQuMDYxNiA2LjU2MjQ2SDguNDM3MzlaIiBmaWxsPSIjQjRCNEI0Ii8+Cjwvc3ZnPgo=";

/***/ }),

/***/ "./src/pictures/icon.svg":
/*!*******************************!*\
  !*** ./src/pictures/icon.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KDTxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIi8+Cg08ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KDTxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4gPHBhdGggZD0iTTIuNzU0NTggMTQuNzE2TDMuMjcyMjIgMTYuNjQ3OUMzLjg3NjQ3IDE4LjkwMjkgNC4xNzg1OSAyMC4wMzA1IDQuODYzNTEgMjAuNzYxOEM1LjQwNDMyIDIxLjMzOTIgNi4xMDQyMSAyMS43NDMzIDYuODc0NjYgMjEuOTIyOUM3Ljg1MDQ0IDIyLjE1MDQgOC45Nzc5OCAyMS44NDgzIDExLjIzMzEgMjEuMjQ0QzEzLjQ4ODEgMjAuNjM5OCAxNC42MTU3IDIwLjMzNzcgMTUuMzQ3IDE5LjY1MjhDMTUuNDA3NyAxOS41OTU5IDE1LjQ2NjQgMTkuNTM3MyAxNS41MjMzIDE5LjQ3N0MxNS4xODkxIDE5LjQ0OSAxNC44NTIgMTkuMzk1MiAxNC41MDk0IDE5LjMyNzFDMTMuODEzMyAxOS4xODg3IDEyLjk4NjIgMTguOTY3IDEyLjAwOCAxOC43MDQ5TDExLjkwMTIgMTguNjc2M0wxMS44NzY0IDE4LjY2OTdDMTAuODEyMSAxOC4zODQ1IDkuOTIyODEgMTguMTQ1NyA5LjIxMjc3IDE3Ljg4OTJDOC40NjYwNyAxNy42MTk1IDcuNzg3NiAxNy4yODcgNy4yMTE0OCAxNi43NDc0QzYuNDE3NTMgMTYuMDAzOCA1Ljg2MTkzIDE1LjA0MTQgNS42MTQ5MSAxMy45ODJDNS40MzU2NyAxMy4yMTMzIDUuNDg2OTEgMTIuNDU5NCA1LjYyNjY2IDExLjY3NzlDNS43NjA1OCAxMC45MjkgNi4wMDEwOSAxMC4wMzE1IDYuMjg5MjYgOC45NTYxM0w2LjI4OTI2IDguOTU2MTFMNi44MjM2NSA2Ljk2MTc0TDYuODQyNDUgNi44OTE2QzQuOTIxOSA3LjQwODk2IDMuOTExMDEgNy43MTUwNSAzLjIzNjg3IDguMzQ2NDZDMi42NTk0NSA4Ljg4NzI2IDIuMjU1MzcgOS41ODcxNSAyLjA3NTczIDEwLjM1NzZDMS44NDgyMSAxMS4zMzM0IDIuMTUwMzMgMTIuNDYwOSAyLjc1NDU4IDE0LjcxNloiIGZpbGw9IiNiNGI0YjQiLz4gPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC44MjkzIDEwLjcxNTRMMjAuMzExNiAxMi42NDczQzE5LjcwNzQgMTQuOTAyNCAxOS40MDUyIDE2LjAyOTkgMTguNzIwMyAxNi43NjEyQzE4LjE3OTUgMTcuMzM4NiAxNy40Nzk2IDE3Ljc0MjcgMTYuNzA5MiAxNy45MjIzQzE2LjYxMjkgMTcuOTQ0OCAxNi41MTUyIDE3Ljk2MjEgMTYuNDE1IDE3Ljk3NDRDMTUuNDk5OSAxOC4wODczIDE0LjM4MzQgMTcuNzg4MSAxMi4zNTA4IDE3LjI0MzVDMTAuMDk1NyAxNi42MzkyIDguOTY4MTUgMTYuMzM3MSA4LjIzNjg3IDE1LjY1MjJDNy42NTk0NSAxNS4xMTE0IDcuMjU1MzcgMTQuNDExNSA3LjA3NTczIDEzLjY0MUM2Ljg0ODIxIDEyLjY2NTIgNy4xNTAzMyAxMS41Mzc3IDcuNzU0NTggOS4yODI2M0w4LjI3MjIyIDcuMzUwNzdDOC4zNTkxIDcuMDI2NTQgOC40Mzk3OSA2LjcyNTQgOC41MTYyMSA2LjQ0NTYxQzguOTcxMjggNC43Nzk1NyA5LjI3NzA5IDMuODYyOTggOS44NjM1MSAzLjIzNjg3QzEwLjQwNDMgMi42NTk0NSAxMS4xMDQyIDIuMjU1MzcgMTEuODc0NyAyLjA3NTczQzEyLjg1MDQgMS44NDgyMSAxMy45NzggMi4xNTAzMyAxNi4yMzMxIDIuNzU0NThDMTguNDg4MSAzLjM1ODgzIDE5LjYxNTcgMy42NjA5NSAyMC4zNDcgNC4zNDU4N0MyMC45MjQ0IDQuODg2NjggMjEuMzI4NSA1LjU4NjU3IDIxLjUwODEgNi4zNTcwM0MyMS43MzU2IDcuMzMyOCAyMS40MzM1IDguNDYwMzQgMjAuODI5MyAxMC43MTU0Wk0xMS4wNTI0IDkuODA1ODlDMTEuMTU5NiA5LjQwNTc5IDExLjU3MDkgOS4xNjgzNSAxMS45NzEgOS4yNzU1NkwxNi44MDA2IDEwLjU2OTdDMTcuMjAwNyAxMC42NzY5IDE3LjQzODEgMTEuMDg4MSAxNy4zMzA5IDExLjQ4ODJDMTcuMjIzNyAxMS44ODgzIDE2LjgxMjUgMTIuMTI1NyAxNi40MTI0IDEyLjAxODVMMTEuNTgyNyAxMC43MjQ0QzExLjE4MjYgMTAuNjE3MiAxMC45NDUyIDEwLjIwNiAxMS4wNTI0IDkuODA1ODlaTTEwLjI3NTYgMTIuNzAzM0MxMC4zODI4IDEyLjMwMzIgMTAuNzk0IDEyLjA2NTggMTEuMTk0MSAxMi4xNzNMMTQuMDkxOSAxMi45NDk1QzE0LjQ5MiAxMy4wNTY3IDE0LjcyOTQgMTMuNDY3OSAxNC42MjIyIDEzLjg2OEMxNC41MTUgMTQuMjY4MSAxNC4xMDM4IDE0LjUwNTYgMTMuNzAzNyAxNC4zOTg0TDEwLjgwNTkgMTMuNjIxOUMxMC40MDU4IDEzLjUxNDcgMTAuMTY4MyAxMy4xMDM0IDEwLjI3NTYgMTIuNzAzM1oiIGZpbGw9IiNiNGI0YjQiLz4gPC9nPgoNPC9zdmc+";

/***/ }),

/***/ "./src/pictures/priority.svg":
/*!***********************************!*\
  !*** ./src/pictures/priority.svg ***!
  \***********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjA2MjYgMS4xNTM3SDEuODc0ODJWMC41NzY4NDlDMS44NzQ4MiAwLjI1ODM2MiAxLjQ1NDczIDAgMC45Mzc0MTEgMEMwLjQxOTg1MiAwIDAgMC4yNTg1MTIgMCAwLjU3Njg0OVYxNC40MjMyQzAgMTQuNzQxNiAwLjQyMDA5NiAxNSAwLjkzNzQxMSAxNUMxLjQ1NDk3IDE1IDEuODc0ODIgMTQuNzQxNSAxLjg3NDgyIDE0LjQyMzJWOC4wNzcxNEgxNC4wNjI2QzE0LjU4MDEgOC4wNzcxNCAxNSA3LjgxODYzIDE1IDcuNTAwMjlWMS43MzEwNkMxNSAxLjQxMjU3IDE0LjU4MDEgMS4xNTQwNyAxNC4wNjI2IDEuMTU0MDdWMS4xNTM3Wk0xMy4xMjQ5IDYuOTIyOTNIMS44NzQ0NlYyLjMwNzYySDEzLjEyNDlWNi45MjI5M1oiIGZpbGw9IiNCNEI0QjQiLz4KPC9zdmc+Cg==";

/***/ }),

/***/ "./src/pictures/project.svg":
/*!**********************************!*\
  !*** ./src/pictures/project.svg ***!
  \**********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4zMjE1IDEzLjYzNjRWMTIuOTU0NUMxMi4zMjE1IDEyLjU3ODMgMTIuNTYxNiAxMi4yNzI4IDEyLjg1NzIgMTIuMjcyOEMxMy4xNTI5IDEyLjI3MjggMTMuMzkyOSAxMi41NzgzIDEzLjM5MjkgMTIuOTU0NVYxNC4zMTgxQzEzLjM5MjkgMTQuNjk0OSAxMy4xNTMyIDE1IDEyLjg1NzIgMTVIMC41MzU2NTNDMC4yMzk3NzggMTUgMCAxNC42OTQ5IDAgMTQuMzE4MVYyLjcyNzJDMCAyLjM1MDQ3IDAuMjM5Nzg1IDIuMDQ1NDcgMC41MzU2NTMgMi4wNDU0N0gzLjc1MDAxQzMuODY2MDUgMi4wNDU0NyAzLjk3ODc2IDIuMDkzMTggNC4wNzE1NCAyLjE4MTgyTDYuMDcxNTQgNC4wOTA4NEgxMi44NTcyQzEzLjE1MzIgNC4wOTA4NCAxMy4zOTMgNC4zOTYwMiAxMy4zOTMgNC43NzI3NVYxMC4yMjcyQzEzLjM5MyAxMC42MDM0IDEzLjE1MjkgMTAuOTA4OSAxMi44NTcyIDEwLjkwODlDMTIuNTYxNiAxMC45MDg5IDEyLjMyMTUgMTAuNjAzNCAxMi4zMjE1IDEwLjIyNzJWNS40NTQzOUg1Ljg5MjgzQzUuNzc2OTMgNS40NTQzOSA1LjY2NDA4IDUuNDA2NjggNS41NzE0MyA1LjMxODA0TDMuNTcxMyAzLjQwOTAxSDEuMDcxMzdWMTMuNjM2MkwxMi4zMjE1IDEzLjYzNjRaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMy41NzExMSAzLjQwOTE2SDIuMTQyNjZDMS44NDY2NSAzLjQwOTE2IDEuNjA2ODcgMy4xMDM5OCAxLjYwNjg3IDIuNzI3MjZWMC42ODE5MDFDMS42MDY4NyAwLjMwNTE3MSAxLjg0NjY2IDAgMi4xNDI2NiAwSDUuMzU3MDJDNS40NzI5MiAwIDUuNTg1NzcgMC4wNDc4NzU0IDUuNjc4NDEgMC4xMzYzNDZMNy42Nzg1NSAyLjA0NTU1SDE0LjQ2NDJDMTQuNjExNyAyLjA0NTU1IDE0Ljc1MjYgMi4xMjI4NiAxNC44NTM5IDIuMjU5NTRDMTQuOTU1MiAyLjM5NjIyIDE1LjAwNzcgMi41ODAxMSAxNC45OTkxIDIuNzY3MjJMMTQuNjgzOCA5LjU4NTM2QzE0LjY2NjQgOS45NjEwOCAxNC40MTI4IDEwLjI0OCAxNC4xMTc1IDEwLjIyNjJDMTMuODIyMyAxMC4yMDQgMTMuNTk2OCA5Ljg4MDkgMTMuNjE0MiA5LjUwNTUxTDEzLjg5NiAzLjQwOTI4SDcuNDk5OTJDNy4zODM4OCAzLjQwOTI4IDcuMjcxMTYgMy4zNjE1NyA3LjE3ODM5IDMuMjcyOTNMNS4xNzgzOSAxLjM2MzczSDIuNjc4MzJWMi4wNDU2M0gzLjc0OTc3QzMuODY1OCAyLjA0NTYzIDMuOTc4NTIgMi4wOTMzNCA0LjA3MTI5IDIuMTgxOThMNi4wNzEyOSA0LjA5MTAxSDEyLjg1N0MxMy4xNTMgNC4wOTEwMSAxMy4zOTI3IDQuMzk2MTggMTMuMzkyNyA0Ljc3MjkxVjEwLjIyNzNDMTMuMzkyNyAxMC42MDM2IDEzLjE1MjcgMTAuOTA5MSAxMi44NTcgMTAuOTA5MUMxMi41NjEzIDEwLjkwOTEgMTIuMzIxMyAxMC42MDM1IDEyLjMyMTMgMTAuMjI3M1Y1LjQ1NDU1SDUuODkyNThDNS43NzY2OCA1LjQ1NDU1IDUuNjYzODMgNS40MDY4NCA1LjU3MTE5IDUuMzE4MkwzLjU3MTExIDMuNDA5MTZaIiBmaWxsPSIjQjRCNEI0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNDIzMyAxMy42MzYzTDEzLjQ4OCAxMi4yMzI4QzEzLjUwNTQgMTEuODU3MSAxMy43NTkyIDExLjU3MDIgMTQuMDU0MyAxMS41OTJDMTQuMzQ5NSAxMS42MTQxIDE0LjU3NSAxMS45MzczIDE0LjU1NzYgMTIuMzEyNkwxNC40NjM0IDE0LjM1OEMxNC40NDY1IDE0LjcxODcgMTQuMjEyIDE1IDEzLjkyODQgMTVIMTIuODU2OUMxMi41NjExIDE1IDEyLjMyMTMgMTQuNjk0OCAxMi4zMjEzIDE0LjMxODFWMTIuOTU0NEMxMi4zMjEzIDEyLjU3ODIgMTIuNTYxMyAxMi4yNzI3IDEyLjg1NjkgMTIuMjcyN0MxMy4xNTI3IDEyLjI3MjcgMTMuMzkyNyAxMi41NzgyIDEzLjM5MjcgMTIuOTU0NFYxMy42MzYzSDEzLjQyMzNaIiBmaWxsPSIjQjRCNEI0Ii8+Cjwvc3ZnPgo=";

/***/ }),

/***/ "./src/pictures/sidebar.svg":
/*!**********************************!*\
  !*** ./src/pictures/sidebar.svg ***!
  \**********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjYjRiNGI0IiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+Cg08ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCIvPgoNPGcgaWQ9IlNWR1JlcG9fdHJhY2VyQ2FycmllciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cg08ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDxyZWN0IGlkPSJJY29ucyIgeD0iMCIgeT0iLTY0IiB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI4MDAiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+IDxnIGlkPSJJY29uczEiIHNlcmlmOmlkPSJJY29ucyI+IDxnIGlkPSJTdHJpa2UiPiA8L2c+IDxnIGlkPSJIMSI+IDwvZz4gPGcgaWQ9IkgyIj4gPC9nPiA8ZyBpZD0iSDMiPiA8L2c+IDxnIGlkPSJsaXN0LXVsIj4gPC9nPiA8ZyBpZD0iaGFtYnVyZ2VyLTEiPiA8L2c+IDxnIGlkPSJoYW1idXJnZXItMiI+IDwvZz4gPGcgaWQ9Imxpc3Qtb2wiPiA8L2c+IDxnIGlkPSJsaXN0LXRhc2siPiA8L2c+IDxnIGlkPSJ0cmFzaCI+IDwvZz4gPGcgaWQ9InZlcnRpY2FsLW1lbnUiPiA8L2c+IDxnIGlkPSJob3Jpem9udGFsLW1lbnUiPiA8L2c+IDxnIGlkPSJzaWRlYmFyLTIiPiA8L2c+IDxnIGlkPSJQZW4iPiA8L2c+IDxnIGlkPSJQZW4xIiBzZXJpZjppZD0iUGVuIj4gPC9nPiA8ZyBpZD0iY2xvY2siPiA8L2c+IDxnIGlkPSJleHRlcm5hbC1saW5rIj4gPC9nPiA8ZyBpZD0iaHIiPiA8L2c+IDxnIGlkPSJpbmZvIj4gPC9nPiA8ZyBpZD0id2FybmluZyI+IDwvZz4gPGcgaWQ9InBsdXMtY2lyY2xlIj4gPC9nPiA8ZyBpZD0ibWludXMtY2lyY2xlIj4gPC9nPiA8ZyBpZD0idnVlIj4gPC9nPiA8ZyBpZD0iY29nIj4gPC9nPiA8ZyBpZD0ibG9nbyI+IDwvZz4gPGcgaWQ9InJhZGlvLWNoZWNrIj4gPC9nPiA8ZyBpZD0iZXllLXNsYXNoIj4gPC9nPiA8ZyBpZD0iZXllIj4gPC9nPiA8ZyBpZD0idG9nZ2xlLW9mZiI+IDwvZz4gPHBhdGggaWQ9InNpZGViYXIiIGQ9Ik01MC4wMSw1Ni4wNzRsLTM1Ljk4OSwwYy0zLjMwOSwwIC01Ljk5NSwtMi42ODYgLTUuOTk1LC01Ljk5NWwwLC0zNi4wMTFjMCwtMy4zMDggMi42ODYsLTUuOTk0IDUuOTk1LC01Ljk5NGwzNS45ODksMGMzLjMwOSwwIDUuOTk1LDIuNjg2IDUuOTk1LDUuOTk0bDAsMzYuMDExYzAsMy4zMDkgLTIuNjg2LDUuOTk1IC01Ljk5NSw1Ljk5NVptLTI1Ljk4NCwtNGwwLC00MGwtOS4wMTIsMGMtMS42NSwwLjAwMSAtMi45ODksMS4zNCAtMi45ODksMi45ODlsMCwzNC4wMjJjMCwxLjY0OSAxLjMzOSwyLjk4OSAyLjk4OSwyLjk4OWw5LjAxMiwwWm0yNC45OTEsLTQwbC0yMC45OTEsMGwwLDQwbDIwLjk5MSwwYzEuNjUsMCAyLjk4OSwtMS4zNCAyLjk4OSwtMi45ODlsMCwtMzQuMDIyYzAsLTEuNjQ5IC0xLjMzOSwtMi45ODggLTIuOTg5LC0yLjk4OVoiLz4gPGcgaWQ9InNocmVkZGVyIj4gPC9nPiA8ZyBpZD0ic3Bpbm5lci0tbG9hZGluZy0tZG90cy0iIHNlcmlmOmlkPSJzcGlubmVyIFtsb2FkaW5nLCBkb3RzXSI+IDwvZz4gPGcgaWQ9InJlYWN0Ij4gPC9nPiA8ZyBpZD0iY2hlY2stc2VsZWN0ZWQiPiA8L2c+IDxnIGlkPSJ0dXJuLW9mZiI+IDwvZz4gPGcgaWQ9ImNvZGUtYmxvY2siPiA8L2c+IDxnIGlkPSJ1c2VyIj4gPC9nPiA8ZyBpZD0iY29mZmVlLWJlYW4iPiA8L2c+IDxnIGlkPSJjb2ZmZWUtYmVhbnMiPiA8ZyBpZD0iY29mZmVlLWJlYW4xIiBzZXJpZjppZD0iY29mZmVlLWJlYW4iPiA8L2c+IDwvZz4gPGcgaWQ9ImNvZmZlZS1iZWFuLWZpbGxlZCI+IDwvZz4gPGcgaWQ9ImNvZmZlZS1iZWFucy1maWxsZWQiPiA8ZyBpZD0iY29mZmVlLWJlYW4yIiBzZXJpZjppZD0iY29mZmVlLWJlYW4iPiA8L2c+IDwvZz4gPGcgaWQ9ImNsaXBib2FyZCI+IDwvZz4gPGcgaWQ9ImNsaXBib2FyZC1wYXN0ZSI+IDwvZz4gPGcgaWQ9ImNsaXBib2FyZC1jb3B5Ij4gPC9nPiA8ZyBpZD0iTGF5ZXIxIj4gPC9nPiA8L2c+IDwvZz4KDTwvc3ZnPg==";

/***/ }),

/***/ "./src/pictures/tommorow.svg":
/*!***********************************!*\
  !*** ./src/pictures/tommorow.svg ***!
  \***********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjIwNDUgNS45NDU3OEMxMi40NjM0IDUuNTcxMSAxMi42MDkzIDUuMTI0MzIgMTIuNjA5MyA0LjY2MTY0QzEyLjYwOTMgMy40MDkzMSAxMS41OTA5IDIuMzkwOSAxMC4zMzg1IDIuMzkwOUM5LjY0OTk1IDIuMzkwOSA5LjAxNzU0IDIuNzE0NTQgOC41OTU3MyAzLjIyODg1QzcuOTk3MzEgMi43MDgxNSA3LjIxNzg3IDIuMzkwODEgNi4zNjQ1OSAyLjM5MDgxQzQuNjYyNzQgMi4zOTA4MSAzLjI0Nzk5IDMuNjQ1NDIgMi45OTc1IDUuMjc4NzJDMS42ODM4MyA1LjUyNjgzIDAuNjg3NjIyIDYuNjgzMTUgMC42ODc2MjIgOC4wNjc3NUMwLjY4NzYyMiA5LjYzMjg1IDEuOTYxMDEgMTAuOTA2MiAzLjUyNjExIDEwLjkwNjJIMTAuMzM4NUMxMS45MDM2IDEwLjkwNjIgMTMuMTc3IDkuNjMyODUgMTMuMTc3IDguMDY3NzVDMTMuMTc2OSA3LjIxOTY0IDEyLjc5NTUgNi40NjYyNyAxMi4yMDQ1IDUuOTQ1NzhIMTIuMjA0NVpNOS4zMzg4MSA0LjEzODc1QzkuNTMxMyAzLjc2OTIzIDkuOTE1NjEgMy41MjYyNyAxMC4zMzg2IDMuNTI2MjdDMTAuOTY0OCAzLjUyNjI3IDExLjQ3MzkgNC4wMzU1NCAxMS40NzM5IDQuNjYxNjRDMTEuNDczOSA0LjkyNjIyIDExLjM4MzEgNS4xNzUzNiAxMS4yMTc5IDUuMzc0NjFDMTEuMTc0MiA1LjM1OTg0IDExLjEyOTQgNS4zNTQxMiAxMS4wODU2IDUuMzQxNjVDMTEuMDAzNCA1LjMxODk5IDEwLjkyMjcgNS4yOTQ1IDEwLjgzODEgNS4yNzk3NEMxMC42NzI5IDUuMjQ5MTggMTAuNTA2NiA1LjIyOTI3IDEwLjMzODYgNS4yMjkyN0g5LjcyMzhDOS42OTA4NCA1LjAzNDAzIDkuNjQwMzcgNC44NDI2OSA5LjU3Mzg4IDQuNjU3MDdDOS41NDU1IDQuNTc3MDcgOS41MDQwNyA0LjUwNDQxIDkuNDY5OTcgNC40Mjc3M0M5LjQyNjgyIDQuMzMwNjggOS4zOTEgNC4yMzEzMyA5LjMzODgxIDQuMTM4NzVaTTEwLjMzODYgOS43NzA3OEgzLjUyNjE3QzIuNTg3MTcgOS43NzA3OCAxLjgyMzA1IDkuMDA2NjYgMS44MjMwNSA4LjA2NzY2QzEuODIzMDUgNy4xMjg2NyAyLjU4NzE3IDYuMzY0NTUgMy41MjYxNyA2LjM2NDU1QzMuODM5NSA2LjM2NDU1IDQuMDkzOTEgNi4xMTAyNiA0LjA5MzkxIDUuNzk2OEM0LjA5MzkxIDQuNTQ0NDggNS4xMTIzMyAzLjUyNjA2IDYuMzY0NjUgMy41MjYwNkM3LjE0MzU0IDMuNTI2MDYgNy44MzA5OSAzLjkyMDY2IDguMjQwOTEgNC41MjAxQzguMjUzOTYgNC41Mzk0NSA4LjI2MyA0LjU1OTgyIDguMjc1NTkgNC41Nzk3M0M4LjMzNDY0IDQuNjcyMzEgOC4zODg1NCA0Ljc2OTM2IDguNDMzOTcgNC44NzA0MUM4LjQ1MTYgNC45MDk1NSA4LjQ2NTc5IDQuOTUwNDEgOC40ODExMiA0Ljk5MDIzQzguNTE1MjMgNS4wNzkzOCA4LjU0NDE4IDUuMTcxMjggOC41NjY4NCA1LjI2NTU3QzguNTc2NDUgNS4zMDU4NiA4LjU4NzMzIDUuMzQ1NTcgOC41OTQwOCA1LjM4NTk3QzguNjE4MzQgNS41MjA0MyA4LjYzNTM5IDUuNjU2NzMgOC42MzUzOSA1Ljc5NjkxQzguNjM1MzkgNi4xMTAyNCA4Ljg4OTY4IDYuMzY0NjYgOS4yMDMxNCA2LjM2NDY2SDEwLjMzODVDMTAuNTg5NSA2LjM2NDY2IDEwLjg0MDMgNi40MjU0MiAxMS4wODQ0IDYuNTQ1N0MxMS4wODYyIDYuNTQ2MjggMTEuMDg3OSA2LjU0NTcgMTEuMDg5NiA2LjU0Njg1QzExLjY1MDkgNi44MjU1MSAxMi4wNDE1IDcuMzk5NTMgMTIuMDQxNSA4LjA2NzY1QzEyLjA0MTUgOS4wMDY2NCAxMS4yNzc0IDkuNzcwNzYgMTAuMzM4NSA5Ljc3MDc2TDEwLjMzODYgOS43NzA3OFoiIGZpbGw9IiNCNEI0QjQiLz4KPG1hc2sgaWQ9Im1hc2swXzUwXzMwIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iOSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMiI+CjxwYXRoIGQ9Ik05Ljc1NTg2IDAuMTE5ODEySDEwLjkyNzdWMS44NDU1N0g5Ljc1NTg2VjAuMTE5ODEyWiIgZmlsbD0id2hpdGUiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzUwXzMwKSI+CjxwYXRoIGQ9Ik0xMC4zMzg2IDEuODIzMzVDMTAuNjUxOSAxLjgyMzM1IDEwLjkwNjMgMS41NjkwNyAxMC45MDYzIDEuMjU1NjFMMTAuOTA2MiAwLjY4Nzk4M0MxMC45MDYyIDAuMzc0NjUzIDEwLjY1MTkgMC4xMjAyMzkgMTAuMzM4NCAwLjEyMDIzOUMxMC4wMjUxIDAuMTIwMjM5IDkuNzcwNjkgMC4zNzQ1MjcgOS43NzA2OSAwLjY4Nzk4M1YxLjI1NTczQzkuNzcwODEgMS41Njg5NCAxMC4wMjUxIDEuODIzMzUgMTAuMzM4NiAxLjgyMzM1WiIgZmlsbD0iI0I0QjRCNCIvPgo8L2c+CjxwYXRoIGQ9Ik0xMi43NDY1IDIuODIwOTlDMTIuODkxOCAyLjgyMDk5IDEzLjAzNzIgMi43NjUzNyAxMy4xNDc4IDIuNjU0N0wxMy41NDkyIDIuMjUzMzdDMTMuNzcxMiAyLjAzMTM1IDEzLjc3MTIgMS42NzI1OSAxMy41NDkyIDEuNDUwNjlDMTMuMzI3MiAxLjIyODY4IDEyLjk2ODQgMS4yMjg2OCAxMi43NDY1IDEuNDUwNjlMMTIuMzQ1MiAxLjg1MjAzQzEyLjEyMzEgMi4wNzQwNCAxMi4xMjMxIDIuNDMyODEgMTIuMzQ1MiAyLjY1NDdDMTIuNDU1OSAyLjc2NTM3IDEyLjYwMTIgMi44MjA5OSAxMi43NDY1IDIuODIwOTlaIiBmaWxsPSIjQjRCNEI0Ii8+CjxtYXNrIGlkPSJtYXNrMV81MF8zMCIgc3R5bGU9Im1hc2stdHlwZTpsdW1pbmFuY2UiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjEzIiB5PSI0IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIj4KPHBhdGggZD0iTTEzLjE1NDMgNC4wNzIyN0gxNC44Nzk5VjUuMjQ0MTRIMTMuMTU0M1Y0LjA3MjI3WiIgZmlsbD0id2hpdGUiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2sxXzUwXzMwKSI+CjxwYXRoIGQ9Ik0xNC4zMTI0IDQuMDkzNjNIMTMuNzQ0N0MxMy40MzE0IDQuMDkzNjMgMTMuMTc2OSA0LjM0NzkyIDEzLjE3NjkgNC42NjEzN0MxMy4xNzY5IDQuOTc0NyAxMy40MzEyIDUuMjI5MTIgMTMuNzQ0NyA1LjIyOTEySDE0LjMxMjRDMTQuNjI1OCA1LjIyOTEyIDE0Ljg4MDIgNC45NzQ4MyAxNC44ODAyIDQuNjYxMzdDMTQuODgwMSA0LjM0NzkyIDE0LjYyNTggNC4wOTM2MyAxNC4zMTI0IDQuMDkzNjNaIiBmaWxsPSIjQjRCNEI0Ii8+CjwvZz4KPC9zdmc+Cg==";

/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/getRoundingMethod.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/_lib/getRoundingMethod.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRoundingMethod: () => (/* binding */ getRoundingMethod)
/* harmony export */ });
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTimezoneOffsetInMilliseconds: () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/normalizeDates.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/normalizeDates.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeDates: () => (/* binding */ normalizeDates)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


function normalizeDates(context, ...dates) {
  const normalize = _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}


/***/ }),

/***/ "./node_modules/date-fns/addDays.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/addDays.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDays: () => (/* binding */ addDays),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");



/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  if (isNaN(amount)) return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(options?.in || date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDays);


/***/ }),

/***/ "./node_modules/date-fns/compareAsc.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/compareAsc.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareAsc: () => (/* binding */ compareAsc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateLeft) - +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compareAsc);


/***/ }),

/***/ "./node_modules/date-fns/constants.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/constants.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFromSymbol: () => (/* binding */ constructFromSymbol),
/* harmony export */   daysInWeek: () => (/* binding */ daysInWeek),
/* harmony export */   daysInYear: () => (/* binding */ daysInYear),
/* harmony export */   maxTime: () => (/* binding */ maxTime),
/* harmony export */   millisecondsInDay: () => (/* binding */ millisecondsInDay),
/* harmony export */   millisecondsInHour: () => (/* binding */ millisecondsInHour),
/* harmony export */   millisecondsInMinute: () => (/* binding */ millisecondsInMinute),
/* harmony export */   millisecondsInSecond: () => (/* binding */ millisecondsInSecond),
/* harmony export */   millisecondsInWeek: () => (/* binding */ millisecondsInWeek),
/* harmony export */   minTime: () => (/* binding */ minTime),
/* harmony export */   minutesInDay: () => (/* binding */ minutesInDay),
/* harmony export */   minutesInHour: () => (/* binding */ minutesInHour),
/* harmony export */   minutesInMonth: () => (/* binding */ minutesInMonth),
/* harmony export */   minutesInYear: () => (/* binding */ minutesInYear),
/* harmony export */   monthsInQuarter: () => (/* binding */ monthsInQuarter),
/* harmony export */   monthsInYear: () => (/* binding */ monthsInYear),
/* harmony export */   quartersInYear: () => (/* binding */ quartersInYear),
/* harmony export */   secondsInDay: () => (/* binding */ secondsInDay),
/* harmony export */   secondsInHour: () => (/* binding */ secondsInHour),
/* harmony export */   secondsInMinute: () => (/* binding */ secondsInMinute),
/* harmony export */   secondsInMonth: () => (/* binding */ secondsInMonth),
/* harmony export */   secondsInQuarter: () => (/* binding */ secondsInQuarter),
/* harmony export */   secondsInWeek: () => (/* binding */ secondsInWeek),
/* harmony export */   secondsInYear: () => (/* binding */ secondsInYear)
/* harmony export */ });
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");


/***/ }),

/***/ "./node_modules/date-fns/constructFrom.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFrom: () => (/* binding */ constructFrom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && _constants_js__WEBPACK_IMPORTED_MODULE_0__.constructFromSymbol in date)
    return date[_constants_js__WEBPACK_IMPORTED_MODULE_0__.constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructFrom);


/***/ }),

/***/ "./node_modules/date-fns/constructNow.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/constructNow.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructNow: () => (/* binding */ constructNow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


/**
 * @name constructNow
 * @category Generic Helpers
 * @summary Constructs a new current date using the passed value constructor.
 * @pure false
 *
 * @description
 * The function constructs a new current date using the constructor from
 * the reference date. It helps to build generic functions that accept date
 * extensions and use the current date.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @param date - The reference date to take constructor from
 *
 * @returns Current date initialized using the given date constructor
 *
 * @example
 * import { constructNow, isSameDay } from 'date-fns'
 *
 * function isToday<DateType extends Date>(
 *   date: DateArg<DateType>,
 * ): boolean {
 *   // If we were to use `new Date()` directly, the function would  behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
function constructNow(date) {
  return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructNow);


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInCalendarDays: () => (/* binding */ differenceInCalendarDays)
/* harmony export */ });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js");
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
/* harmony import */ var _startOfDay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfDay.js */ "./node_modules/date-fns/startOfDay.js");





/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = (0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__.startOfDay)(laterDate_);
  const earlierStartOfDay = (0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__.startOfDay)(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - (0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffsetInMilliseconds)(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - (0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffsetInMilliseconds)(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / _constants_js__WEBPACK_IMPORTED_MODULE_3__.millisecondsInDay);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInCalendarDays);


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInCalendarMonths: () => (/* binding */ differenceInCalendarMonths)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");


/**
 * The {@link differenceInCalendarMonths} function options.
 */

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();

  return yearsDiff * 12 + monthsDiff;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInCalendarMonths);


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarYears.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarYears.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInCalendarYears: () => (/* binding */ differenceInCalendarYears)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");


/**
 * The {@link differenceInCalendarYears} function options.
 */

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInCalendarYears);


/***/ }),

/***/ "./node_modules/date-fns/differenceInDays.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/differenceInDays.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInDays: () => (/* binding */ differenceInDays)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _differenceInCalendarDays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./differenceInCalendarDays.js */ "./node_modules/date-fns/differenceInCalendarDays.js");



/**
 * The {@link differenceInDays} function options.
 */

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full days according to the local timezone
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 *
 * @example
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
 * //=> 92
 */
function differenceInDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = compareLocalAsc(laterDate_, earlierDate_);
  const difference = Math.abs(
    (0,_differenceInCalendarDays_js__WEBPACK_IMPORTED_MODULE_1__.differenceInCalendarDays)(laterDate_, earlierDate_),
  );

  laterDate_.setDate(laterDate_.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  const isLastDayNotFull = Number(
    compareLocalAsc(laterDate_, earlierDate_) === -sign,
  );

  const result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(laterDate, earlierDate) {
  const diff =
    laterDate.getFullYear() - earlierDate.getFullYear() ||
    laterDate.getMonth() - earlierDate.getMonth() ||
    laterDate.getDate() - earlierDate.getDate() ||
    laterDate.getHours() - earlierDate.getHours() ||
    laterDate.getMinutes() - earlierDate.getMinutes() ||
    laterDate.getSeconds() - earlierDate.getSeconds() ||
    laterDate.getMilliseconds() - earlierDate.getMilliseconds();

  if (diff < 0) return -1;
  if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInDays);


/***/ }),

/***/ "./node_modules/date-fns/differenceInMonths.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/differenceInMonths.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInMonths: () => (/* binding */ differenceInMonths)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _compareAsc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compareAsc.js */ "./node_modules/date-fns/compareAsc.js");
/* harmony import */ var _differenceInCalendarMonths_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceInCalendarMonths.js */ "./node_modules/date-fns/differenceInCalendarMonths.js");
/* harmony import */ var _isLastDayOfMonth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLastDayOfMonth.js */ "./node_modules/date-fns/isLastDayOfMonth.js");





/**
 * The {@link differenceInMonths} function options.
 */

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    laterDate,
    earlierDate,
  );

  const sign = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    (0,_differenceInCalendarMonths_js__WEBPACK_IMPORTED_MODULE_2__.differenceInCalendarMonths)(workingLaterDate, earlierDate_),
  );

  if (difference < 1) return 0;

  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);

  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);

  let isLastMonthNotFull = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(workingLaterDate, earlierDate_) === -sign;

  if (
    (0,_isLastDayOfMonth_js__WEBPACK_IMPORTED_MODULE_3__.isLastDayOfMonth)(laterDate_) &&
    difference === 1 &&
    (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(laterDate_, earlierDate_) === 1
  ) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInMonths);


/***/ }),

/***/ "./node_modules/date-fns/differenceInWeeks.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/differenceInWeeks.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInWeeks: () => (/* binding */ differenceInWeeks)
/* harmony export */ });
/* harmony import */ var _lib_getRoundingMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/getRoundingMethod.js */ "./node_modules/date-fns/_lib/getRoundingMethod.js");
/* harmony import */ var _differenceInDays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./differenceInDays.js */ "./node_modules/date-fns/differenceInDays.js");



/**
 * The {@link differenceInWeeks} function options.
 */

/**
 * @name differenceInWeeks
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero by default.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 7*24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 *
 * @example
 * // How many full weeks are between
 * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 8 weeks (54 days),
 * // even if DST starts and the period has
 * // only 54*24-1 hours.
 * const result = differenceInWeeks(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 6)
 * )
 * //=> 8
 */
function differenceInWeeks(laterDate, earlierDate, options) {
  const diff = (0,_differenceInDays_js__WEBPACK_IMPORTED_MODULE_0__.differenceInDays)(laterDate, earlierDate, options) / 7;
  return (0,_lib_getRoundingMethod_js__WEBPACK_IMPORTED_MODULE_1__.getRoundingMethod)(options?.roundingMethod)(diff);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInWeeks);


/***/ }),

/***/ "./node_modules/date-fns/differenceInYears.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/differenceInYears.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInYears: () => (/* binding */ differenceInYears)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _compareAsc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compareAsc.js */ "./node_modules/date-fns/compareAsc.js");
/* harmony import */ var _differenceInCalendarYears_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceInCalendarYears.js */ "./node_modules/date-fns/differenceInCalendarYears.js");




/**
 * The {@link differenceInYears} function options.
 */

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  // -1 if the left date is earlier than the right date
  // 2023-12-31 - 2024-01-01 = -1
  const sign = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(laterDate_, earlierDate_);

  // First calculate the difference in calendar years
  // 2024-01-01 - 2023-12-31 = 1 year
  const diff = Math.abs((0,_differenceInCalendarYears_js__WEBPACK_IMPORTED_MODULE_2__.differenceInCalendarYears)(laterDate_, earlierDate_));

  // Now we need to calculate if the difference is full. To do that we set
  // both dates to the same year and check if the both date's month and day
  // form a full year.
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);

  // For it to be true, when the later date is indeed later than the earlier date
  // (2026-02-01 - 2023-12-10 = 3 years), the difference is full if
  // the normalized later date is also later than the normalized earlier date.
  // In our example, 1584-02-01 is earlier than 1584-12-10, so the difference
  // is partial, hence we need to subtract 1 from the difference 3 - 1 = 2.
  const partial = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(laterDate_, earlierDate_) === -sign;

  const result = sign * (diff - +partial);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInYears);


/***/ }),

/***/ "./node_modules/date-fns/endOfDay.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/endOfDay.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfDay: () => (/* binding */ endOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * The {@link endOfDay} function options.
 */

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfDay);


/***/ }),

/***/ "./node_modules/date-fns/endOfMonth.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfMonth.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfMonth: () => (/* binding */ endOfMonth)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * The {@link endOfMonth} function options.
 */

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfMonth);


/***/ }),

/***/ "./node_modules/date-fns/isLastDayOfMonth.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/isLastDayOfMonth.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isLastDayOfMonth: () => (/* binding */ isLastDayOfMonth)
/* harmony export */ });
/* harmony import */ var _endOfDay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endOfDay.js */ "./node_modules/date-fns/endOfDay.js");
/* harmony import */ var _endOfMonth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endOfMonth.js */ "./node_modules/date-fns/endOfMonth.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");




/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  return +(0,_endOfDay_js__WEBPACK_IMPORTED_MODULE_1__.endOfDay)(_date, options) === +(0,_endOfMonth_js__WEBPACK_IMPORTED_MODULE_2__.endOfMonth)(_date, options);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLastDayOfMonth);


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameDay: () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _startOfDay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfDay.js */ "./node_modules/date-fns/startOfDay.js");



/**
 * The {@link isSameDay} function options.
 */

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +(0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__.startOfDay)(dateLeft_) === +(0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__.startOfDay)(dateRight_);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameDay);


/***/ }),

/***/ "./node_modules/date-fns/isSameWeek.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameWeek.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameWeek: () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");



/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(laterDate_, options) === +(0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(earlierDate_, options)
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameWeek);


/***/ }),

/***/ "./node_modules/date-fns/isThisWeek.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isThisWeek.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isThisWeek: () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
/* harmony import */ var _constructNow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructNow.js */ "./node_modules/date-fns/constructNow.js");
/* harmony import */ var _isSameWeek_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameWeek.js */ "./node_modules/date-fns/isSameWeek.js");




/**
 * The {@link isThisWeek} function options.
 */

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param date - The date to check
 * @param options - The object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(date, options) {
  return (0,_isSameWeek_js__WEBPACK_IMPORTED_MODULE_0__.isSameWeek)(
    (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(options?.in || date, date),
    (0,_constructNow_js__WEBPACK_IMPORTED_MODULE_2__.constructNow)(options?.in || date),
    options,
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isThisWeek);


/***/ }),

/***/ "./node_modules/date-fns/isToday.js":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isToday.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isToday: () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
/* harmony import */ var _constructNow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructNow.js */ "./node_modules/date-fns/constructNow.js");
/* harmony import */ var _isSameDay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.js */ "./node_modules/date-fns/isSameDay.js");




/**
 * The {@link isToday} function options.
 */

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date, options) {
  return (0,_isSameDay_js__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(
    (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(options?.in || date, date),
    (0,_constructNow_js__WEBPACK_IMPORTED_MODULE_2__.constructNow)(options?.in || date),
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isToday);


/***/ }),

/***/ "./node_modules/date-fns/isTomorrow.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isTomorrow.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isTomorrow: () => (/* binding */ isTomorrow)
/* harmony export */ });
/* harmony import */ var _addDays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addDays.js */ "./node_modules/date-fns/addDays.js");
/* harmony import */ var _constructNow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructNow.js */ "./node_modules/date-fns/constructNow.js");
/* harmony import */ var _isSameDay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.js */ "./node_modules/date-fns/isSameDay.js");




/**
 * The {@link isTomorrow} function options.
 */

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(date, options) {
  return (0,_isSameDay_js__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(
    date,
    (0,_addDays_js__WEBPACK_IMPORTED_MODULE_1__.addDays)((0,_constructNow_js__WEBPACK_IMPORTED_MODULE_2__.constructNow)(options?.in || date), 1),
    options,
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTomorrow);


/***/ }),

/***/ "./node_modules/date-fns/parseISO.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/parseISO.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parseISO: () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");




/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const invalidDate = () => (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom)(options?.in, NaN);

  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(+date)) return invalidDate();

  const timestamp = +date;
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__.toDate)(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate(),
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds(),
    );
    return result;
  }

  return (0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__.toDate)(timestamp + time + offset, options?.in);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * _constants_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute + seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseISO);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__.toDate)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/toDate.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom)(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var animate_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animate.css */ "./node_modules/animate.css/animate.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/images */ "./src/js/images.js");
/* harmony import */ var _js_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/sidebar */ "./src/js/sidebar.js");
/* harmony import */ var _js_taskManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/taskManager */ "./src/js/taskManager.js");
/* harmony import */ var _js_addTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/addTask */ "./src/js/addTask.js");






(0,_js_addTask__WEBPACK_IMPORTED_MODULE_5__.addTaskModal)();
(0,_js_images__WEBPACK_IMPORTED_MODULE_2__.setImages)();
(0,_js_sidebar__WEBPACK_IMPORTED_MODULE_3__.sidebarLogic)();
(0,_js_taskManager__WEBPACK_IMPORTED_MODULE_4__.render)();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map