import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DndCard from "./DndCard";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";
import axios from "axios";

const Wrapper = styled.div`
  width: 300px;
  background-color: #fff44f;
  border-radius: 5px;
  padding-top: 10px;
  min-height: 300px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver
    ? "#fff44f"
    : props.isDraggingFromThis
    ? "#b2bec3"
    : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

function Board({ toDos, boardId }) {
  console.log(toDos);

  const setToDos = useSetRecoilState(toDoState);
  //useForm 으로 register에 등록된 변수를 담기
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ toDo }) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      // save to mysql db
      //axios 

      /* "todos",
        JSON.stringify({
          ...allBoards,
          [boardId]: [newTodo, ...allBoards[boardId]],
      }) */


      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });

  setValue("toDo", "");
  //console.log(newToDo);

  }
  return (
    <Wrapper>
    <Title>{boardId}</Title>
    <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`테스크 추가하기`}
        />
    </Form>
    <Droppable droppableId={boardId}>
        {(swipe, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={swipe.innerRef}
            {...swipe.droppableProps}
        >
          {toDos.map((toDo, index) => (
            
            <DndCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
          ))}
          {swipe.placeholder}
        </Area>
      )}
    </Droppable>
  </Wrapper>
  );
}
export default Board;