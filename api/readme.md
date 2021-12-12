# PG-servIO


## Resumen de Back
    



#### Tecnologías Propuestas:
- [ ] React
- [ ] Javascript con JSDoc
- [ ] Express
- [ ] Sequelize ORM
- [ ] PostgresSQL
- [ ] Framer Motion
- [ ] CSS Modules
- [ ] Redux

__FRONTEND__

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina landing__:  con:
- [ ] imagen descriptiva
- [ ] Breve introducción de la página con titulo y un subtitulo
- [ ] Sección ¿Cómo funciona?
- [ ] Sección de testimonios
- [ ] Button para getStarted
- [ ] Button para iniciar sesión
- [ ] Button para registrarse
- [ ] Button de about


__Ruta principal cliente (HOME)__: debe contener
- [ ] Filtro por categoria/profesion
- [ ] Filtro por ciudad
- [ ] Filtro profesión o por trabajo
- [ ] Filtro por calificación 
- [ ] Button/Opciones ordenado por precio
- [ ] Button para crear una necesidad especifica
- [ ] Button/icono del carrito
- [ ] Button para switchar a "Página Inicial de Profesional" (En caso se ser Técnico)
- [ ] Button Iniciar Sesión
- [ ] Button de menú donde sale: button Perfil, button Servicios y button Ajustes
- [ ] Input "SEARCH"


__Ruta formulario necesidad especifica__: debe contener un formulario __controlado__ con los siguientes campos
- [ ] Título del trabajo
- [ ] Localización
- [ ] Categoría o profesión
- [ ] Imágenes
- [ ] Descripción
- [ ] Técnico asignado (null o valor específico)
- [ ] Button crear publicación
- [ ] Button volver

__Ruta perfil del cliente__: debe contener
- [ ] Foto
- [ ] nombre
- [ ] Nickname
- [ ] calificación (OPCIONAL)
- [ ] Espacio de solicitudes abiertas
- [ ] Button detalles de solicitudes abiertas
- [ ] Telefono
- [ ] Email
- [ ] Localizacion
- [ ] Button volver
- [ ] Button Modificar perfil (Opcional)
 
__Ruta Perfil del Profesional__ : debe contener
- [ ] Imagen
- [ ] Calificación general
- [ ] Últimas reseñas
- [ ] Nombre completo
- [ ] Nickname
- [ ] Profesion / Profesiones
- [ ] Cards con sus servicios específicos
- [ ] Button para editar cards
- [ ] Button para crear/agregar card
- [ ] Button para editar Perfil (En caso de ver como tecnico)
- [ ] Button para solicitar un presupuesto (En caso de ver como cliente)
- [ ] Localización
- [ ] Email
- [ ] Teléfono

__Ruta principal Profesional (HOME)__: debe contener
- [ ] Filtro por categoría/profesión
- [ ] Filtro por ciudad
- [ ] Filtro profesión o por trabajo
- [ ] Filtro por calificación (OPCIONAL)

- [ ] Button para ser VIP (OPCIONAL)

- [ ] Button para switchar a "Página Inicial de Profesional"

- [ ] Button de menú donde sale: button Perfil, button Servicios, button Trabajos y button Ajustes

__Ruta acceso servicio VIP__: debe contener: (OPCIONAL NO REVISADO)
- [ ] Opciones de suscripción Vip por niveles, beneficios  y duración con su respectivo precio.
-[ ] Detalles de formas de pago.

__Ruta de oferta (Vista por profesionales)__: debe contener:
- [ ] Input de descripción: propuesta del técnico
- [ ] Input de precio (oferta del técnico)
- [ ] Input de "Incluye materiales": True o false
- [ ] Button "Enviar Oferta"

__Ruta de servicio PARTICULAR__: debe contener:
- [ ] Imagen del servicio
- [ ] Descripción
- [ ] Precio
- [ ] Garantía
- [ ] Duración de Garantía
- [ ] Info de si incluye o no materiales
- [ ] Button "Crear Actividad"
- [ ] Button "Agregar al carrito"
- [ ] Button "Editar"
- [ ] Button "Cancelar"

__Ruta LOG IN__: debe contener:
- [ ] Input email
- [ ] Input Password
- [ ] Button iniciar con Google
- [ ] Button "Registrarse"

__Ruta REGISTRARSE__: debe contener:
- [ ] Input Nickname
- [ ] Input Nombre 
- [ ] Input email
- [ ] Input password
- [ ] Input DNI
- [ ] Input telefono
- [ ] Input localizacion
- [ ] Input titulos (Opcional)
- [ ] Button (Registrarse)

__Ruta Reseñas__: debe contener:
- [ ] Foto del calificador
- [ ] Nombre el calificador
- [ ] Calificación
- [ ] Comentarios - Reseña
- [ ] Cantidad de reseñas
- [ ] Promedio de calificaciones
- [ ] Filtros de ordenamiento a las calificaiones

__Editar Perfil Profesional__: debe contener:
- [ ] Input Imagen
- [ ] Input Nombre completo
- [ ] Input Nickname
- [ ] Input Profesion / Profesiones
- [ ] Input Cards con sus servicios específicos
- [ ] Input Localización
- [ ] Input Email
- [ ] Input Teléfono
- [ ] Input Password

__Editar Perfil Cliente__: debe contener:
- [ ] Input Imagen
- [ ] Input Nombre completo
- [ ] Input Nickname
- [ ] Input Localización
- [ ] Input Email
- [ ] Input Teléfono
- [ ] Input Password

__Carrito__: debe contener:
- [ ] Espacio para mostrar los servicios dispuestos a ser comprados
- [ ] Button comprar

__Ruta información del equipo y pagina__: debe contener:
- [ ] Cards de Nosotros
- [ ] Tecnologías utilizadas

__Ruta calificar__: debe contener:
- [ ] Input voto 0 al 5
- [ ] Input comentario 
- [ ] Button Volver
- [ ] Button Enviar

__Ruta Historial de Servicios__: debe contener:
- [ ] Liste clickeable de actividades
- [ ] Detalles de la actividad
- [ ] Button para ver lista de ofertas (Clickeable)
- [ ] Button Volver
- [ ] Button Calificar ( al tecnico )
- [ ] Button Filtro por Status

__Ruta Detalles de oferta__: debe contener:
- [ ] Imagen Profesional
- [ ] Nickname de Profesional 
- [ ] Button ver perfil del profesional
- [ ] Descripcion de la oferta 
- [ ] Profesiones del profesional
- [ ] Calificacion promedio del profesional 
- [ ] Incluye materiales (True false)
- [ ] Precio
- [ ] Button Volver
- [ ] Button Descartar oferta 
- [ ] Button Agregar al carrito 
- [ ] Button Contratar

__Ruta Detalles de Solicitud de presupuesto__: debe contener:
- [ ] Titulo
- [ ] Imagen del cliente
- [ ] Nombre del cliente
- [ ] Button ir Perfil del cliente
- [ ] Localizacion
- [ ] Categoria / Profesion 
- [ ] Descripcion
- [ ] Imagenes
- [ ] Button Volver
- [ ] Button Ofertar

__Ruta Historial de Trabajos__: debe contener:
- [ ] Liste clickeable de actividades
- [ ] Detalles de la actividad
- [ ] Button Volver
- [ ] Button Calificar ( al tecnico )
- [ ] Button Filtro por Status
- [ ] Button para cambiar progreso del trabajo
