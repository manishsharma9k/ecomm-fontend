
import { Facebook, Github, Twitter } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='border-t-2 px-10 py-4 flex items-center justify-between'>
        <h1 className='text-sm font-bold text-gray-500'>Footer</h1>
        <div className='flex items-center justify-center'>
        <Github className=" h-20" />
        <Facebook className="h-20" />
        <Twitter className="h-20" />

     </div>
    </div>
  )
}

export default Footer