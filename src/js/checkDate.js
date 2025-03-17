import { compareAsc, parseISO ,isThisWeek ,startOfDay, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, isToday, isTomorrow } from "date-fns";





export function checkFilterDate(date, filterDate){
    const targetDate = startOfDay(date)
    var currentFilter 

    if (isToday(targetDate)) currentFilter =  "Today";
    else if (isTomorrow(targetDate)) currentFilter = "Tomorrow";
    else if (isThisWeek(targetDate)) currentFilter = "Week";
    else currentFilter = "Planned" 

    if (filterDate == currentFilter)
        return true;
    else
        return false;
}