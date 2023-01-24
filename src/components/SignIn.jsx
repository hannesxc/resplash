import { useContext } from "react"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { AuthContext } from "../contexts/AuthContext"

function SignIn() {

  const { auth } = useContext(AuthContext)
  const uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: `/resplash/home`,
    tosUrl: '/',
    privacyPolicyUrl: '/'
  }

  return (
    <div className="bg-indigo-300 flex justify-center h-screen items-center">
      <div className="flex items-center flex-col w-96 h-96 m-5">
        <p className="py-9">Sign in using one of the methods below!</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </div>
  )
}

export default SignIn