
import { addTask } from "./taskManager"

const openTaskButton = document.getElementById("addTaskButton")
const addTaskButton = document.getElementById("addTaskModalButton")
const smokeScreen = document.getElementById("modalSmokeScreen")

const modal = document.getElementById("addTaskModal")
const title = document.getElementById("taskTitle")
const description = document.getElementById("taskDescription")
const priority = document.getElementById("prioritySelect")
const date = document.getElementById("dueDateSelect")
const project = document.getElementById("projectsSelect")

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

var form = document.getElementById("addTaskForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
      event.preventDefault();
      modal.classList.remove("hidden"); // Ensure modal is visible
      title.focus(); // Focus on the invalid field
  }
});

function hideModal(){
  modal.classList.add("hidden")
}

function getTaskData(){
 
    
    const title = document.getElementById("taskTitle").value
    const description = document.getElementById("taskDescription").value
    const priority = document.getElementById("prioritySelect").value
    const date = document.getElementById("dueDateSelect").value
    const project = document.getElementById("projectsSelect").value

    if(title)
    {
      addTask(title, description, date, priority, project);
      hideModal();
    }



}


export function addTaskModal()
{
    smokeScreen.addEventListener("click", function() {
        modal.classList.toggle("hidden")
      });

      openTaskButton.addEventListener("click", function() {
        document.getElementById('dueDateSelect').value = new Date().toDateInputValue();
         
       document.getElementById("taskTitle").value="";
       document.getElementById("taskDescription").value='';
      modal.classList.remove("hidden")

      });

      addTaskButton.addEventListener("click", function() {
       getTaskData()
     
      });
}

