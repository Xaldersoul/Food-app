import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getRecipeDetail, getRecipeDetailDB } from "../../actions/index";
import styled from 'styled-components';
import Diet from "../diet"
import queryString from 'query-string';

const InfoDiv = styled.div`
  display: flex;
  background-color: rgb(40,40,40);
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 10% 20%;
  padding: 2rem;
  color: white;
  border: solid 4px palevioletred;
    border-radius: 5px;
  .infoTitle{
      text-align: center;
      display: inline-block;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  .img{
      width: 100%;
  }
`;

const DietDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 15%;
  border: solid 4px palevioletred;
`;

const RecipeInfo = (props) => {
    const [dietas, setDietas] = useState([]);

    useEffect(() => {
        var test = queryString.parse(props.location.search)
        if (test.origin) {
            props.getRecipeDetailDB(props.match.params.id)
        } else {
            props.getRecipeDetail(props.match.params.id)
        }
    }, []);

    useEffect(() => {
        if (props.recipeDetail.origin) {
            let dbDietas = [];
            props.recipeDetail.diets.forEach(el => {
                dbDietas.push(el.name)
            });
            setDietas(dbDietas)
        } else {
            setDietas(props.recipeDetail.diets)
        }
    }, [props.recipeDetail]);

    if (props.recipeDetail.instructions) {
        var strippedString = props.recipeDetail.instructions.replace(/(<([^>]+)>)/gi, " ");
    } else {
        var noRecipe = "This recipe has no instructions"
    }

    if (props.recipeDetail.summary) {
        var strippedStringSum = props.recipeDetail.summary.replace(/(<([^>]+)>)/gi, " ");
    } else {
        var noSummary = "This recipe has no summary"
    }

    return (
        <InfoDiv>
            <h1 className="infoTitle">{props.recipeDetail.title}</h1>
            <ImgDiv>
                <img src={props.recipeDetail.image} className="img" />
            </ImgDiv>
            <h2 className="infoTitle">Diets</h2>
            <DietDiv>
                {dietas ? dietas.map((el, index) => <Diet name={el} key={index} />) : null}
            </DietDiv>
            <h2 className="infoTitle">Food Scores</h2>
            <ScoreDiv>
                <div>
                    <h3>Score {props.recipeDetail.spoonacularScore}/100</h3>
                </div>
                <div>
                    <h3>Healthy Score {props.recipeDetail.healthScore}/100</h3>
                </div>
            </ScoreDiv>
            <h2 className="infoTitle" >Summary</h2>
            { strippedStringSum ? <h3 className="infoTitle">{strippedStringSum}</h3> : <h2 className="infoTitle">{noSummary}</h2>}
            <h2 className="infoTitle" >Instructions</h2>
            { strippedString ? <h3 className="infoTitle">{strippedString}</h3> : <h2 className="infoTitle">{noRecipe}</h2>}
        </InfoDiv>
    )
}

function mapStateToProps(state) {
    return {
        recipeDetail: state.recipeDetail
    };
}

export default connect(mapStateToProps, { getRecipeDetail, getRecipeDetailDB })(RecipeInfo);
