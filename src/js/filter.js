import { checkFilterDate } from "./checkDate";
import { compareAsc, parseISO ,isThisWeek ,startOfDay, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, isToday, isTomorrow } from "date-fns";








function sortTasksByDate(tasks) {
    tasks.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
}

function filter(task, filterTask){
  
  
    if(filterTask)
    {   
       
         switch (filterTask) {
            case "Completed":
                if (task.Completed == true)
                    return true;
            break;


            case "Today":
            case "Tomorrow":
            case "Week":
                if (checkFilterDate(task.date, filterTask))
                {
                    if (task.Completed == false)
                        return true;
                }
                   
            break;
        
            case "Planned":
                if (task.Completed == false)
                    return true;
            break;

            default:
                return false;
        }
        return false;
    }
    else
    if (task.Completed == false)
        return true;
}

export function formatTasks(tasks, filterTask)
{
   



    console.log(filterTask)
    var formatedTasks = [];


   // var filterTask = "Today"

   sortTasksByDate(tasks)

   tasks.forEach(task => 
    {
           
        if(filter(task, filterTask)){
      
                            formatedTasks.push(task);
             
                    
              
            }
    })

    return formatedTasks
}
