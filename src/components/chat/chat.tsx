import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { auth, db } from '@/firebase/configs'

type ChatProps = {
  room: string
}

export const Chat = ({ room }: ChatProps) => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const messageRef = collection(db, 'messages')

  useEffect(() => {
    const queryMessages = query(messageRef, where('room', '==', room), orderBy('createdAt'))
    const unsubcribe = onSnapshot(queryMessages, snapshoot => {
      const messagesArr: any[] = []
      snapshoot.forEach(doc => {
        messagesArr.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messagesArr)
    })

    return () => unsubcribe()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!newMessage) return

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room,
    })

    setNewMessage('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl text-center bg-indigo-600 rounded-md text-white py-3 mb-6">
        {room}
      </h1>
      <div className="bg-slate-300 rounded-sm border border-solid border-black mb-6">
        {messages.map((message, i) => (
          <div key={i + message.id} className="flex">
            <p className="font-bold">{message.user}</p> :
            <h2 className="uppercase ml-2">{message.text}</h2>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="type your message"
          name="message"
          onChange={e => setNewMessage(e.target.value)}
          value={newMessage}
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
        />
        <button
          className="ml-2 inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          type="submit"
        >
          send
        </button>
      </form>
    </div>
  )
}
