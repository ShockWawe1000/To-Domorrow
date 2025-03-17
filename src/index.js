import "animate.css"
import './style.css';
import { setImages } from './js/images';
import { sidebarLogic } from './js/sidebar';
import { render } from './js/taskManager';
import { addTaskModal }  from './js/addTask';

addTaskModal()
setImages();
sidebarLogic();
render()
