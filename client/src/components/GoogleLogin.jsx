import React, {useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { googleLogin } from '../redux/actions/index'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

function GoogleLogin(props) {
  const dispatch = useDispatch()
  const googleState = useSelector(state => state.googleUser)
  const [globalUser,setGlobalUser ] = useGlobalStorage("globalUser", "")
  const [googleUser, setGoogleUser] = useState(null)

  const handleClick = async (e)=> {
    e.preventDefault()
    const googleProvider= new GoogleAuthProvider()
    // googleProvider.addScope('user')
    signInWithPopup(auth, googleProvider).then((result)=> {
      const credential= GoogleAuthProvider.credentialFromResult(result)
      const token= credential.accessToken
      const user= result.user
      console.log('google user...',user)
      console.log('access token: ', token)
      setGoogleUser(user)
    }).catch(error=> {
      // Handle Errors here.
      console.log(error)
    })
  }
  console.log('googleState...',googleState)

  useEffect(() => {
    const setGoogleLog= async () => {
      if(googleUser !== null) {
        const res= googleUser.providerData[0]
        console.log('userrrrr', res)
        const nameUser= res.displayName.split(' ')
        const newuser=  {
          userName: res.email,
          firstName:nameUser[0],
          lastName: nameUser[1],
          email: res.email,
          dni:'',
          password:'',
          repeatPassword:'',
          professionalCase:false,
          professional: "false",
          city:'',
          photo: res.photoURL,
          profession:"",
          phone:res.phoneNumber ? res.phoneNumber : '',
          profession: '',
          verified: googleUser.emailVerified, 
          certification_name:"",
          certification_img:"",
          status: "", 
        }
        dispatch(googleLogin(newuser))
      }
      if(googleState.id) {
        dispatch(googleLogin(googleState))
        setGlobalUser(googleState)
      }
      }
      setGoogleLog()

  },[googleUser, dispatch, googleState])

  return (
    <div 
        onClick={handleClick}
        type="button"
        className="btn btn-lg btn-github text-uppercase btn-outline col-lg-4" 
        // href="http://localhost:3001/user/auth/github"
        >
        <img src="https://img.icons8.com/color/40/000000/google-logo.png" alt='google'/>
    </div>
  )
}

export default GoogleLogin
