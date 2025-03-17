
import { getRelativeDate } from "./relativeDate";
import { formatTasks } from "./filter";
import { stats } from "./currentPage"

const taskContainer  = document.getElementById("taskContainer")

const TodayBtn  = document.getElementById("Today")
const tommorrowBtn  = document.getElementById("Tomorrow")
const WeekBtn  = document.getElementById("Week")
const PlannedBtn  = document.getElementById("Planned")
const CompletedBtn  = document.getElementById("Completed")

export var currentFilter= "Today";


export var tasks = [];

function Task(title, details, date, priority, project,Completed) {

    this.title = title;
    this.details = details;
    this.date = date;
    this.priority = priority;
    if (project)
        this.project = project;
    else
        this.project="Default"

    if (Completed)
        this.Completed = Completed;
    else
        this.Completed=false
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
        inputCheckmark.id = `cbx-${task.title+task.date+(Math.random() * 10000)}`; // Assuming task.id is unique
    
        label.classList.add("cbx");
        label.setAttribute("for", inputCheckmark.id);
        taskTitle.classList.add("taskTitle");
        dueDate.classList.add("dueDate");
    
        // Set the task title and due date
        taskTitle.textContent = task.title;
        dueDate.textContent = getRelativeDate(task.date);
    
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
        inputCheckmark.addEventListener("change", function() {
            task.Completed = this.checked; // Toggle completion
    
            // Add animation
            taskCard.classList.add('animate__animated', "animate__fadeOutRight");
    
            taskCard.addEventListener('animationend', () => {
                renderAllTasks(currentFilter); // Update task list
            });
        });
    }
    


export function addTask(title, description, date, priority, project){
    tasks.push(new Task (title, description, date, priority, project)) 

    renderAllTasks(currentFilter)
}

export function getAllTasks(){
    return tasks;
}

function clearTasks(){
    taskContainer.innerHTML = '';
}



function renderAllTasks(filterTask){

    clearTasks()
    stats();
    var formatedTasks = formatTasks(tasks,filterTask)
  
    formatedTasks.forEach(task =>  renderTask(task)  )
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



export function render(){
    tasks.push(new Task ("do", "date","2025-03-17","high","Default"))
    tasks.push(new Task ("do", "date","2025-03-18","high","Default"))
    tasks.push(new Task ("do", "date","2025-03-20","high","Default"))
    tasks.push(new Task ("do", "date","2025-03-20","high","Default"))


    renderAllTasks()
    TodayBtn.addEventListener("click", function() {  currentFilter="Today"; renderAllTasks("Today" ); buttonSelectedClass(TodayBtn)})
    tommorrowBtn.addEventListener("click", function() {  currentFilter="Tomorrow"; renderAllTasks("Tomorrow"); buttonSelectedClass(tommorrowBtn) })
    WeekBtn.addEventListener("click", function() {  currentFilter="Week"; renderAllTasks("Week" ); buttonSelectedClass(WeekBtn)})
    PlannedBtn.addEventListener("click", function() {  currentFilter="Planned"; renderAllTasks("Planned" ); buttonSelectedClass(PlannedBtn)})
    CompletedBtn.addEventListener("click", function() {  currentFilter="Completed"; renderAllTasks("Completed" ); buttonSelectedClass(CompletedBtn)})
    
}
