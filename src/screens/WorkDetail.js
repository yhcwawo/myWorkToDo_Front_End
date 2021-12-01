import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

function Prjtodo(){
  const [toDo, setToDo] = useState("");
  //state 관리를 더 쉽게 할 만한 방법 찾기


  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(event);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="할 일을 추가해주세요." />
        <button>추가</button>
      </form>
    </div>
  );
}

export default Prjtodo;