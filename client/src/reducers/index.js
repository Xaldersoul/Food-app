import { GET_RECIPES, GET_RECIPE_DETAIL, SEARCH_RECIPES, CLEAR_RECIPES, GET_DIETS, GET_PAGES, SET_PAGE, FILTER_RECIPES, SORTING_RECIPES, RESET_PAGINATION } from "../actions/index"

const initialState = {
    recetas: [],
    allRecetas: [],
    dietas: [],
    recipeDetail: {},
    pagina: 1,
    recetasPorPagina: 10,
    paginasTotales: 0
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_RECIPES) {
        return {
            ...state,
            recetas: action.payload,
            allRecetas: action.payload
        }
    }
    if (action.type === GET_RECIPE_DETAIL) {
        return {
            ...state,
            recipeDetail: action.payload
        }
    }
    if (action.type === SEARCH_RECIPES) {
        return {
            ...state,
            recetas: action.payload
        }
    }
    if (action.type === CLEAR_RECIPES) {
        return {
            ...state,
            recetas: []
        }
    }
    if (action.type === GET_DIETS) {
        return {
            ...state,
            dietas: action.payload
        }
    }
    if (action.type === GET_PAGES) {
        return {
            ...state,
            paginasTotales: action.payload
        }
    }
    if (action.type === SET_PAGE) {
        return {
            ...state,
            pagina: action.payload
        }
    }
    if (action.type === FILTER_RECIPES) {
        return {
            ...state,
            recetas: action.payload
        }
    }
    if (action.type === SORTING_RECIPES) {
        return {
            ...state,
            recetas: action.payload,
            allRecetas: action.payload
        }
    }
    if (action.type === RESET_PAGINATION) {
        return {
            ...state,
            pagina: 1,
            paginasTotales: 0
        }
    }
    return state;
};

export default rootReducer;