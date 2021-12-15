import { atom } from "recoil";

//recoil controll component
//atom for dndCard boards

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