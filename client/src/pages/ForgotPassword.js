import React, { useContext, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { cn } from "../lib/utils"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBarHome'
import Footer from '../components/Footer'
import { AppContext } from '../Context/AppContext'
import { message } from 'antd'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate();

  const { sendResetPasswordEmail, resetPassword } = useContext(AppContext);

  const handleSendOTP = async (e) => {
    e.preventDefault()

    if (!email) {
      message.error('Please enter your email')
      return
    }


    try {

      setLoading(true)

      if (await sendResetPasswordEmail({ email })) {
        setStep(2)
      }


    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
      message.error(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!otp || !newPassword || !confirmPassword) {
      message.error('Please fill in all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      if (await resetPassword({ email, password: newPassword, otp })) {
        setStep(3)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
      message.error(errorMessage);
    }
    finally {
      setLoading(false)
    }
  }

  document.title = "Reset Password | CodeWhisper";

  return (

    <>

      <Navbar />

      <div className='px-3 bg-black min-h-screen flex justify-center items-center mx-auto w-full'>
        <div className='bg-black border border-neutral-600 p-8 rounded-xl shadow-lg w-full max-w-md'>
          <h1 className='text-3xl font-bold text-center text-white mb-6'>Reset Password</h1>

          {step === 1 && (
            <>
              <p className='text-md text-center text-gray-200 mb-6'>
                Enter your email address to receive a one-time password (OTP) for resetting your password.
              </p>
              <form className='space-y-6' onSubmit={handleSendOTP}>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-gray-100'>Email</Label>
                  <Input
                    type='email'
                    id='email'
                    placeholder="batman@codewhisper.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-neutral-800 border-neutral-600 text-white'
                    required
                  />
                </div>


                <button
                  className="bg-gradient-to-br relative group/btn to-zinc-950 block bg-zinc-900 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                  {
                    !loading && (
                      <span> {" "} &rarr;  </span>
                    )
                  }
                  <BottomGradient />
                </button>

              </form>
            </>
          )}

          {step === 2 && (
            <>
              <p className='text-md text-center text-gray-200 mb-6'>
                Enter the OTP sent to your email and create a new password.
              </p>
              <form className='space-y-6' onSubmit={handleResetPassword}>
                <div className='space-y-2'>
                  <Label htmlFor='otp' className='text-gray-100'>OTP (6 digits)</Label>
                  <Input
                    type='text'
                    id='otp'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className='bg-neutral-800 border-neutral-600 text-white'
                    required
                    maxLength={6}
                    pattern='\d{6}'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='newPassword' className='text-gray-100'>New Password</Label>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id='newPassword'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='bg-neutral-800 border-neutral-600 text-white pr-10'
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-gray-100'>Confirm New Password</Label>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='bg-neutral-800 border-neutral-600 text-white pr-10'
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button
                  type='submit'
                  className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium 
                  shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                  {
                    !loading && (
                      <span> {"  "} &rarr;  </span>
                    )
                  }
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <div className='text-center'>
              <p className='text-lg text-green-300 mb-4'>Your password has been successfully reset!</p>
              <button
                onClick={() => {
                  navigate("/login")
                }}
                className="text-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              >
                Go to Login
              </button>
            </div>
          )}

          {step !== 3 && (
            <p className='text-sm text-center text-gray-200 mt-4'>
              Already have an account?
              <Link to="/login" className='font-medium text-white hover:text-gray-300'>Log in</Link>
            </p>
          )}
        </div>
      </div>

      < Footer />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};



const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};