import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


function WebLayout({children}) {
  return (
    <div>
        <NavBar/>
        <div>
           <div> {children}</div>
           <Footer/>
        </div>
    </div>
  )
}

export default WebLayout