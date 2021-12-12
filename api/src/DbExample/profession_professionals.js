const { Profession_Professional } = require("../db");

// Profession_Professional.bulkCreate([{ ProfessionalId: 20, ProfessionId: 13 }]);

const userProfessionMap = async () => {
  await Profession_Professional.bulkCreate([
    {
      ProfessionalId: 1,
      ProfessionId: 13,
    },
    {
      ProfessionalId: 2,
      ProfessionId: 2,
    },
    {
      ProfessionalId: 3,
      ProfessionId: 5,
    },
    {
      ProfessionalId: 3,
      ProfessionId: 2,
    },
    {
      ProfessionalId: 3,
      ProfessionId: 6,
    },
    {
      ProfessionalId: 4,
      ProfessionId: 6,
    },
    {
      ProfessionalId: 4,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 4,
      ProfessionId: 11,
    },
    {
      ProfessionalId: 4,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 5,
      ProfessionId: 7,
    },
    {
      ProfessionalId: 6,
      ProfessionId: 1,
    },
    {
      ProfessionalId: 7,
      ProfessionId: 11,
    },
    {
      ProfessionalId: 8,
      ProfessionId: 4,
    },
    {
      ProfessionalId: 9,
      ProfessionId: 5,
    },
    {
      ProfessionalId: 10,
      ProfessionId: 2,
    },
    {
      ProfessionalId: 10,
      ProfessionId: 5,
    },
    {
      ProfessionalId: 10,
      ProfessionId: 1,
    },
    {
      ProfessionalId: 11,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 12,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 13,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 14,
      ProfessionId: 9,
    },
    {
      ProfessionalId: 15,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 15,
      ProfessionId: 10,
    },
    {
      ProfessionalId: 15,
      ProfessionId: 9,
    },
    {
      ProfessionalId: 16,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 17,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 18,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 19,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 20,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 21,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 22,
      ProfessionId: 4,
    },
    {
      ProfessionalId: 23,
      ProfessionId: 4,
    },
    {
      ProfessionalId: 24,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 25,
      ProfessionId: 6,
    },
    {
      ProfessionalId: 26,
      ProfessionId: 7,
    },
    {
      ProfessionalId: 27,
      ProfessionId: 4,
    },
    {
      ProfessionalId: 28,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 29,
      ProfessionId: 7,
    },
    {
      ProfessionalId: 30,
      ProfessionId: 7,
    },
    {
      ProfessionalId: 31,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 32,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 33,
      ProfessionId: 5,
    },
    {
      ProfessionalId: 34,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 35,
      ProfessionId: 9,
    },
    {
      ProfessionalId: 36,
      ProfessionId: 10,
    },
    {
      ProfessionalId: 37,
      ProfessionId: 10,
    },
    {
      ProfessionalId: 38,
      ProfessionId: 11,
    },
    {
      ProfessionalId: 39,
      ProfessionId: 13,
    },
    {
      ProfessionalId: 40,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 41,
      ProfessionId: 12,
    },
    {
      ProfessionalId: 42,
      ProfessionId: 2,
    },
    {
      ProfessionalId: 43,
      ProfessionId: 1,
    },
    {
      ProfessionalId: 44,
      ProfessionId: 1,
    },
    {
      ProfessionalId: 45,
      ProfessionId: 1,
    },
    {
      ProfessionalId: 46,
      ProfessionId: 4,
    },
    {
      ProfessionalId: 47,
      ProfessionId: 3,
    },
    {
      ProfessionalId: 48,
      ProfessionId: 5,
    },
    {
      ProfessionalId: 49,
      ProfessionId: 8,
    },
    {
      ProfessionalId: 50,
      ProfessionId: 11,
    },
  ]);
};

module.exports = { userProfessionMap };
