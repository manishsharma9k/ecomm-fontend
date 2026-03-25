import React from 'react'
import { X } from 'lucide-react'

const Modal = ({ onClose ,isOpen , children }) => {
  
  if (!isOpen) return null;
  
  
    

  return (
    <div className='flex inset-0 justify-center fixed items-center z-50 '>
      <div className='absolute inset-0 bg-black/40 opacity-50 '></div>
      <div className='relative bg-amber-50 rounded-2xl shadow p-6 w-[90%] max-w-md z-10 '>
        <button onClick={onClose} className='absolute top-3 right-3'><X/>
        </button>
        {children}
      </div>
      
    </div>
  )
}

export default Modal