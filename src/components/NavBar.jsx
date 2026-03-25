import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='px-10 py-3 background-blur-2xl bg-black/40 w-full flex items-center justify-round'>
        <h1 className=' text-2xl font-bold text-white'>NavBar</h1>
        
        <button className='ml-auto bg-white text-black px-4 py-2 rounded-md mx-6'>Home</button>
        <Link to={"login"}className='text-ml-auto bg-white text-black px-4 py-2 rounded-md'>Login</Link>
        
    </div>
  )
}

export default NavBar