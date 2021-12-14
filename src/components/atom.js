import axios from "axios";
import { useParams } from "react-router-dom";
import { atom } from "recoil";

//recoil controll component
//atom for dndCard boards

//axios.get
// ""
const taskData = null;


console.log(taskData);


export const toDoState = atom({

  key: "toDo",
  
  //about step
  default: {
      "해야할일": [],
      "처리중": [],
      "보류": [],
      "완료": [],
  },
});