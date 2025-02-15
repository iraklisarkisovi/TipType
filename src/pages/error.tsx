import React from 'react'

const error = () => {
  return (
    <div className='bg-lime-300 flex flex-col items-center justify-center min-h-screen h-screen w-screen'>
      <div className='flex flex-row gap-10 text-3xl'>
        <h1>404 Page not found {":("}</h1>
      </div>
    </div>
  )
}

export default error
