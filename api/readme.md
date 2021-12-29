# PG-servIO


## Rutas back
    Las presentes rutas se utilizan en la ruta http://localhost:3001/ + ruta de subtitulo + Path , por ejemplo en /user para acceder a path 
    de obtener a todos los profesionales se le agrega /professionals, 
    teniendo como ruta final:

    http://localhost:3001/user/professionals


## /user:

__Path '/'__  __(* Input opcional)__
- Funcionalidad : Crea usuario nuevo
- Tipo : POST
- input:  firstName, lastName, email, phone*, city, state, photo*,dni, password, verified*, professional,certification_name,certification_img, status, profession. 
- Output : You are now registered, 'Usuario creado' please log in
- Ruta: http://localhost:3001/user/

__Path '/login'__  
- Funcionalidad : Inicia Sesion Usuario
- Tipo : POST
- input: email, password.
- Output : Objeto con mensaje 'logged', cookies y tipo de usuario (cliente/professional)
- Ruta: http://localhost:3001/user/login

__Path '/logout'__  
- Funcionalidad : Cierra Sesion Usuario
- Tipo : POST
- Output : Objeto con mensaje 'logged', cookies y tipo de usuario (cliente/professional)
- Ruta: http://localhost:3001/user/logout

__Path '/logged'__  
- Funcionalidad : Analiza status del usuario (Si se encuentra loggeado o no)
- Tipo : GET
- Output : Booleano True/False en el que True es que el usuario esta loggeado y False es en que no se encuentra loggeado.
- Ruta: http://localhost:3001/user/logged

__Path '/perfil'__  
- Funcionalidad : Obtiene la informacion del usuario que se encuentra loggeado.
- Tipo : GET
- Output : Objeto con toda la informacion del usuario loggeado.
- Ruta: http://localhost:3001/user/perfil

__Path '/all'__  
- Funcionalidad : Obtiene a todos los usuarios registrados.
- Tipo : GET
- Output : Objeto con todos los usuarios registrados.
- Ruta: http://localhost:3001/user/all

__Path '/common'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo commun.
- Tipo : GET
- Output : Array con todos los usuarios de tipo comun.
- Ruta: http://localhost:3001/user/common

__Path '/professionals'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo professional.
- Tipo : GET
- Output : Array con todos los usuarios de tipo professional.
- Ruta: http://localhost:3001/user/professionals

__Path '/:id'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo professional.
- Tipo : GET
- input: id.
- Output : Array con todos los usuarios de tipo professional.
- Ruta: http://localhost:3001/user/:id

__Path '/auth/google/signUp'__
- Funcionalidad: Registra un usuario por medio de Google Auth.
- Tipo : GET
- Output : Redirecciona a http://localhost:3000/login
- Ruta : http://localhost:3001/user/auth/google/signUp

__Path '/auth/google/login'__
- Funcionalidad : Inicia sesión a usuario registrado con Goggle Auth
- Tipo : GET
- Output : Redirecciona a http://localhost:3000
- Ruta : http://localhost:3001/user/auth/google/login

__Path '/getGoogleUser'__
- Funcionalidad : Devuelve los datos de usuario logueado con Google Auth.
- Tipo : POST
- Output : Array con los datos del usuario.
- Ruta : http://localhost:3001/user/getGoogleUser

## /clientNeeds:

__Path '/'__  
- Funcionalidad : Crea una necesidad especifica de cliente
- Tipo : POST
- input: name, description, location , price, duration, guarantee_time. 
- Output : Array con informacion del usuario que realiza la solicitud y detalles de dicha oferta.
- Ruta: http://localhost:3001/clientNeeds/

__Path '/all'__  
- Funcionalidad : Obtiene todas las necesidades creadas por los clientes
- Tipo : GET
- Output : Array con todas las necesidades del cliente.
- Ruta: http://localhost:3001/clientNeeds/all

## /professsionalOffer:

