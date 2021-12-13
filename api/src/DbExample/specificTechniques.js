const tecs = [
  {
    name: "Preparar y servir desayuno",
    price: 100,
    photo: "url_qui",
    materials: false,
    guarantee_time: 60,
    description: "Preparar de desayunar a persona mayor y darselo de comer.",
    ProfessionalId: 1,
  },
  {
    name: "Preparar y servir desayuno",
    price: 100,
    photo: "url_qui",
    materials: false,
    guarantee_time: 60,
    description: "Preparar de desayunar a persona mayor y darselo de comer.",
    ProfessionalId: 1,
  },
  {
    name: "Preparar y servir desayuno",
    price: 100,
    photo: "url_qui",
    materials: false,
    guarantee_time: 60,
    description: "Preparar de desayunar a persona mayor y darselo de comer.",
    ProfessionalId: 1,
  },
  {
    name: "Corte de tablas",
    price: 100,
    photo: "url_qui",
    materials: true,
    guarantee_time: 60,
    description: "Medición y corte de tablas a su necesidad.",
    ProfessionalId: 2,
  },
  {
    name: "Barnizado",
    price: 100,
    photo: "url_qui",
    materials: true,
    guarantee_time: 60,
    description: "Aplicación de barniz a madera",
    ProfessionalId: 2,
  },
  {
    name: "Comedor",
    price: 5000,
    photo: "url_qui",
    materials: true,
    guarantee_time: 60,
    description: "Creación de comedor para 4 personas.",
    ProfessionalId: 2,
  },
];

const tecsMap = tecs.map((el) => {
  return {
    name: el.name,
    price: el.price,
    photo: el.photo,
    materials: el.materials,
    guarantee_time: el.guarantee_time,
    description: el.description,
    ProfessionalId: el.ProfessionalId,
  };
});
module.exports = { tecsMap };
