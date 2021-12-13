const transactions = [
  {
    UserId: 50,
    ProfessionalId: 1,
    ClientNeedId: 1,
    ProfessionalOfferId: 1,
  },
  {
    UserId: 63,
    ProfessionalId: 4,
    ClientNeedId: 2,
    ProfessionalOfferId: 4,
  },
  {
    UserId: 90,
    ProfessionalId: 43,
    ClientNeedId: 5,
    ProfessionalOfferId: 4,
  },
  {
    UserId: 52,
    ProfessionalId: 12,
    ClientNeedId: 16,
    ProfessionalOfferId: 10,
  },
  {
    UserId: 67,
    ProfessionalId: 40,
    ClientNeedId: 8,
    ProfessionalOfferId: 8,
  },
];

const transMap = transactions.map((el) => {
  return {
    UserId: el.UserId,
    ProfessionalId: el.ProfessionalId,
    ClientNeedId: el.ClientNeedId,
    ProfessionalOfferId: el.ProfessionalOfferId,
  };
});

module.exports = { transMap };
