import React from 'react';
import s from './styles/Nosotros.module.css';
import img1 from '../img/nosotros1.svg';
import img2 from '../img/nosotros2.svg';
import img3 from '../img/preguntas.svg';
// import FiChevronDown from 'react-icons/fa';
import Footer from '../components/Footer';

export default function nosotros() {


    return (
        
        <div>
            <div className={s.conteiner}>
                <div className={s.conteiner_titulo}>
                    <h2>¿Que hacemos en ServIO? </h2>
                    <p className='animate__animated animate__backInRight'>Basado en la necesidad de evolucionar la forma en que se realizan las 
                        operaciones de contratación , a través de la plataforma Servio te 
                        facilitamos la tarea de buscar profesionales en diferentes rubros, 
                        como ser plomeros, electricistas, personal doméstico, etc. Te brindamos 
                        las herramientas para contactarte con el profesional y coordinar el 
                        trabajo. Si eres profesional te brindamos la posibilidad de publicar tus 
                        servicios a través de nuestra plataforma para que posibles clientes puedan 
                        contratarte.</p>
                    <img src={img1} alt=""  className='animate__animated animate__backInLeft'/>
                </div>
                <div className={s.conteiner_titulo_2}>
                    <h3>¿Cómo funciona ServIO  para los usuarios?</h3>
                    <p>Describes tu proyecto o necesidad de reparación. Comparas los perfiles
                        profesionales propuestos. Conversas los perfiles profesionales
                        propuestos. Calificas el trabajo realizado, aportando así a la comunidad.
                        Encontrar fácil y rápidamente al profesional adecuado. Evitar riesgos 
                        asociados con permitir el ingreso de personas desconocidas al hogar.
                        Pagar un precio justo, sin sorpresas ni sobre costos.</p>
                        <img src={img2} alt="" className='animate__animated animate__bounceIn animate__delay-2s' />
                </div>
                <div className={s.conteiner_preguntas}>
                    <h3>Preguntas Frecuentes</h3>
                    <img src={img3} alt="" className="animate__animated animate__zoomInDown animate__delay-4s" />
                    
                </div>
                <div className={s.conteiner_deslizable_container}>  
                <div className={s.conteiner_deslizable}>
                    <h5>¿Tiene algún costo el uso de  la plataforma?</h5>
                    <button>V</button>
                    <p>No. Es totalmente gratuito. Sólo cobramos un 
                        pequeño valor a los profesionales que se comuniquen 
                        contigo, por lo que te pedimrofeios que inicies proyectos 
                        solo si tienes la intención de contratar. Si tan sólo deseas 
                        conocer un aproximado de costos, puedes encontrar el valor 
                        de muchos servicios a través de nuestro buscador, o en el 
                        perfil de cada profesional!.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Cual es la ventaja de usar Servio.com?</h5>
                    <button>V</button>
                    <p>A diferencia de otras opciones para hallar profesionales, 
                        en  Servio.com: Eliges una categoría, sigues los pasos y en 
                        pocas horas, recibirás hasta 5 respuestas entre las cuales 
                        comparar y contratar. Esta es la forma más elegida por los 
                        usuarios.Desde el buscador, escribes el nombre de la especialidad 
                        o profesional que te interesa, y te pones en contacto directo.
                        Navegas el directorio, comparas perfiles y eliges a los que te resulten 
                        más adecuados.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Qué información debería proveer?</h5>
                    <button>V</button>
                    <p>La mayor cantidad posible. El proyecto que tienes en mente, 
                        medidas, estado del lugar donde se hará el trabajo, ubicación, 
                        si proveerás los materiales, etcétera. 
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Cuántos presupuestos recibiré?</h5>
                    <button>V</button>
                    <p>Recibirás en tu casilla de correo hasta un máximo de 5 y 
                        apuntamos a que no sean menos de 2. Mientras más detallada sea 
                        tu consulta, más respuestas recibirás. Mismo si incluyes tu 
                        número de teléfono.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Puedo confiar en los profesionales de la plataforma?</h5>
                    <button>V</button>
                    <p>Mientras más detallada sea tu consulta, más respuestas recibirás Todos 
                        los profesionales son chequeados previo a su ingreso a la plataforma. 
                        Una vez aceptados para formar parte, pueden mejorar su reputación y de las 
                        calificaciones que van obteniendo, trabajo a trabajo. Creemos que sólo los 
                        Mejores Profesionales pueden proveer las Mejores Soluciones, y por ello hacemos
                        mucho hincapié en su confiabilidad.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Mis datos son privados?</h5>
                    <button>V</button>
                    <p>Valoramos tu privacidad y por ello, sólo los proveedores que te contesten 
                        tendrán acceso a tu email y teléfono. Nadie más.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿A quién debo abonarle?</h5>
                    <button>V</button>
                    <p>Directamente al profesional. No cobramos ninguna comisión ni costo extra.</p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Es importante calificar?</h5>
                    <button>V</button>
                    <p>Sí, el acto de calificar es una de las herramientas más poderosas para conseguir 
                        la transparencia que tanto buscamos. Toda vez que contrates, no olvides compartir 
                        tu experiencia.
                    </p>
                </div>
                <div className={s.conteiner_deslizable}>
                    <h5>¿Dónde puedo ver precios de referencia?</h5>
                    <button>V</button>
                    <p>Puedes encontrar el precio de los principales servicios a través del buscador o en el 
                        perfil de cada profesional. Cada 3 meses hacemos un relevamiento entre nuestros 
                        profesionales para hallar un verdadero precio de mercado, sin perder de vista que cada 
                        trabajo tiene requisitos particulares. Los precios no son vinculantes sino más bien 
                        orientativos, pero te servirán para ver si están dentro de tu presupuesto antes de generar 
                        una consulta.
                    </p>
                </div>
                </div>  
            </div>
            
            <Footer/>
        </div>
    )
}

