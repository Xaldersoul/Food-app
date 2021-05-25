import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import { filterRecipes, clearRecipes } from "../../actions/index";

const MyFilter = styled.select`
  appearance: none;
  background-color: rgb(40,40,40);
  color: palevioletred;
  border: solid 2px palevioletred;
  border-radius: 3px;
  padding: 3px;
  font-size: 15px;
`;

const FilterDiv = styled.div`
  margin: 5px;
  .filterLabel{
    color: white;
    margin-right: 10px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const Filter = (props) => {
    const [filter, setFilter] = useState("");

    const filtrador = function (nombreDieta) {
        props.filterRecipes(props.allRecetas.filter(el => {
            if (el.origin) {
                return el.diets.find(diet => diet.name.indexOf(nombreDieta) > -1)
            } else {
                return el.diets.find(diet => diet.indexOf(nombreDieta) > -1)
            }
        }))
    }

    useEffect(() => {
        props.clearRecipes()
        switch (filter) {
            case "all":
                props.filterRecipes(props.allRecetas)
                break;
            case "vegetarian":
                filtrador("vegetarian")
                break;
            case "gluten free":
                filtrador("gluten free")
                break;
            case "paleo":
                filtrador("paleo")
                break;
            case "whole30":
                filtrador("whole30")
                break;
            case "lacto":
                filtrador("lacto")
                break;
            case "ovo":
                filtrador("ovo")
                break;
            case "vegan":
                filtrador("vegan")
                break;
            case "primal":
                filtrador("primal")
                break;
            case "ketogenic":
                filtrador("ketogenic")
                break;
            case "pescetarian":
                filtrador("pescetarian")
                break;
            default:
                break;
        }

    }, [filter]);

    function handleChange(e) {
        setFilter(e.target.value)
    }

    return (
        <FilterDiv>
            <label for="filters" className="filterLabel">Filter By:</label>

            <MyFilter name="filters" id="filters" onChange={(e) => handleChange(e)}>
                <option value="all" >All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten free">Gluten free</option>
                <option value="paleo">Paleo</option>
                <option value="whole30">Whole30</option>
                <option value="lacto">Lacto vegetarian</option>
                <option value="ovo">Ovo vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="primal">Primal</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="pescetarian">Pescetarian</option>
            </MyFilter>
        </FilterDiv>
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
        filterRecipes: recipe => dispatch(filterRecipes(recipe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
