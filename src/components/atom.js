import { atom, selector } from "recoil";

//recoil controll component
export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});