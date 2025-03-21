import { currentFilter, tasks } from "./taskManager"
import { checkFilterDate } from "./checkDate";

const titlePage = document.getElementById("titlePage")

const PendingCount = document.getElementById("PendingCountPage")
const CompletedCount = document.getElementById("CompletedCountPage")



const TodayCountElement  = document.getElementById("TodayCount")
const TomorrowCountElement  = document.getElementById("TomorrowCount")
const WeekCountElement  = document.getElementById("WeekCount")
const PlannedCountElement  = document.getElementById("PlannedCount")
const CompletedCountElement  = document.getElementById("CompletedCount")

export function statsPage(formatedTasks){
    var PendingCountNum = 0;
    var CompletedCountNum = 0;
    formatedTasks.forEach(task =>  
    {
        if(task.Completed)
        {
            CompletedCountNum++;
        }
        else
        {
            PendingCountNum++;
        }
            
    }
    
    )
    console.log("pending ")
    console.log(PendingCountNum)
    console.log("Completed ")
    console.log(CompletedCountNum)
    PendingCount.innerHTML=PendingCountNum;
    
    CompletedCount.innerHTML=CompletedCountNum;
}

export function statsSidebar(){
    const counts = {
        today: 0,
        tomorrow: 0,
        week: 0,
        planned: 0,
        completed: 0
    };


    if(currentFilter=="Week") 
        titlePage.innerHTML = "This Week";
    else
         titlePage.innerHTML = currentFilter;

    
   tasks.forEach(task => 
    {
        console.log(task.Completed)
        if (task.Completed) counts.completed++;
        else{
            if (!task.Completed) counts.planned++;
        
            if (checkFilterDate(task.date, "Today")) counts.today++;
            if (checkFilterDate(task.date, "Tomorrow")) counts.tomorrow++;
            if (checkFilterDate(task.date, "Week")) counts.week++;
        }
     
    })


    TodayCountElement.innerHTML=counts.today;
    TomorrowCountElement.innerHTML=counts.tomorrow;
    WeekCountElement.innerHTML=counts.week;
    PlannedCountElement.innerHTML=counts.planned;
    CompletedCountElement.innerHTML=counts.completed;

    PendingCount.innerHTML=counts.planned;
    CompletedCount.innerHTML=counts.completed;
}
