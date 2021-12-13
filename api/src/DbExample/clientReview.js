// professionalId= 1,2,3,6,13

const userReview = [
  {
    score: "4",
    comment: "Nice job",
    UserId: 7,
    ProfessionalId: 1,
    ProfessionalOfferId: 1,
  },
  {
    score: "2",
    comment: "No good",
    UserId: 8,
    ProfessionalId: 1,
    ProfessionalOfferId: 2,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 4,
    ProfessionalId: 4,
    ProfessionalOfferId: 3,
  },
  {
    score: "1",
    comment: "No good",
    UserId: 8,
    ProfessionalId: 4,
    ProfessionalOfferId: 4,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 20,
    ProfessionalId: 5,
    ProfessionalOfferId: 5,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 15,
    ProfessionalId: 2,
    ProfessionalOfferId: 6,
  },
  {
    score: "2",
    comment: "No good",
    UserId: 9,
    ProfessionalId: 2,
    ProfessionalOfferId: 7,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 8,
    ProfessionalId: 3,
    ProfessionalOfferId: 8,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 11,
    ProfessionalId: 3,
    ProfessionalOfferId: 9,
  },
  {
    score: "1",
    comment: "No good",
    UserId: 12,
    ProfessionalId: 5,
    ProfessionalOfferId: 10,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 14,
    ProfessionalId: 10,
    ProfessionalOfferId: 11,
  },
  {
    score: "4",
    comment: "Nice job",
    UserId: 19,
    ProfessionalId: 45,
    ProfessionalOfferId: 12,
  },
];

const reviewMap = userReview.map((el) => {
  return {
    score: el.score,
    comment: el.comment,
    UserId: el.UserId,
    ProfessionalId: el.ProfessionalId,
    ProfessionalOfferId: el.ProfessionalOfferId,
  };
});

module.exports = { reviewMap };
