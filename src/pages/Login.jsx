import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
  const [step, setStep] = useState(0)
  const [userdata, setuserData] = useState({
    name: "",
    email: "",
    mobile: 0,
    otp: 0
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setuserData({ ...userdata, [e.target.name]: e.target.value })
  }


  const handleSubmit = async () => {
    try {
      let res
      if (step === 0) {
        res = await axios.post(`${import.meta.env.VITE_BASE_API}/api/user/signup`, userdata)
        if (res.data.success) {
          setStep(1)
          console.log(res.data);
        }
        else {
          alert(res.data.message)
        }
      } else if (step === 1) {
        res = await axios.post(`${import.meta.env.VITE_BASE_API}/api/user/verifyOtp`, userdata)
        if (res.data.success) {
          localStorage.setItem("token",res.data.token)
          navigate("/dashboard")
          console.log(res.data);
        }
        else {
          alert(res.data.message)
        }
      } else {
        console.log(error);

      }

    } catch (error) {
      console.log(error);

    }
  }
  // console.log(userdata);

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='p-5 border rounded'>
        <div>
          <p>Name</p>
          <input type="text"
            name="name"
            placeholder='Enter Your Name'
            onChange={handleChange}
            className='px-2 py-1 outline-0   border rounded mt-5' />
        </div>

        <div>
          <p>Email</p>
          <input type="Email"
            name="email"
            placeholder='Enter Your Email'
            onChange={handleChange}
            className='px-2 py-1 outline-0   border rounded mt-5' />
        </div>

        <div>
          <p>Mobile No.</p>
          <input type="Number"
            name="mobile"
            placeholder='Enter Your Mobile No.'
            onChange={handleChange}
            className='px-2 py-1 outline-0   border rounded mt-5' />
        </div>
        {step === 1 && (
          <div>
            <p>OTP</p>
            <input type="Number"
              name="otp"
              placeholder='Enter 4  digit Otp'
              onChange={handleChange}
              className='px-2 py-1 outline-0   border rounded mt-5' />
          </div>
        )}

        <div className='mt-4'>
          <button onClick={handleSubmit} className='py-1 hover:bg-indigo-400 w-full  text-indigo-400  border border-indigo-400 hover:text-white font-bold'>

            {step === 0 ? "sign in" : "login"}

          </button>
        </div>



      </div>

    </div>
  )
}

export default Login