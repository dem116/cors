///back-api

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

//todos los personajes
app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        res.json(response.data.results);
    } catch (error) {
        res.status(404).json({ error: 'Error al obtener los personajes' });
    }
});

// personaje por nombre
app.get('/characters/:personajeName', async (req, res) => {
    const personajeName = req.params.personajeName;
    const url = `https://rickandmortyapi.com/api/character/?name=${personajeName}`;

    try {
        const response = await axios.get(url);
        const character = response.data.results[0]; 

        if (character) {
            const { name, status, species, gender, origin, image } = character;
            res.json({ name, status, species, gender, origin: origin.name, image });
        } 
    } catch (error) {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

app.listen(4000, () => {
    console.log('Escuchando en http://localhost:4000');
});
