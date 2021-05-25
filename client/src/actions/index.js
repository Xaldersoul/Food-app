export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const SET_PAGE = "SET_PAGE";
export const GET_PAGES = "GET_PAGES";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const SORTING_RECIPES = "SORTING_RECIPES";
export const RESET_PAGINATION = "RESET_PAGINATION";


export function getRecipes() {
    return function (dispatch) {
        return fetch("http://localhost:3001/recipes/all")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_RECIPES, payload: json });
            });
    };
}

export function getRecipeDetail(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/recipes/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_RECIPE_DETAIL, payload: json });
            });
    };
}

export function searchRecipes(name) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/recipes?name=${name}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: SEARCH_RECIPES, payload: json });
            });
    };
}

export function clearRecipes() {
    return function (dispatch) {
        return dispatch({ type: CLEAR_RECIPES })
    }
}

export function getDiets() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/types`)
            .then(el => el.json())
            .then(json => {
                dispatch({ type: GET_DIETS, payload: json });
            });
    }
}

export function setPage(num) {
    return function (dispatch) {
        return dispatch({ type: SET_PAGE, payload: num })
    }
}

export function getPages(total) {
    return function (dispatch) {
        return dispatch({ type: GET_PAGES, payload: total })
    }
}

export function filterRecipes(recipes) {
    return async function (dispatch) {
        return dispatch({ type: FILTER_RECIPES, payload: recipes })
    }
}

export function sortingRecipes(recipes) {
    return async function (dispatch) {
        return dispatch({ type: SORTING_RECIPES, payload: recipes })
    }
}

export function resetPagination() {
    return function (dispatch) {
        return dispatch({ type: RESET_PAGINATION })
    }
}

export function getRecipeDetailDB(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/recipes/db/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_RECIPE_DETAIL, payload: json });
            });
    };
}
