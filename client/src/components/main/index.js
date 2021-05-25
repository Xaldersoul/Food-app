import React from 'react'
import styled from 'styled-components';
import img from "./main_image.jpg"
import { Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

const MainDiv = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  height: 100vh;
  text-align: center;
  .myh1{
      margin: 0 auto;
      color: white;
      background-color: black;
  }
  .buttonDiv{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
  }
`;

const MyButton = styled.input`
  display: inline-block;
  border: none;
  margin:0;
  text-decoration: none;
  background-color: transparent;
  padding: 2.5rem 3rem;
  font-size: 3.5rem;
  color: palevioletred;
  border: solid 3px palevioletred;
  border-radius: 10px;
  transition: all .3s ease-in;
  &:hover{
      color: white;
      background-color: palevioletred;
  }
`;

const Main = () => {
    return (
        <MainDiv>
            <h1 className="myh1" data-testid="title" >Henry Food</h1>
            <div className="buttonDiv" >
                <Link to="/recipes">
                    <MyButton type="button" value="Start" data-testid="startButton" />
                </Link>
            </div>
        </MainDiv>
    )
}

export default Main

