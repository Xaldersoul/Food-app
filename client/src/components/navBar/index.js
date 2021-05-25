import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { searchRecipes, clearRecipes, resetPagination } from "../../actions/index";

const SearchForm = styled.form`
    align-self: flex-end;
    .barra {
      border-style: none;
      background: transparent;
      border: 2px solid palevioletred;
      border-radius: 3px;
      color: palevioletred;
    }
    .boton {
      background: transparent;
      border-radius: 3px;
      border: 2px solid palevioletred;
      color: palevioletred;
      margin: 0.5em 1em;
      padding: 0.25em 1em;
      transition: all 0.2s linear;
      &:hover{
        background: palevioletred;
        color: white;
      }
    }
  `
function NavBar(props) {
  // acá va tu código

  function process(busqueda) {
    var respuesta = busqueda.toLowerCase().split(" ")
    return respuesta.join("%20");
  }

  const [receta, setReceta] = useState("");

  return (
    <SearchForm onSubmit={(e) => {
      e.preventDefault();
      props.resetPagination();
      props.clearRecipes();
      props.searchRecipes(process(receta));
      setReceta("");
    }}>
      <input className="barra" type="text" placeholder="Recipe" value={receta} onChange={event => setReceta(event.target.value)} />
      <input className="boton" type="submit" value="Search" data-testid="search-button" ></input>
    </SearchForm>)
};

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: recipe => dispatch(searchRecipes(recipe)),
    clearRecipes: recipe => dispatch(clearRecipes(recipe)),
    resetPagination: pages => dispatch(resetPagination(pages))
  };
}

export default connect(null, mapDispatchToProps)(NavBar);
