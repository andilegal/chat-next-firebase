import { GoogleButton } from '@/components/google-button'
import { auth, googleProvider } from '@/firebase/configs'
import { googleTokenName } from '@/utils/constants'
import { signInWithPopup } from 'firebase/auth'
import { setCookie } from 'cookies-next'

type SignInProps = {
  setAuth: () => void
}

export const SignIn = ({ setAuth }: SignInProps) => {
  const signGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setCookie(googleTokenName, result.user.refreshToken)
      setAuth()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="mb-3 text-2xl font-bold">Sing in with google to continue</p>
      <GoogleButton handleClick={signGoogle} />
    </div>
  )
}
