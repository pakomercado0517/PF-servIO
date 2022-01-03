import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import s from './styles/ProfessionalOfferToClientNeed.module.css'
import { useNavigate } from 'react-router-dom'
import { newProfessionalOffer } from '../redux/actions/index'


export const ProfessionalOfferToClientNeed = (props) => {
    const navigate = useNavigate()

    const professional = useSelector((state) => state.globalUserGlobalStorage)

    let actualId = parseInt(window.location.pathname.slice(31))
    const [form, setform] = useState({
        description: "",
        price: 0,
        duration: 0,
        materials:true,
        guarantee_time: 0,
        ClientNeedId: actualId,
        UserId: professional.id,
    })
    console.log(form)
    function onChangeForm(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const postNeed =  (e) =>{
        e.preventDefault()
        try {

            const offer = {
              description: form.description,
              price: parseInt(form.price),
              duration: parseInt(form.duration),
              materials: form.materials,
              guarantee_time: parseInt(form.guarantee_time),
              ClientNeedId: form.ClientNeedId,
              UserId: form.UserId,
              name: props.name
            }
            newProfessionalOffer(offer)
                Swal.fire({
                    icon: 'success',
                    title: 'Oferta enviada!',
                    showConfirmButton: false,
                    timer: 1500
                })

            // console.log('offer', offer)
            
            navigate('/')
            
        } catch (error) {
            console.error(error)
        }
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

                <div className={s.container_form}>
                    <form onSubmit={postNeed}  action="">
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1>Realizá tu oferta!</h1>

                                <div className="form-group mb-2">
                                    <label
                                        className="mb-2"
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

                                <div className="">
                                    ¿Incluye material?   
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
                                <div className="row mt-2">

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

                                <div className="col input-group mb-2">
                                    <span class="input-group-text">$</span>
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
                            // onClick={postNeed} 
                            type="submit"
                            className={` "btn btn-primary btn-lg btn-block" s.container_filterButton`}
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