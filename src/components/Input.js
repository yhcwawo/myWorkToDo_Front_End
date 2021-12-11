import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 3px;
  padding: 8px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : "black")};
  margin-top: 7px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
