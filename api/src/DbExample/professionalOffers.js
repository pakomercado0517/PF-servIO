const offers=[
  {
    description: 'Destapar cañería',
    price: 300,
    duration: 60,
    materials: false,
    guarantee_time: 30,
    professionalId: 1
  },
  {
    description: 'Destapar cañería',
    price: 300,
    duration: 60,
    materials: false,
    guarantee_time: 30,
    professionalId: 1
  },
  {
    description: 'Destapar cañería',
    price: 300,
    duration: 60,
    materials: false,
    guarantee_time: 30,
    professionalId: 4
  },
  {
    description: 'Destapar cañería',
    price: 300,
    duration: 60,
    materials: false,
    guarantee_time: 30,
    professionalId: 4
  },
  {
    description: 'Cambiar llave de agua',
    price: 150,
    duration: 30,
    materials: true,
    guarantee_time: 30,
    professionalId: 5
  },
  {
    description: 'Cortado y lijado de tablas',
    price: 40,
    duration: 40,
    materials: true, 
    guarantee_time: 30,
    professionalId: 2
  },
  {
    description: 'Barnizado a tablas (precio por pieza)',
    price: 50,
    duration: 120,
    materials: true,
    guarantee_time: 30,
    professionalId: 2
  },
  {
    description: 'Armado de zapatas para colado',
    price: 80,
    duration: 30,
    materials: false,
    guarantee_time: 0,
    professionalId: 3
  },
  {
    description: 'Colado de losa precio por m3',
    price: 250,
    duration: 00,
    materials: false,
    guarantee_time: 0,
    professionalId: 3
  },
  {
    description: 'Colado de losa precio por m3',
    price: 250,
    duration: 00,
    materials: false,
    guarantee_time: 0,
    professionalId: 5
  },
]

const offerMap= offers.map(el => {
  return {
    description: el.description,
    price: el.price,
    duration: el.duration,
    materials: el.materials,
    guarantee_time: el.guarantee_time,ProfessionalId: el.professionalId
  }
})

module.exports ={offerMap}