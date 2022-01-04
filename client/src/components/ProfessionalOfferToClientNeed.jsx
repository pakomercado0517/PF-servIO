import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailsClientNeed, newProfessionalOffer } from '../redux/actions/index'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import s from './styles/ProfessionalOfferToClientNeed.module.css'


export const ProfessionalOfferToClientNeed = (props) => {

    const navigate = useNavigate()
    const { detailsClientNeed } = useSelector((state) => state)
    const [professional, ] = useGlobalStorage("globalUser", "")
    // console.log(detailsClientNeed)

    const { idClientNeed } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetailsClientNeed(idClientNeed))
    }, [])

    let actualId = parseInt(window.location.pathname.slice(31))
    const [form, setform] = useState({
        description: "",
        price: "",
        duration: "",
        materials:"",
        guarantee_time: "",
        ClientNeedId: actualId,
        UserId: professional.id,
    })

    function onChangeForm(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const postNeed =  (e) =>{
        e.preventDefault()
        if (form.description === "" || form.price === "" || form.duration === "" || form.guarantee_time === "" || form.materials === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Por favor, rellená todos los campos',
            })
        } else {
            
        try {
            const offer = {
                description: form.description,
                price: parseInt(form.price),
                duration: parseInt(form.duration),
                materials: form.materials,
                guarantee_time: parseInt(form.guarantee_time),
                ClientNeedId: form.ClientNeedId,
                UserId: form.UserId,
                name: detailsClientNeed?.name
            }
            newProfessionalOffer(offer)
            Swal.fire({
                icon: 'success',
                title: 'Oferta enviada!',
                showConfirmButton: false,
                timer: 1500
            })

            navigate('/')
            
        } catch (error) {
            console.error(error)
        };
        };
    };
  //   function onReset(){
  //     setform({
  //       description: "",
  //       price: "",
  //       duration: "",
  //       materials:"",
  //       guarantee_time: "",
  //       ClientNeedId: clientNeed.id,
  //       // UserId: professional.id,
  //       UserId: 30,
  //     })

  // }
  //   function onSubmit(){

  //     if(!stateFilled){
  //         props.newProfessionalOffer(
  //             {
  //               description: form.description,
  //               price: form.price,
  //               duration: form.duration,
  //               materials: form.materials,
  //               guarantee_time: form.guarantee_time,
  //               ClientNeedId: form.ClientNeedId,
  //               UserId: form.UserId,
  //           }
  //         )
  //     onReset()  
  //     }else{
  //         alert('Please fill all the fields')
  //     }

  // }
    return (
        <>
            <div className={ s.container }>
                {/* <div> */}
                <div className={s.container_form}>

                    <div className="d-flex flex-row-reverse bd-highlight">
                        <button 
                        className="text-center btn btn-warning" 
                        onClick={()=>{window.history.back()}}
                        >
                            Volver
                        </button>
                    </div>
                    <form onSubmit={postNeed}  action="">
                                

                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1
                                    className="text-center"
                                    >
                                        Enviá tu Presupuesto!
                                </h1>

                                <div className="form-group mb-2">
                                    <label
                                        className="mb-3 mx-2"
                                        forhtml="exampleFormControlTextarea1">
                                        Descripción del servicio
                                    </label>
                                    <textarea
                                        type='text'
                                        name='description'
                                        value={ form.description }
                                        onChange={ onChangeForm }
                                        className="form-control z-depth-1 input-group mb-1"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Sé preciso en tu descripción para llegar mejor al cliente..."
                                        rows="3"
                                    >
                                    </textarea>
                                </div>

                                <div className="mb-3 mt-3 text-center">
                                    ¿Incluye material?{" "}   
                                    <input
                                        className="input"
                                        type="radio" 
                                        value={true}
                                        name="materials"
                                        onChange={ e=> onChangeForm(e) }
                                    /> Si
                                    <input
                                        className="input"
                                        type="radio" 
                                        value={false} 
                                        name="materials"
                                        onChange={ e=> onChangeForm(e) }
                                    /> No
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-6 text-center">
                                    Días de garantía
                                    </div>
                                    <div className="col-6 text-center">
                                    Tiempo estimado de trabajo
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">

                                <div className="col input-group mb-2">
                                    
                                    <input
                                        type="number"
                                        name='guarantee_time'
                                        value={ form.guarantee_time }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Días de garantía"
                                    />
                                    
                                </div>

                                <div className="col input-group mb-2 ">
                                    {/* <span className="input-group-text">$</span> */}
                                    <input
                                        type="number"
                                        name='duration'
                                        value={ form.duration }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        placeholder="Tiempo estimado de trabajo"
                                        />
                                </div>
                                </div>
                                <div 
                                    className="mt-2 mb-2 mx-5"
                                >
                                    Precio
                                    </div>
                                <div className="row mt-2">
                                <div className="col input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        name='price'
                                        value={ form.price }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Dollar amount (with dot and two decimal places)" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Ingresa un precio"
                                        />
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <button 
                            type="submit"
                            className={` "btn btn-primary btn-lg btn-block" s.container_filterButton mt-3 mb-3`}
                        >
                            Enviar Oferta
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

// function mapStateToProps(state) {
//   return{
//       clientNeeds:state.detailsClientNeed,
//   }
// }

// export default connect(mapStateToProps,null, {newProfessionalOffer, getDetailsClientNeed})(ProfessionalOfferToClientNeed)