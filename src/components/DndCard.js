import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, InputAdornment, TextField } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import 'url-search-params-polyfill';
import axios from "axios";
import { SERVER_URL } from "../config";
import { useHistory, useParams } from "react-router";

//dndCard component
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border-radius: 8px;
  margin-bottom: 2px;
  padding: 5px 5px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : "white"};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

function DndCard({ toDoId, toDoText, index, user_name, completedYn, userEmail}) {
  const [completedYns,setCompletedYns] = useState(completedYn);
  const history = useHistory()
  const {work_id} = useParams();
  
  const handleClickDeleteTask = () => {
    //toDoId == this.task_id
    let params = new URLSearchParams();
    params.append('task_id', toDoId);

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }

    axios.delete(`${SERVER_URL}/task/delete/${toDoId}`, params, {headers}).then(function (response) {
      console.log("delete");
      window.location.replace(`/work/${work_id}`);
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
  };

  const handleClickUpdateYn = (completedYn) => {

    console.log(completedYn);
    let params = new URLSearchParams();

    if(completedYn == "Y"){
      
      setCompletedYns("N");
      params.append('completedYn', "N");
    }else{

      setCompletedYns("Y");
      params.append('completedYn', "Y");
    }

    params.append('task_id', toDoId);
    
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }

    axios.put(`${SERVER_URL}/task/update/completed`, params, {headers}).then(function (response) {
        console.log("update");

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
  };

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
            label={user_name}
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
{/*             <Button
              onClick={() => {
                handleClickUpdateYn(completedYn);
              }}
              color={completedYns ? "primary" : "secondary"}
            >
              <CheckCircleOutlineTwoToneIcon />
            </Button> */}

         <Button
          onClick={() => {
            handleClickDeleteTask();
          }}
         >
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