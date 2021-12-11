import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./NotFound.css";
import routes from "../routes";

function NotFound() {
  return(
      <>
      
      <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
        </div>
        <h2>이런 페이지를 찾을 수 없습니다!</h2>

        <Link to={routes.main}><a><span class="arrow"></span>My work to do 메인으로 돌아가기</a></Link>
      </div>
    </div>
      
      </>
    );
}
export default NotFound;
