const tecs = [
  {
    name: "Preparar y servir desayuno",
    price: 100,
    photo: "url_qui",
    materials: true,
    guarantee: true,
    guarantee_time: 60,
    job_time: 1,
    description:
      "Preparo el desayuno que mas gustes, elaborado con los ingredientes que mas te gusten, y servido en un plato de tu preferencia.",
    ProfessionalId: 1,
  },
  {
    name: "Preparar y servir almuerzo",
    price: 100,
    photo: "url_qui",
    materials: false,
    guarantee: true,
    guarantee_time: 60,
    job_time: 1,
    description:
      "Preparo el almuerzo que mas gustes, elaborado con los ingredientes que mas te gusten, y servido en un plato de tu preferencia.",
    ProfessionalId: 1,
  },
  {
    name: "Preparar y servir cena",
    price: 100,
    photo: "url_qui",
    materials: false,
    guarantee: true,
    guarantee_time: 60,
    job_time: 1,
    description:
      "Preparo la cena que mas gustes, elaborado con los ingredientes que mas te gusten, y servido en un plato de tu preferencia.",
    ProfessionalId: 1,
  },
  {
    name: "Corte de tablas",
    price: 100,
    photo: "url_qui",
    materials: true,
    guarantee: true,
    guarantee_time: 60,
    job_time: 1,
    description:
      "Corto tablas de madera, para que no se rompan, y se puedan usar en cualquier lugar.",
    ProfessionalId: 2,
  },
  {
    name: "Barnizado",
    price: 100,
    photo: "url_qui",
    materials: true,
    guarantee: true,
    guarantee_time: 60,
    job_time: 1,
    description:
      "Barnizado de madera, para protejerla, y se puedan usar en cualquier lugar.",
    ProfessionalId: 2,
  },
  {
    name: "Mesa de trabajo",
    price: 5000,
    photo: "url_qui",
    materials: true,
    guarantee: true,
    guarantee_time: 60,
    job_time: 5,
    description:
      "Mesa de trabajo, para que no se rompa, y se puedan usar en cualquier lugar.",
    ProfessionalId: 2,
  },
];

const tecsMap = tecs.map((el) => {
  return {
    name: el.name,
    price: el.price,
    photo: el.photo,
    materials: el.materials,
    guarantee: el.guarantee,
    guarantee_time: el.guarantee_time,
    job_time: el.job_time,
    description: el.description,
    ProfessionalId: el.ProfessionalId,
    type: "general",
  };
});
module.exports = { tecsMap };
