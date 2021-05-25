import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import { sortingRecipes, clearRecipes } from "../../actions/index";

const MySorting = styled.select`
  appearance: none;
  background-color: rgb(40,40,40);
  color: palevioletred;
  border: solid 2px palevioletred;
  border-radius: 3px;
  padding: 3px;
  font-size: 15px;
`;

const SortingDiv = styled.div`
  margin: 5px;
  .sortingLabel{
    color: white;
    margin-right: 10px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const Sorting = (props) => {
    const [sorting, setSorting] = useState("");

    useEffect(() => {
        props.clearRecipes()
        switch (sorting) {
            case "alphabeticA":
                props.sortingRecipes(props.allRecetas.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0
                }))
                break;
            case "alphabeticD":
                props.sortingRecipes(props.allRecetas.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1
                    }
                    if (a.title < b.title) {
                        return 1
                    }
                    return 0
                }))
                break;
            case "scoreA":
                props.sortingRecipes(props.allRecetas.sort((a, b) => a.spoonacularScore - b.spoonacularScore))
                break;
            case "scoreD":
                props.sortingRecipes(props.allRecetas.sort((a, b) => b.spoonacularScore - a.spoonacularScore))
                break;
            default:
                props.sortingRecipes(props.allRecetas)
                break;
        }

    }, [sorting]);

    function handleChange(e) {
        setSorting(e.target.value)
    }

    return (
        <SortingDiv>
            <label for="order" className="sortingLabel" >Order By:</label>

            <MySorting name="order" id="order" onChange={(e) => handleChange(e)}>
                <option value="none" >none</option>
                <option value="alphabeticA" >Alphabetic - ascend</option>
                <option value="alphabeticD">Aphabetic - descend</option>
                <option value="scoreA">Score - ascend</option>
                <option value="scoreD">Score - descend</option>
            </MySorting>
        </SortingDiv>
    )
}

function mapStateToProps(state) {
    return {
        allRecetas: state.allRecetas
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearRecipes: recipe => dispatch(clearRecipes(recipe)),
        sortingRecipes: recipe => dispatch(sortingRecipes(recipe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);