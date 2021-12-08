const professions = [{
    "1": {
        "id": 1,
        "Profession": "pintor",
    },
    "2": {
        "id": 2,
        "Profession": "carpintero",
    },
    "3": {
        "id": 3,
        "Profession": "albañil",
    },
    "4": {
        "id": 4,
        "Profession": "Electricista",
    },
    "5": {
        "id": 5,
        "Profession": "Plomero",
    },
    "6": {
        "id": 6,
        "Profession": "Herrero",
    },
    "7": {
        "id": 7,
        "Profession": "Cerrajero",
    },
}]

const professionsMap = professions.map(profession => ({
    id: profession.id,
    Profession: profession.Profession,
}));

// console.log("Professions: ", professionsMap);