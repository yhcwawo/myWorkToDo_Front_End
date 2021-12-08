import axios from "axios";
import { atom } from "recoil";

//recoil controll component
//atom for dndCard boards

//axios.get
// ""
const taskData = null;
 

export const toDoState = atom({
  key: "toDo",
  
  //about step
  default: taskData ? JSON.parse(taskData) : {
      "해야 할일": [],
      "처리중": [],
      "완료": [],
  },
});