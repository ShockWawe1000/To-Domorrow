const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const sidebarToggleButton2 = document.getElementById('sidebarIcon2')
const sidebarToggleButton = document.getElementById('sidebarIcon')
const smokeScreen = document.getElementById('smokeScreen')
var windowSize = window.matchMedia("(max-width: 780px)")


function responsiveSidebar(windowSize)
{
    if (windowSize.matches){
        main.classList.add("fullscreen")
        sidebar.classList.add("hidden")
   
        if (sidebarToggleButton.classList.contains("hiddenBtn"))
        {
            sidebarToggleButton.classList.remove("hiddenBtn")
            sidebarToggleButton2.classList.add("hiddenBtn")
        }
      
    }
    else{
        main.classList.remove("fullscreen")
        sidebar.classList.remove("hidden")
        smokeScreen.classList.add("hidden")
        if (sidebarToggleButton2.classList.contains("hiddenBtn"))
            {
                sidebarToggleButton2.classList.remove("hiddenBtn")
                sidebarToggleButton.classList.add("hiddenBtn")
            }
          
    }

}

function toggleSidebar(){

        sidebar.classList.toggle("hidden")
        main.classList.toggle("fullscreen")
        sidebarToggleButton2.classList.toggle("hiddenBtn")
        sidebarToggleButton.classList.toggle("hiddenBtn")    
        if (windowSize.matches){
            if (sidebarToggleButton2.classList.contains("hiddenBtn"))
            smokeScreen.classList.add("hidden")
            else
            smokeScreen.classList.remove("hidden")
        }
}


export function sidebarLogic(){
    sidebarToggleButton2.addEventListener("click", function() {
        toggleSidebar()
      });

      sidebarToggleButton.addEventListener("click", function() {
        toggleSidebar()
      });

      smokeScreen.addEventListener("click", function() {
        toggleSidebar()
      });

      windowSize.addEventListener("change", function() {
    
        responsiveSidebar(windowSize);
      });
}


