import React, {useState, useEffect} from 'react'
import {storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage'
import s from './styles/UploadImage.module.css'


function UploadImage({details}) {
  const [progress, setProgress] = useState(0)
  const [detail, setDetail] = useState()

  const uploadFile= (file) => {
        if(!file) return 
        const storageRef= ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            setProgress(prog)
        }, (err)=> console.log(err),
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then(url=> {
                console.log('url', url);
                setDetail(details.photo= url);
            })
        }
        )
    }

    const uploadImage= async (e) => {
        const file= e.target.files[0]
        await uploadFile(file)
    }

  return (
    <div>
      <div className={s.img_titulo}>
        <p >Elegir archivo:</p>
        <input  
            className={`btn btn-primary ${s.pick_file}`}
            type="file"  
            // accept=".png" 
            name="photo"
            // multiple
            onChange={uploadImage}
        /> 
      </div>
      <span className={progress === 100 ? 'text-success' : s.upload_done} >Uploaded {progress} % </span>
      {
        progress === 100
        ? <img src={details.photo} className={s.showImage}/>
        : ""
      }
    </div>
  )
}

export default UploadImage
