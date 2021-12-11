import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './styles/Register.module.css'
// import logo from '../img/ServIO.svg'
import { useDispatch } from 'react-redux'
import { newUser } from '../redux/actions/index'

export default function Register(){
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    const [validaChek, setvalidaChek] = useState(false)

    const dispatch = useDispatch()
	
    return (
        <div className={s.container}>
            <div className={s.container_img}>
                <p>Se parte de nuestra plataforma registrate ya y disfruta!</p>  
            </div>
            <div className={s.container_registro}>
                <div className={s.conteiner_registro_titulo}>
                    <h2>Registro</h2>
                    {/* <img src={logo} alt="Logo"  />  */}
                </div>
                <div className={s.from}>
                    <Formik
                        initialValues={{
                            nombre: '',
                            apellido:'',
                            correo: '',
                            dni:'',
                            password:'',
                            repeatPassword:'',
                            profecional:'',
                            cliente:'',
                            pais:'',
                            carpintero:[''],
                            albañil:[''],
                            electricista:[''],
                            tapicero:[''],
                            pintor:[''],
                            plomero:[''],
                            gasista:[''],
                            sastre:[''],
                            soldador:[''],
                            niñera:[''],
                            cuidadosMayore:[''],



                        }}
                        
                        validate={(valores) => {
                            let errores = {};

                            //validacion nombre
                            if(!valores.nombre) {
                                errores.nombre = 'Por favor infresa un nombre'
                            }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                                errores.nombre= 'El nombre solo puede contener letras y espacios'
                            }

                            //validar apellido 
                            if(!valores.apellido) {
                                errores.apellido = 'Por favor infresa un apellido'
                            }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)){
                                errores.apellido= 'El nombre solo puede contener letras y espacios'
                            }

                            //validacion correo
                            if(!valores.correo) {
                                errores.correo = 'Por favor infresa un correo electronico'
                            }else if(! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                                errores.correo= 'El correo solo puede contener letras,numeros, puntos, guiones y guion bajo'
                            }

                            //validacion DNI  /^[0-9]+$/  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
                            if(!valores.dni) {
                                errores.dni = 'Por favor infresa un DNI'
                            }else if(!/^[0-9]+$/.test(valores.dni)){
                                errores.dni= 'El DNI solo puede contener numeros'
                            }

                            //validacion password
                            if(!valores.password) {
                                errores.password = 'Por favor infresa una Password'
                            }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)){
                                errores.password= 'La password debe tener mínimo ocho caracteres, al menos una letra y un número'
                            }

                            //validacion Repeat-password
                            if(!(valores.password === valores.repeatPassword)) {
                                errores.repeatPassword = 'Por favor infresa una repeat Password'
                            }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.repeatPassword)){
                                errores.repeatPassword= 'La repeat password debe tener mínimo ocho caracteres, al menos una letra y un número:'
                            }

                            //profesional
                            if (!valores.profecional) {
                                setvalidaChek(false)
                                // console.log(validaChek)
                                // console.log(valores.profecional)

                            }else{
                                setvalidaChek(true)
                                // console.log(valores.profecional)
                            }

                            return errores;
                        }}

                        onSubmit={(valores, {resetForm}) => {
                            dispatch(newUser({
                                userName: valores.nombre, 
                                firstName: valores.nombre, 
                                lastName: valores.apellido, 
                                email: valores.correo, 
                                phone: 1568, 
                                city: valores.pais, 
                                state: "fssda", 
                                photo:"asdsa", 
                                dniFront:"sadsad", 
                                dniBack:"sadsd", 
                                password: valores.password,
                                password2: valores.password2,
                                verified: false,
                                professional: 'true',
                                certification_name: "fqwf",
                                certification_img:"wqfq",
                                status:"vip", 
                                profession:['carpintero',
                                'albañil',
                                'electricista',
                                'tapicero',
                                'pintor',
                                'plomero',
                                'gasista',
                                'sastre',
                                'soldador',
                                'niñera',
                                'cuidadosMayore']
                                // valores.sastre[0]+","+valores.pintor[0]+","+valores.soldador[0]+","+valores.niñera[0]+","+valores.cuidadosMayore[0]+","+valores.carpintero[0]+","+valores.tapicero[0]+","+valores.albañil[0]+","+valores.electricista[0]+","+valores.plomero[0]+","+valores.gasista[0]
                            }))
                            resetForm();
                            console.log('Formulario enviado');
                            console.log(valores);
                            cambiarFormularioEnviado(true);
                            setTimeout(() => cambiarFormularioEnviado(false), 3000);
                        }}
                    >
                        {( {errors} ) => (
                            <Form className={s.formulario}>
                                <div className={s.from_1_inLa1}>
                                    <Field
                                        type="text" 
                                        name="nombre" 
                                    />
                                    <label htmlFor="nombre">Nombre</label>
                                    <ErrorMessage   name="nombre" component={() => (<div className={s.error}>{errors.nombre}</div>)} />
                                </div>
                                <div className={s.from_1_inLa2}>
                                    <Field
                                        type="text" 
                                        name="apellido" 
                                    />
                                    <label htmlFor="apellido">Apellido</label>
                                    <ErrorMessage name="apellido" component={() => (<div className={s.error}>{errors.correo}</div>)} />
                                </div>
                                <div className={s.from_1_inLa3}>
                                    <Field
                                        type="email" 
                                        name="correo" 
                                    />
                                    <label htmlFor="correo">Correo</label>
                                    <ErrorMessage name="correo" component={() => (<div className={s.error}>{errors.correo}</div>)} />
                                </div>
                                <div className={s.from_1_inLa4}>
                                    <Field
                                        type="text" 
                                        name='dni'				
                                    />
                                    <label htmlFor="dni">DNI</label>
                                    <ErrorMessage name="dni" component={() => (<div className={s.error}>{errors.dni}</div>)} />
                                    
                                </div>
                                <div className={s.from_1_inLa5}>
                                    <Field
                                        type="password" 
                                        name='password'				
                                    />
                                    <label htmlFor="password">Password</label>
                                    <ErrorMessage name="password" component={() => (<div className={s.error}>{errors.password}</div>)} />
                                </div>
                                <div className={s.from_1_inLa6}>
                                    <Field
                                        type="password" 
                                        name='repeatPassword'				
                                    />
                                    <label htmlFor="repeatPassword">Repeat-Password</label>
                                    <ErrorMessage name="repeatPassword" component={() => (<div className={s.error}>{errors.repeatPassword}</div>)} />
                                </div>
                                <div className={s.from_1_inLa7}>
                                    <Field name="pais" as="select">
                                        <option value="mdp">Mar del Plata, Bs As, Argentina</option>
                                        <option value="rosario">Rosario, Sanata Fe, Argentina</option>
                                        <option value="cordoba">Cordoba, Argentina</option>
                                    </Field>
                                </div>
                                <div className={s.from_1_inLa8}>
                                    <Field
                                        type="checkbox" 
                                        name='profecional'
                                        value='profecional'				
                                    />
                                    <label htmlFor='profecional'>Profesional</label>
                                </div>
                                <div className={s.from_1_inLa9}>
                                    <Field
                                        type="checkbox" 
                                        name='cliente'				
                                    />
                                    <label htmlFor="profecional">Cliente</label>
                                </div>
                                
                            {!validaChek ? <></>: (
                                    <div className={s.from_1_inLa10}>
                                        
                                            <Field
                                                type="checkbox" 
                                                name='Carpintero'
                                                value='carpintero'				
                                            />
                                            <label htmlFor="">Carpintero</label>
                                            <Field
                                                type="checkbox" 
                                                name='Albañil'	
                                                value='albañil'			
                                            />
                                            <label htmlFor="">Albañil</label>
                                            <Field
                                                type="checkbox" 
                                                name='Electricista'	
                                                value='electricista'			
                                            />
                                            <label htmlFor="">Electricista</label>
                                            <Field
                                                type="checkbox" 
                                                name='aapicero'	
                                                value='tapicero'			
                                            />
                                            <label htmlFor="">Tapicero</label>
                                            <Field
                                                type="checkbox" 
                                                name='pintor'
                                                value='pintor'					
                                            />
                                            <label htmlFor="">Pintor</label>
                                            <Field
                                                type="checkbox" 
                                                name='plomero '		
                                                value='plomero '		
                                            />
                                            <label htmlFor="">Plomero </label>
                                            <Field
                                                type="checkbox" 
                                                name='gasista'
                                                value='gasista '					
                                            />
                                            <label htmlFor="">Gasista</label>
                                            <Field
                                                type="checkbox" 
                                                name='sastre'	
                                                value='sastre'			
                                            />
                                            <label htmlFor="">Sastre</label>
                                            <Field
                                                type="checkbox" 
                                                name='soldador'
                                                value='soldador'				
                                            />
                                            <label htmlFor="">Soldador </label>
                                            <Field
                                                type="checkbox" 
                                                name='Niñera'	
                                                value='niñera'		
                                            />
                                            <label htmlFor="">Niñera</label>
                                            <Field
                                                type="checkbox" 
                                                name='cuidadosMayores'	
                                                valores='cuidadosMayores'			
                                            />
                                            <label htmlFor="">Cuidados de mayores</label>
                                        
                                    </div>)
                                }

                                <button type="submit" className={s.from_1_btn}>Enviar</button>
                                {formularioEnviado && <p className={s.from_1_exito}>Formulario enviado con exito!</p>}
                            </Form>
                        )}
                        
                    </Formik>
		          </div>
            </div>
        </div>

    
	);
}