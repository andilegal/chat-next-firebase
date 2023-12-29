import { SignIn } from '@/components/sign-in'
import { useState } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'
import { googleTokenName } from '@/utils/constants'
import { Chat } from '@/components/chat'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/configs'
import { Room } from '@/components/room'

export default function Home() {
  const [isAuth, setIsAuth] = useState<any>(getCookie(googleTokenName))
  const [room, setRoom] = useState(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setRoom(e.target.roomValue.value)
  }

  const handleSignOut = async () => {
    await signOut(auth)
    deleteCookie(googleTokenName)
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return <SignIn setAuth={() => setIsAuth(true)} />
  }

  return (
    <div>
      <button
        className="mt-8 group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        onClick={handleSignOut}
      >
        Sing Out
      </button>
      {room ? <Chat room={room} /> : <Room handleSubmit={handleSubmit} />}
    </div>
  )
}
