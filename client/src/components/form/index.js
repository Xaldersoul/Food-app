import React, { useState, useEffect } from 'react';
import Diet from "../diet"
import { connect } from "react-redux";
import { getDiets } from "../../actions/index";
import styled from 'styled-components';

const InfoForm = styled.form`
  display: flex;
  background-color: rgb(40,40,40);
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 30%;
  padding: 2rem;
  color: white;
  border: solid 4px palevioletred;
    border-radius: 5px;
    .myLabel{
        display: block;
    }
    .danger{
        color: red;
    }
`;

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-top: 10%;
`;

function validate(input) {
    let errors = {};
    if (!input.title) {
        errors.title = 'Name is required';
    }

    if (!input.summary) {
        errors.summary = 'Description is required';
    }

    return errors;
};

function capitalize(string) {
    var respuesta = string.split(" ")
    respuesta = respuesta.map(el => {
        return el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
    })
    return respuesta.join(" ");
}

function Form(props) {
    const [formDiets, setFormDiets] = useState([]);
    const [input, setInput] = useState({ title: '', summary: '', spoonacularScore: 0, healthScore: 0, instructions: "", diets: [] });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validate(input))
        props.getDiets()
    }, []);

    const handleInputChange = function (e) {
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            var newRecipe = {
                ...input,
                spoonacularScore: parseInt(input.spoonacularScore),
                healthScore: parseInt(input.healthScore),
                title: capitalize(input.title)
            };
            console.log(newRecipe);
            fetch("http://localhost:3001/recipe", {
                method: "POST",
                body: JSON.stringify(newRecipe),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(el => el.json())
                .then(data => { console.log(data) })
                .catch(err => console.log(err));
            alert("Your recipes its succesfully created!");
            setInput({ title: '', summary: '', spoonacularScore: 0, healthScore: 0, instructions: "", diets: [] });
            setFormDiets([]);
            setErrors(validate(input));
        } else {
            alert("Complete the required spaces")
        }
    }

    const handleSelectChange = function (e) {
        var algo = input.diets.find(el => el === parseInt(e.target.value))
        if (!algo && e.target.value !== "0") {
            let data = input.diets;
            data.push(parseInt(e.target.value));
            setInput({ ...input, diets: data });
            data = [];
            input.diets.forEach(el => {
                data.push(props.dietas.find(dieta => dieta.id === el));
            });
            setFormDiets(data);
        }
    }

    return (
        <>
            <Title>Create your recipe</Title>
            <InfoForm onSubmit={handleSubmit}>
                <div>
                    <label>Recipe name:</label>
                    <input className={`${errors.title && 'danger'}`} type="text" name="title" value={input.title} onChange={handleInputChange} />
                    {errors.title && (<p className="danger">{errors.title}</p>)}
                </div>
                <div>
                    <label className="myLabel">Recipe description:</label>
                    <textarea className={`${errors.summary && 'danger'}`} name="summary" value={input.summary} onChange={handleInputChange} />
                    {errors.summary && (<p className="danger">{errors.summary}</p>)}
                </div>
                <ScoreDiv>
                    <div>
                        <label>Recipe score:</label>
                        <input className={`${errors.spoonacularScore && 'danger'}`} type="number" min="0" max="100" name="spoonacularScore" value={input.spoonacularScore} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Health score:</label>
                        <input className={`${errors.healthScore && 'danger'}`} type="number" name="healthScore" min="0" max="100" value={input.healthScore} onChange={handleInputChange} />
                    </div>
                </ScoreDiv>
                <div>
                    <label className="myLabel">Recipe instructions:</label>
                    <textarea className={`${errors.instructions && 'danger'}`} name="instructions" value={input.instructions} onChange={handleInputChange} />
                </div>
                <div>
                    <ScoreDiv>
                        {formDiets.map(el => <Diet key={el.id} name={el.name} />)}
                    </ScoreDiv>
                    <div>
                        <label>Select the diets:</label>
                        <select onChange={handleSelectChange} >
                            <option value="0" >none</option>
                            {props.dietas.map(el => <option value={el.id}>{el.name}</option>)}
                        </select>
                    </div>
                </div>
                <input type="submit" value="Submit" />
            </InfoForm>
        </>
    )
}

function mapStateToProps(state) {
    return {
        dietas: state.dietas
    };
}

export default connect(mapStateToProps, { getDiets })(Form);
