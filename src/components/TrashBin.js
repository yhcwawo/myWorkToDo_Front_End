import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import SaveIcon from '@material-ui/icons/Save';

const Bin = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDraggingOver ? "black" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  position: relative;
  transition: all 0.3s ease;
  margin: 30px 0px;
  div {
    color: ${(props) => (props.isDraggingOver ? "white" : "black")};
    transform: ${(props) => (props.isDraggingOver ? "scale(1.3)" : "none")};
    transition: all 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
`;

function TrashBin() {
  return (
    <Droppable droppableId="trashBin" type="toDo">
      {(swipe, snapshot) => {
        return (
          <Bin
            isDraggingOver={snapshot.isDraggingOver}
            ref={swipe.innerRef}
            {...swipe.droppableProps}
          >
            <IconWrapper>
                 <SaveIcon />
            </IconWrapper>
            {swipe.placeholder}
          </Bin>
        );
      }}
    </Droppable>
  );
}

export default TrashBin;