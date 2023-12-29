type RoomProps = {
  handleSubmit: (e: any) => void
}

export const Room = ({ handleSubmit }: RoomProps) => {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center justify-center">
      <div className="w-full">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Type your room!!</h1>
        </div>

        <form onSubmit={handleSubmit} action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="text"
                name="roomValue"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Type your room"
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  )
}
