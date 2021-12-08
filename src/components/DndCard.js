import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

//dndCard component

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : "#fff44f"};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

function DndCard({ toDoId, toDoText, index }) {

  return (
    <Draggable draggableId={toDoId.toString()} index={index}>
      {(swipe,snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={swipe.innerRef}
          {...swipe.dragHandleProps}
          {...swipe.draggableProps}
        >
         {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

//memo == prop이 변경되지 않았을시 재 랜더링 금지
export default React.memo(DndCard);