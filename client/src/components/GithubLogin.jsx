import React, {useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { githubLogin } from '../redux/actions/index'
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';

function GithubLogin(props) {
  const dispatch = useDispatch()
  const githubState = useSelector(state => state.githubUser)
  const [globalUser,setGlobalUser ] = useGlobalStorage("globalUser", "")
  const [localUser, setLocalUser] = useLocalStorage("localUser", "");
  const [githubUser, setGithubUser] = useState(null)

  const handleClick = async (e)=> {
    e.preventDefault()
    const githubProvider= new GithubAuthProvider()
    githubProvider.addScope('user')
    signInWithPopup(auth, githubProvider).then((result)=> {
      const credential= GithubAuthProvider.credentialFromResult(result)
      const token= credential.accessToken
      const user= result.user
      console.log('access token: ', token)
      setGithubUser(user)
    }).catch(error=> {
      // Handle Errors here.
      console.log(error)
    })
  }
  console.log('githubState...',githubState)

  useEffect(() => {
    const setGithubLog= async () => {
      if(githubUser !== null) {
        const res= githubUser.providerData[0]
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
          verified: githubUser.emailVerified, 
          certification_name:"",
          certification_img:"",
          status: "", 
        }
        dispatch(githubLogin(newuser))
      }
      if(githubState.id) {
        dispatch(githubLogin(githubState))
        setGlobalUser(githubState)
        setLocalUser(githubState)
      }
      }
      setGithubLog()

  },[githubUser, dispatch, githubState])


  return (
    <div 
        onClick={handleClick}
        type="button"
        className="btn btn-lg btn-github text-uppercase btn-outline col-lg-4" 
        // href="http://localhost:3001/user/auth/github"
        >
        <img src="https://img.icons8.com/material-rounded/48/000000/github.png" alt='github'/>
    </div>
  )
}

export default GithubLogin
