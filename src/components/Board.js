import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DndCard from "./DndCard";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { user_id_token } from "../auth";
import { SERVER_URL } from "../config";
import 'url-search-params-polyfill';

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
  //console.log(toDos);
  const {work_id} = useParams();
  console.log(work_id);

  //axios task
  const user_id = user_id_token; 
  let params = new URLSearchParams();
  const [task_to_date,setTaskToDate] = useState("");
  const [userName,setUserName] = useState("");
  const [taskId,setTaskId] = useState("");

  useEffect(()=>{
  
    axios.get(`${SERVER_URL}/work/${work_id}`)
    .then(function (response) {
         // response  
         console.log("work result");
          setTaskToDate(response.data.to_date);

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

  },[]);


  const setToDos = useSetRecoilState(toDoState);
  //useForm 으로 register에 등록된 변수를 담기
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ toDo }) => {
    //console.log(boardId);
    //save to mysql db

    params.append('task_name', toDo);
    params.append('user_id', user_id_token);
    params.append('step', boardId);
    params.append('task_index', 0);
    params.append('user_name', "본인");
    params.append('work_id', work_id);
    params.append('completedYn', "N");
    params.append('task_to_date', task_to_date);

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }

    axios.post(`${SERVER_URL}/task/post`, params, {headers}).then(function (response) {
        console.log(response);

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

    axios.get(`${SERVER_URL}/task/top`)
    .then(function (response) {
        // response  
        console.log("task result");
        console.log(response.data);

        setUserName(response.data.user_name);
        setTaskId(response.data.task_id);

        console.log(response.data.user_name);
        console.log(userName);

      }).catch(function (error) {
          // 오류발생시 실행
      }).then(function() {
          // 항상 실행
   });

    const newToDo = {
      id: taskId,//task_id,
      text: toDo,
      user_name: userName,//user_name ,
      step: boardId,
      completedYn: "N",
    };
    setToDos((allBoards) => {

      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });

  setValue("toDo", "");

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
                user_name={toDo.user_name}
                completedYn={toDo.completedYn}
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