import icon from "../pictures/icon.svg"
import sidebar from "../pictures/sidebar.svg"
import Today from "../pictures/Today.svg"
import Week from "../pictures/Week.svg"
import tommorow from "../pictures/tommorow.svg"
import Planned from "../pictures/Planned.svg"
import Completed from "../pictures/Completed.svg"
import project from "../pictures/project.svg"
import add from "../pictures/add.svg"
import priority from "../pictures/priority.svg"


function createImageDiv(element, id )
{
    const tempImg = new Image();
    tempImg.src=  element
    tempImg.classList.add("iconSvg")
    var parentElement = document.getElementById(id)
    parentElement.append(tempImg)

}

function createMultipleImageDiv(element, id)
{
 

        document.querySelectorAll(id).forEach(
            el => {    
           
                const tempImg = new Image();
                tempImg.src = element;
                tempImg.classList.add("iconSvg")
                el.append(tempImg)
           
            }
        );
    
}

export function setImages(){
    

    createImageDiv(icon, "icon")
    createImageDiv( sidebar, "sidebarIcon")
    createImageDiv(sidebar, "sidebarIcon2")
    createImageDiv(Today, "TodayImg")
    createImageDiv(tommorow, "tommorowImg")
    createImageDiv(Week, "WeekImg")
    createImageDiv(Planned, "PlannedImg")
    createImageDiv(Completed, "CompletedImg");
    createImageDiv(add, "addImg");

    createImageDiv(priority, "flagImg");
    createImageDiv(Planned, "calendarImg");
    createImageDiv(project, "projectModalImg");
    window.onload= createMultipleImageDiv(project,".projectImg");
}