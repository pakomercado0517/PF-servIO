const professions = [
    {
        name: "Pintor",
    },
    {
        name: "Carpintero",
    },
    {
        name: "Albañil",
    },
    {
        name: "Electricista",
    },
    {
        name: "Plomero",
    },
    {
        name: "Herrero",
    },
    {
        name: "Cerrajero",
    },
    {
        name: "Tapicero",
    },
    {
        name: "Gasista",
    },
    {
        name: "Sastre",
    },
    {
        name: "Soldador",
    },
    {
        name: "Niñera",
    },
    {
        name: "Cuidados mayores", 
    },
]

const professionsMap = professions.map(el => {
    return {name: el.name}
})

// console.log("Professions: ", professionsMap);

module.exports = {professionsMap}