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
]
// albañil',
//                                 'electricista',
//                                 'tapicero',
//                                 'pintor',
//                                 'plomero',
//                                 'gasista',
//                                 'sastre',
//                                 'soldador',
//                                 'niñera',
//                                 'cuidadosMayores'
const professionsMap = professions.map(el => {
    return {name: el.name}
})

// console.log("Professions: ", professionsMap);

module.exports = {professionsMap}