import React from 'react';
import Nav from '../nav';
import Recipes from '../recipes';
import RecipeInfo from "../recipeInfo"
import Form from "../form/index"
import { Route } from 'react-router-dom';

const Principal = () => {
    return (
        <div>
            <Route path="/recipes" component={Nav} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipes/info/:id" component={RecipeInfo} />
            <Route path="/recipes/form" component={Form} />
        </div>
    )
}

export default Principal
