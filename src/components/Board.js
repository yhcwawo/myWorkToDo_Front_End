
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DndCard from "./DndCard";

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

function Board({ toDos, boardId }) {
  return (
    <Wrapper>
    <Title>{boardId}</Title>
    <Droppable droppableId={boardId}>
        {(swipe, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={swipe.innerRef}
            {...swipe.droppableProps}
        >
          {toDos.map((toDo, index) => (
            <DndCard key={toDo} index={index} toDo={toDo} />
          ))}
          {swipe.placeholder}
        </Area>
      )}
    </Droppable>
  </Wrapper>
  );
}
export default Board;