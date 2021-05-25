import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Diet from "../diet/index"

const RecipeDiv = styled.div`
    display: flex;
    flex-direction: column;
    background: rgb(40,40,40);
    color: white;
    width: 300px;
    margin: 10px 30px;
    border: 2px solid rgb(40,40,40);
    border-radius: 4px;
    padding: 5px;
    transition: all .3s ease-in-out;
    &:hover{
        background-color: palevioletred;
    }
`;

const DietDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RecipeH1 = styled.h1`
  font-size: 15px;
  text-align: center;
`;

const RecipeImage = styled.img`
  width: 100%;
`;

const Global = styled.div`
  .mylink{
      text-decoration: none;
  }
`;

const Recipe = (props) => {
    const [dietas, setDietas] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (props.el.origin) {
            let dbDietas = [];
            setUrl(`/recipes/info/${props.id}?origin=db`)
            props.diets.forEach(el => {
                dbDietas.push(el.name)
            });
            setDietas(dbDietas)
        } else {
            setUrl(`/recipes/info/${props.id}`)
            setDietas(props.diets)
        }
    }, []);

    return (
        <>
            <Global>
                <Link to={url} className="mylink" >
                    <RecipeDiv>
                        <div>
                            <RecipeImage src={props.image} alt="" />
                        </div>
                        <div>
                            <RecipeH1>{props.title}</RecipeH1>
                        </div>
                        <DietDiv>
                            {dietas ? dietas.map((el, index) => <Diet name={el} key={index} />) : null}
                        </DietDiv>
                    </RecipeDiv>
                </Link>
            </Global>
        </>
    )
}

function mapStateToProps(state) {
    return {
        dietas: state.dietas,
    };
}

export default connect(mapStateToProps, null)(Recipe);
