import React from 'react';
import NavBar from '../navBar/index';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Pagination from "../pagination";
import Filter from "../filter";
import Sorting from "../sorting"
import { Route } from 'react-router-dom';

const Header = styled.div`
    position: fixed;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    top: 0;
    width: 100%;
    margin: 15 auto;
    background: rgb(40,40,40);
    span.active{
        text-decoration: none;
        background-color: palevioletred;
    }
  `
const ButtonNav = styled.span`
    background: transparent;
    font-size: 20px;
    display: inline-block;
    border-radius: 3px;
    color: palevioletred;
    height: 100%;
    padding: 0.25em 1em;
    transition: all 0.2s linear;
    &:hover{
        background: palevioletred;
        color: white;
      }
`;

const Searcher = styled.div`
  display: flex;
  flex-direction: row;
`;

function Nav() {

    return (
        <Header>
            <div>
                <NavLink to="/" activeClassName="active">
                    <ButtonNav>Start</ButtonNav>
                </NavLink>
                <NavLink to="/recipes" activeClassName="active">
                    <ButtonNav>Recipes</ButtonNav>
                </NavLink>
                <NavLink to="/recipes/form" activeClassName="active">
                    <ButtonNav>Create Recipe</ButtonNav>
                </NavLink>
            </div>
            <div>
                <Route exact path="/recipes" component={Pagination} />
            </div>
            <Searcher>
                <Route exact path="/recipes" component={Sorting} />
                <Route exact path="/recipes" component={Filter} />
                <Route exact path="/recipes" component={NavBar} />
            </Searcher>
        </Header >
    );
};

export default Nav;