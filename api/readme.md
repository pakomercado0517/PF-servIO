# PG-servIO


## Rutas back
    Las presentes rutas se utilizan en la ruta http://localhost:3001/ + ruta de subtitulo + Path , por ejemplo en /user para acceder a path 
    de obtener a todos los profesionales se le agrega /professionals, teniendo como ruta final:

    http://localhost:3001/user/professionals


## /user:

__Path '/'__  
- Funcionalidad : Crea usuario nuevo
- Tipo : POST
- input: userName, firstName, lastName, email, phone*, city, state, photo*,dniFront*, dniBack*, password, verified*, professional,certification_name,certification_img, status, profession. 
- Output : You are now registered, 'Usuario creado' please log in

__Path '/login'__  
- Funcionalidad : Inicia Sesion Usuario
- Tipo : POST
- Output : Objeto con mensaje 'logged', cookies y tipo de usuario (cliente/professional)

__Path '/logout'__  
- Funcionalidad : Cierra Sesion Usuario
- Tipo : POST
- Output : Objeto con mensaje 'logged', cookies y tipo de usuario (cliente/professional)

__Path '/logged'__  
- Funcionalidad : Analiza status del usuario (Si se encuentra loggeado o no)
- Tipo : GET
- Output : Booleano True/False en el que True es que el usuario esta loggeado y False es en que no se encuentra loggeado.

__Path '/perfil'__  
- Funcionalidad : Obtiene la informacion del usuario que se encuentra loggeado.
- Tipo : GET
- Output : Objeto con toda la informacion del usuario loggeado.

__Path '/all'__  
- Funcionalidad : Obtiene a todos los usuarios registrados.
- Tipo : GET
- Output : Objeto con todos los usuarios registrados.

__Path '/common'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo commun.
- Tipo : GET
- Output : Array con todos los usuarios de tipo comun.

__Path '/professionals'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo professional.
- Tipo : GET
- Output : Array con todos los usuarios de tipo professional.

__Path '/:id'__  
- Funcionalidad : Obtiene a todos los usuarios de tipo professional.
- Tipo : GET
- Output : Array con todos los usuarios de tipo professional.