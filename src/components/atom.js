import { atom } from "recoil";

//recoil controll component
//atom for dndCard boards
export const toDoState = atom({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
    "Do Later": ["x", "z"],
  },
});