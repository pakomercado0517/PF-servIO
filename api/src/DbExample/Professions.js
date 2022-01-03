const professions = [
    {
        name: "pintor",
    },
    {
        name: "carpintero",
    },
    {
        name: "albañil",
    },
    {
        name: "electricista",
    },
    {
        name: "plomero",
    },
    {
        name: "herrero",
    },
    {
        name: "cerrajero",
    },
    {
        name: "tapicero",
    },
    {
        name: "gasista",
    },
    {
        name: "sastre",
    },
    {
        name: "soldador",
    },
    {
        name: "niñera",
    },
    {
        name: "cuidadosMayores", 
    },
]

const professionsMap = professions.map(el => {
    return {name: el.name}
})

// console.log("Professions: ", professionsMap);

module.exports = {professionsMap}