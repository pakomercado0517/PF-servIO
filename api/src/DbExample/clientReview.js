// professionalId= 1,2,3,6,13

const userReview= [
  {
    score: "4",
    comment: 'Nice job',
    UserId: 7,
    ProfessionalId: 1,
  },
  {
    score: "2",
    comment: 'No good',
    UserId: 8,
    ProfessionalId: 3,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 4,
    ProfessionalId: 1,
  },
  {
    score: "1",
    comment: 'No good',
    UserId: 8,
    ProfessionalId: 2,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 20,
    ProfessionalId: 3,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 15,
    ProfessionalId: 3,
  },
  {
    score: "2",
    comment: 'No good',
    UserId: 9,
    ProfessionalId: 4,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 8,
    ProfessionalId: 2,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 11,
    ProfessionalId: 1,
  },
  {
    score: "1",
    comment: 'No good',
    UserId: 12,
    ProfessionalId: 2,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 14,
    ProfessionalId: 5,
  },
  {
    score: "4",
    comment: 'Nice job',
    UserId: 19,
    ProfessionalId: 5,
  },
]

const reviewMap= userReview.map(el => {
  return {
    score: el.score,
    comment: el.comment,
    UserId: el.UserId,
    ProfessionalId: el.ProfessionalId
  }
})

module.exports ={reviewMap}