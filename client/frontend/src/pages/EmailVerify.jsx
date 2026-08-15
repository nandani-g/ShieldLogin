import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {AppContent} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EmailVerify = () => {
// add cookie in request
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)
  const navigate = useNavigate();
  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
// DELETE number by backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }


  // handle the paste feature 

  const handlePaste = (e)=>{
    // function that will get the values that is stored in the clipboard data so just add paste equal to e
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split(''); // we will get one arraay of six charaacters right that is the six digit OTP. we have to paste all these number 1 by one in each input field for that we will add paste array 

    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }
// OTP and each digit will be added in each input field now we have to add the functionality on this verify email button so that it will send this OTP to our backend server and it will verify our account so to make this funtionality let's come back and we have to create a function that will handle this form
  const onSubmitHandler = async (e)=>{
    try {
      // prevent the defalut functionality that will reload the web page when we submit the form so after adding this e do prevent default it will not related the web page when we submit 
      e.preventDefault();
      // we have to get the OTP
      const otpArray = inputRefs.current.map(e => e.value)

      const otp = otpArray.join(' ')

      // we have the OTP now we will send this OTP on our backend API. so add API call

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        
        // navigate the user on homepage because user is already verified then the user will be redirected to homepage
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified  && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      <form  onSubmit = {onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type='text'
              maxLength='1'
              key={index}
              required
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify email</button>

      </form>

    </div>
  )
}

export default EmailVerify