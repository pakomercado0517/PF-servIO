const userNeed=[
  {
    name: 'Pintar casa',
    description: 'Pintar la casa completa',
    status: 'in offer',
    location: 'Buenos Aires, Argentina',
    userId: 8
  },
  {
    name: 'Pintar casa',
    description: 'Pintar la casa completa',
    status: 'in offer',
    location: 'Buenos Aires, Argentina',
    userId: 7
  },
  {
    name: 'Contacto de luz',
    description: 'Cambiar apagador de foco',
    status: 'in progress',
    location: 'Cancún, México',
    userId: 11
  },
  {
    name: 'Contacto de luz',
    description: 'Cambiar apagador de foco',
    status: 'in progress',
    location: 'Cancún, México',
    userId: 16
  },
  {
    name: 'Contacto de luz',
    description: 'Cambiar apagador de foco',
    status: 'in progress',
    location: 'Cancún, México',
    userId: 12
  },
  {
    name: 'Puertas de closet',
    description: 'Reparar y barnizar puertas de closet de madera.',
    status: 'in offer',
    location: 'Tapachula, México',
    userId: 14
  },
  {
    name: 'Puertas de closet',
    description: 'Reparar y barnizar puertas de closet de madera.',
    status: 'in offer',
    location: 'Tapachula, México',
    userId: 19
  },
  {
    name: 'Puertas de closet',
    description: 'Reparar y barnizar puertas de closet de madera.',
    status: 'in offer',
    location: 'Tapachula, México',
    userId: 17
  },
  {
    name: 'Puertas de closet',
    description: 'Reparar y barnizar puertas de closet de madera.',
    status: 'in offer',
    location: 'Tapachula, México',
    userId: 15
  },
]

const needMap= userNeed.map(el => {
  return {
    name: el.name,
    description: el.description,
    status: el.status,
    location: el.location,
    UserId: el.userId
  }
})

module.exports ={needMap}