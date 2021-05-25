import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { setPage, getPages, clearRecipes } from "../../actions/index";
import PageButton from "../pageButton"
import styled from 'styled-components';

const PaginationDiv = styled.div`
  display: flex;
  flex-direction: row;
`;



const Pagination = (props) => {
    useEffect(() => {
        if (props.recetas.length) {
            props.getPages(Math.ceil(props.recetas.length / props.recetasPorPagina))
        }
    }, [props.recetas]);

    const pages = [...Array(props.paginasTotales).keys()].map(el => el + 1);

    return (
        <PaginationDiv>
            {pages !== null ? pages.map(num => <PageButton key={num} num={num} />) : null}
        </PaginationDiv>
    )
}

function mapStateToProps(state) {
    return {
        recetas: state.recetas,
        recetasPorPagina: state.recetasPorPagina,
        paginasTotales: state.paginasTotales
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPage: page => dispatch(setPage(page)),
        getPages: totalPages => dispatch(getPages(totalPages)),
        clearRecipes: recipe => dispatch(clearRecipes(recipe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
