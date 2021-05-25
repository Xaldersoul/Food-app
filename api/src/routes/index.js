const { Router } = require('express');
const fetch = require("node-fetch");
const { Recipe, Diet } = require("../db");
const { URL_COMPLEXSEARCH, URL_RECIPES, URL_API_KEY } = require("../constants/constants");
const { route, name } = require('../app');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dietsData = ["gluten free", "ketogenic", "vegetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "pescetarian", "paleo", "primal", "whole30"]

router.use(async function (req, res, next) {
    await dietsData.forEach(el => {
        return Diet.findOrCreate({
            where: {
                name: el
            }
        })
    })
    next()
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async function (req, res) {
    try {
        var search = req.query.name;
        var i = 0;
        const dataAPI = await fetch(`${URL_COMPLEXSEARCH}${URL_API_KEY}&number=100&addRecipeInformation=true`).then(el => el.json())
        const dataDB = await Recipe.findAll({
            include: Diet
        })
        const concates = await dataDB.concat(dataAPI.results)
        var result = await concates.filter(el => {
            if (el.title.indexOf(search.toLowerCase()) > -1 && i < 9) {
                i++;
                return el;
            }
        })
        if (result.length) {
            return res.json(result)
        } else {
            return res.json(["no recipe found..."])
        }
    } catch (error) {
        res.send(err)
    }
})

router.get("/recipes/all", async function (req, res) {
    try {
        var recipeAPI = await fetch(`${URL_COMPLEXSEARCH}${URL_API_KEY}&number=100&addRecipeInformation=true`).then(el => el.json())
        var recipeDB = await Recipe.findAll({
            include: Diet
        })
        var result = await recipeDB.concat(recipeAPI.results)
        res.json(result)
        var recipeDB = null;
    } catch (error) {
        res.send("algo malo paso")
    }
})

router.get("/recipes/:id", (req, res) => {
    const id = req.params.id;
    fetch(`${URL_RECIPES(id)}${URL_API_KEY}`)
        .then(el => el.json())
        .then(data => {
            res.json(data)
        })
})

router.get("/recipes/db/:id", async function (req, res) {
    try {
        const id = req.params.id;
        var recipeDB = await Recipe.findOne({
            include: Diet,
            where: { id: id }
        })
        res.json(recipeDB)
    } catch (error) {
        res.send(error)
    }
})

router.get("/types", async function (req, res) {
    try {
        const diet = await Diet.findAll();
        res.json(diet)
    } catch (error) {
        res.status(500).send("Ocurrio un error al buscar")
    }
})

router.post("/recipe", async function (req, res) {
    console.log(req.body)
    try {
        const { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
        const receta = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions
        })
        const dietas = await Diet.findAll({
            where: { id: diets }
        })
        await receta.addDiets(dietas);
        return res.json(receta)
    } catch (error) {
        res.status(500).send("Ocurrio un error al crear la receta!")
    }
})

module.exports = router;