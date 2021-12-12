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

## /clientNeeds:

__Path '/'__  
- Funcionalidad : Crea una necesidad especifica de cliente
- Tipo : POST
- input: userName, firstName, lastName, email, phone*, city, state, photo*,dniFront*, dniBack*, password, verified*, professional,certification_name,certification_img, status, profession. 
- Output : You are now registered, 'Usuario creado' please log in
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
- Output : You are now registered, 'Usuario creado' please log in
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