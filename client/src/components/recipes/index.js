import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Recipe from '../recipe';
import { connect } from "react-redux";
import { getRecipes, getDiets, clearRecipes, resetPagination } from "../../actions/index";

const Recetas = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
margin: 0 20%;
`
const Buscando = styled.h1`
  color: white;
  align-self: center;
  justify-self: center;
  margin-top: 25%;
  font-size: 70px;
`;

function Recipes(props) {
    const [messege, setMessege] = useState("");

    useEffect(() => {
        props.getRecipes();
        props.getDiets();
        return () => {
            props.clearRecipes();
            props.resetPagination();
        };
    }, []);

    useEffect(() => {
        if (typeof props.recetas[0] === "string") {
            setMessege(props.recetas[0])
        } else {
            setMessege("Loading...")
        }
    }, [props.recetas]);

    const startIndex = (props.pagina - 1) * props.recetasPorPagina;
    const selectedRecipes = props.recetas.slice(startIndex, startIndex + props.recetasPorPagina);

    return <Recetas>
        {selectedRecipes.length && typeof selectedRecipes[0] !== "string" ? selectedRecipes.map((el) => <Recipe key={el.id} title={el.title} image={el.image} diets={el.diets} id={el.id} el={el} />) : <Buscando>{messege}</Buscando>}
    </Recetas>
};

function mapStateToProps(state) {
    return {
        recetas: state.recetas,
        pagina: state.pagina,
        recetasPorPagina: state.recetasPorPagina
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipes: recipe => dispatch(getRecipes(recipe)),
        getDiets: diet => dispatch(getDiets(diet)),
        clearRecipes: recipe => dispatch(clearRecipes(recipe)),
        resetPagination: page => dispatch(resetPagination(page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
