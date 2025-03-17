

import { compareAsc, parseISO ,isThisWeek ,startOfDay, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, isToday, isTomorrow } from "date-fns";


export function getRelativeDate(date) {
  const Today = startOfDay(new Date()); // Normalize Today's date to midnight
  const targetDate = startOfDay(date); // Normalize the target date to midnight

  if (isToday(targetDate)) return "Today";
  if (isTomorrow(targetDate)) return "Tomorrow";

  const daysDiff = differenceInDays(targetDate, Today);
  const WeeksDiff = differenceInWeeks(targetDate, Today);
  const monthsDiff = differenceInMonths(targetDate, Today);
  const yearsDiff = differenceInYears(targetDate, Today);
   

    if (daysDiff < 7) return `In ${daysDiff} days`; // "In 3 days"
    if (WeeksDiff === 1) return "Next Week"; // "Next Week"
    if (WeeksDiff > 1 && monthsDiff < 1) return `In ${WeeksDiff} Weeks`; // "In 2 Weeks"
    if (monthsDiff === 1) return "Next month"; // "Next month"
    if (monthsDiff > 1 && monthsDiff < 5) return `In ${monthsDiff} months`; // "In 4 months"
    if (yearsDiff === 1) return "In a year"; // "In a year"
    return `In ${yearsDiff} years`; // "In 4 years"
}