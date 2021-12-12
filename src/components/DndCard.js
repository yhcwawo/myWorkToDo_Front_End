import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, InputAdornment, TextField } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
//dndCard component

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : "white"};
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
         
         <TextField
            id="input-with-icon-textfield"
            label={"윤홍찬"}
            value={toDoText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
         <br />

        <Container>
          
        { true ? (
            <Button>
            <CheckCircleOutlineTwoToneIcon />
            </Button>
          )  :  (
            <Button>
            <CheckCircleIcon />
            </Button>
          )
         }
         
         <Button>
         <DeleteForeverIcon />
         </Button>

         </Container>
        </Card>
      )}
    </Draggable>
  );
}

//memo == prop이 변경되지 않았을시 재 랜더링 금지
export default React.memo(DndCard);