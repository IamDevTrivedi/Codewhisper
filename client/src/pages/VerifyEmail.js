import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import Navbar from '../components/NavBarHome'
import Footer from '../components/Footer'
import { AppContext } from '../Context/AppContext'
import { message } from "antd"

export default function VerifyEmail() {


    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)


    const { sendVerificationOtp, verifyEmail, userData } = useContext(AppContext);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (await verifyEmail({ otp })) {
            setStep(2);
        }
    }

    const navigate = useNavigate();
    const handleResendOTP = async (e) => {
        e.preventDefault();

        try {
            if (await sendVerificationOtp()) {
                setStep(1);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userData) {
            message.error('You need to be logged in to verify your email address.');
            navigate('/login');
            return;
        }
        else if (userData.isAccountVerified) {
            message.success('Your email address is already verified.');
            navigate('/');
            return;
        }
    })

    document.title = "Verify Email | CodeWhisper";

    return (

        <>

            <Navbar />

            <div className='px-3 bg-black min-h-screen flex justify-center items-center mx-auto w-full'>
                <div className='bg-black border border-neutral-600 p-8 rounded-xl shadow-lg w-full max-w-md'>
                    <h1 className='text-3xl font-bold text-center text-white mb-6'>Verify Your Email</h1>

                    {step === 1 && (
                        <>
                            <p className='text-md text-center text-gray-300 mb-6'>
                                An email verification OTP has been sent to your account. Please enter the OTP below to verify your email address and continue.
                            </p>
                            <form className='space-y-6' onSubmit={handleVerify}>
                                <div className='space-y-2'>
                                    <Label htmlFor='otp' className='text-gray-200'>Enter OTP</Label>
                                    <Input
                                        type='text'
                                        id='otp'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className='bg-neutral-800 border-neutral-700 text-white'
                                        required
                                        maxLength={6}
                                        pattern='\d{6}'
                                        placeholder='Enter 6-digit OTP'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    disabled={loading}
                                >
                                    {loading ? 'Verifying...' : 'Verify Email'}
                                    <BottomGradient />
                                </button>
                            </form>
                            <p className='text-sm text-center text-gray-400 mt-4'>
                                Didn't receive the OTP? <button onClick={handleResendOTP} className='text-white hover:text-sky-500'>Resend OTP</button>
                            </p>
                        </>
                    )}

                    {step === 2 && (
                        <div className='text-center'>
                            <p className='text-xl text-green-400 mb-4'>Email Verified!</p>
                            <p className='text-md text-gray-300 mb-6'>Thank you for verifying your email address. Your account is now fully activated.</p>
                            <button
                                className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                onClick={() => navigate('/editor')}
                            >
                                Go to Editor
                                <BottomGradient />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}


const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};