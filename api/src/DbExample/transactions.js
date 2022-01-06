const transactions = [
  {
    UserId: 50,
    ProfessionalId: 1,
    ClientNeedId: 1,
    ProfessionalOfferId: 1,
    data: [
      {
        algo: "stringgg"
      }
    ],
  },
  {
    UserId: 63,
    ProfessionalId: 4,
    ClientNeedId: 2,
    ProfessionalOfferId: 4,
    data: [
      {
        algo: "stringgg"
      }
    ],
  },
  {
    UserId: 90,
    ProfessionalId: 43,
    ClientNeedId: 5,
    ProfessionalOfferId: 4,
    data: [
      {
        algo: "stringgg"
      }
    ],
  },
  {
    UserId: 52,
    ProfessionalId: 12,
    ClientNeedId: 16,
    ProfessionalOfferId: 10,
    data: [
      {
        algo: "stringgg"
      }
    ],
  },
  {
    UserId: 67,
    ProfessionalId: 40,
    ClientNeedId: 8,
    ProfessionalOfferId: 8,
    data: [
      {
        algo: "stringgg"
      }
    ],
  },
];

const transMap = transactions.map((el) => {
  return {
    UserId: el.UserId,
    ProfessionalId: el.ProfessionalId,
    ClientNeedId: el.ClientNeedId,
    ProfessionalOfferId: el.ProfessionalOfferId,
    data: el.data
  };
});

module.exports = { transMap };
