import React from 'react'
import styled from 'styled-components';

const DietDiv = styled.div`
    background: rgb(40,40,40);
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0.2em .5em;
    padding: .5rem .25rem;
    text-align: center;
`;

const Diet = (props) => {

    return (
        <>
            { props.name ? <DietDiv data-testid="dietCompDiv"><label data-testid="dietCompData">{props.name}</label></DietDiv> : null}
        </>
    )
};

export default Diet;
