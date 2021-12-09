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
]

const professionsMap = professions.map(el => {
    return {name: el.name}
})

// console.log("Professions: ", professionsMap);

module.exports = {professionsMap}