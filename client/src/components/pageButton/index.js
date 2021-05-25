import React from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import { setPage } from "../../actions/index";

const PageButtonStyle = styled.input`
  background: transparent;
      border-radius: 3px;
      border: 2px solid palevioletred;
      color: palevioletred;
      margin: .2em;
      padding: 0.4em;
      transition: all 0.2s linear;
      &:hover{
        background: palevioletred;
        color: white;
      }
`;


const PageButton = (props) => {
    const numerito = props.num

    return (
        <>
            <PageButtonStyle type="button" value={props.num} onClick={() => { props.setPage(numerito) }} ></PageButtonStyle>
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setPage: page => dispatch(setPage(page))
    };
}

export default connect(null, mapDispatchToProps)(PageButton);
