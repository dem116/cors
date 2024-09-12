function getPersonajeInfo() {
    const personajeNameInput = document.getElementById('personajeName');
    const personajeInfo = document.getElementById('personajeInfo');

    const personajeName = personajeNameInput.value.toLowerCase();

    fetch(`http://localhost:4000/characters/${personajeName}`)
        .then(response => {
            if (!response.ok) { 
                throw new Error('Personaje no encontrado');
            }
            return response.json();
        })
        .then(character => {
            const { name, status, species, gender, origin, image } = character;

            personajeInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}"/>
                <p>Estatus: ${status}</p>
                <p>Especie: ${species}</p>
                <p>Género: ${gender}</p>
                <p>Origen: ${origin}</p>
            `;
        })
        .catch(error => {
            personajeInfo.innerHTML = `<p>${error.message}</p>`;
        });
}
