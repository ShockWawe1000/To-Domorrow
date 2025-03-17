import { currentFilter, tasks } from "./taskManager"
import { checkFilterDate } from "./checkDate";

const titlePage = document.getElementById("titlePage")

const PendingCount = document.getElementById("PendingCount")
const CompletedCount = document.getElementById("CompletedCount")



const TodayCountElement  = document.getElementById("TodayCount")
const TomorrowCountElement  = document.getElementById("TomorrowCount")
const WeekCountElement  = document.getElementById("WeekCount")
const PlannedCountElement  = document.getElementById("PlannedCount")
const CompletedCountElement  = document.getElementById("CompletedCount")



export function stats(){
    const counts = {
        completed: 0,
        today: 0,
        tomorrow: 0,
        week: 0,
        planned: 0
    };

    console.log(titlePage)
    if(currentFilter=="Week") 
        titlePage.innerHTML = "This Week";
    else
         titlePage.innerHTML = currentFilter;

    
   tasks.forEach(task => 
    {
        if (task.completed) counts.completed++;
        if (!task.completed) counts.planned++;
        
        if (checkFilterDate(task.date, "Today")) counts.today++;
        if (checkFilterDate(task.date, "Tomorrow")) counts.tomorrow++;
        if (checkFilterDate(task.date, "Week")) counts.week++;
    })


    TodayCountElement.innerHTML=counts.today;
    TomorrowCountElement.innerHTML=counts.tomorrow;
    WeekCountElement.innerHTML=counts.week;
    PlannedCountElement.innerHTML=counts.planned;
    CompletedCountElement.innerHTML=counts.completed;

    PendingCount.innerHTML=counts.planned;
    CompletedCount.innerHTML=counts.completed;
}