__Path '/'__  
- Funcionalidad : Crea una oferta por parte de un profesional a la necesidad de un cliente.
- Tipo : POST
- input: description, price, duration, materials, guarantee_time, ClientNeedId. 
- Output : Objeto con detalles de la oferta
- Ruta: http://localhost:3001/professsionalOffer/

__Path '/all'__  
- Funcionalidad : Obtiene todas las ofertas creadas por los profesionales
- Tipo : GET
- Output : Array con todas las necesiofertas de los profesionales.
- Ruta: http://localhost:3001/professsionalOffer/all

__Path '/receivedOffers'__  
- Funcionalidad : Obtiene todas las ofertas creadas por los profesionales
- Tipo : GET
- Output : Array con todas las ofertas recibidas en las necesidad del cliente que se encuentra loggeado.
- Ruta: http://localhost:3001/professsionalOffer/receivedOffers

## /professionals:

__Path '/?name='__  
- Funcionalidad : Crea una necesidad especifica de cliente
- Tipo : POST
- input:  firstName. 
- Output : Array con todos los usuarios que coincidan con la solicitud.
- Ruta: http://localhost:3001/professionals?name=


## /professions:

__Path '/all'__  
- Funcionalidad : Devuelve todas las profesiones
- Tipo : GET
- Output : Array de objetos con todos los detalles de las profesiones.
- Ruta: http://localhost:3001/professions/all

__Path '/name'__  
- Funcionalidad : Devuelve todos los nombres de las professiones
- Tipo : GET
- Output : Array de objetos los nombres de todas las profesiones.
- Ruta: http://localhost:3001/professions/name


## /reviews:

__Path '/all'__  (EN DESARROLLO)
- Funcionalidad : Devuelve todas las reviews existentes
- Tipo : GET
- Output : Array de objetos con todos los detalles de las reviews.
- Ruta: http://localhost:3001/reviews/all

__Path '/'__  (EN DESARROLLO)
- Funcionalidad : Crea una nueva review basado en un servicio.
- Tipo : POST
- input : serviceId
- Output : Objeto con detalles de revies elaborada
- Ruta: http://localhost:3001/reviews/

__Path '/:id'__  (EN DESARROLLO)
- Funcionalidad : Devuelve la todas las reviews hechas a un Professional basado en su ID
- input: ProfessionalId
- Tipo : GET
- Output : Array de objetos con todos los detalles de las profesiones.
- Ruta: http://localhost:3001/reviews/:id

## /TecnicalsActivities:

__Path '/UserByActivityName'__  
- Funcionalidad : Devuelve la todas los usuarios de tipo profesional que tengan entre sus actividades un nombre parecido al que se recibe como parametro.
- input: nombre
- Tipo : GET
- Output : Array de objetos con todos los detalles de las profesionales que coincidan con la busqueda.
- Ruta: http://localhost:3001/TecnicalsActivities/UserByActivityName

__Path '/all'__  
- Funcionalidad : Devuelve la todas las actividades tecnicas especificas de todos los profesionales.
- Tipo : GET
- Output : Array de objetos con todos los detalles de las actividades especificas del profesional.
- Ruta: http://localhost:3001/TecnicalsActivities/all

__Path '/ActivityByActivityName'__  
- Funcionalidad : Devuelve la todas las actividades que tengan un nombre parecido al que se recibe como parametro.
- input: nombre
- Tipo : GET
- Output : Array de objetos con todos los detalles de las actividades.
- Ruta: http://localhost:3001/TecnicalsActivities/ActivityByActivityName

__Path '/'__  
- Funcionalidad : Agregar una nueva actividad especifica a un profesional.
- Tipo : POST
- Output : Array con objeto con detalles del professional.
- Ruta: http://localhost:3001/TecnicalsActivities/

## /Transactions:

__Path '/all'__  (EN DESARROLLO)
- Funcionalidad : Devuelve la todas las transacciones hechas.
- Tipo : GET
- Output :
- Ruta: http://localhost:3001/Transactions/all

__Path '/'__ (EN DESARROLLO) 
- Funcionalidad : Agregar una nueva Transaccion.
- Tipo : POST
- Output : 
- Ruta: http://localhost:3001/Transactions/
