"use client"

import React, {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { loginWithPassword, sendOTP, verifyOTP } from "../actions/loginUser"
import { loginWithPasswordSchema, loginWithOTPSchema } from "../schemas/zodSchemas"
import { useLoginStore } from "../store/loginStore"
import { z } from "zod"
import useAuthStore from '../store/authStore'; // Add this at the top of the file
import { useRouter } from 'next/navigation'


const LoginPage: React.FC = () => {
  const { email, password, otp, loginMethod, setEmail, setPassword, setOtp, setLoginMethod } = useLoginStore()
  const [showPassword, setShowPassword] = React.useState(false)
  const login = useAuthStore(state => state.login);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Form state handlers with proper typing
  const [lastPasswordResult, passwordAction] = useFormState(loginWithPassword, null)
  const [lastOTPSendResult, otpSendAction] = useFormState(sendOTP, null)
  const [lastOTPVerifyResult, otpVerifyAction] = useFormState(verifyOTP, null)


  const [passwordForm, passwordFields] = useForm({
    lastResult: lastPasswordResult as any,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginWithPasswordSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  const [otpForm, otpFields] = useForm({
    lastResult: lastOTPVerifyResult as any,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginWithOTPSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response:any = await loginWithPassword(null, formData);

      if (response && typeof response === 'object' && 'success' in response) {
        if (response.success) {
          // Store both token and email in the auth store
          login({
            email: response.data.email,
            token: response.data.token,
            phone: response.data.phone
          });
          router.push('/');
        } else {
          setError(response.error || 'Login failed');
        }
      } else {
        setError('Received invalid response format from server');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('An error occurred during login');
    }
  };
 

  const handleOTPSend = async () => {
    const formData = new FormData()
    formData.append("email", email)
    await otpSendAction(formData)
  }

  const handleOTPVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
  
    try {
      const response: any = await verifyOTP(null, formData);
  
      if (response && typeof response === 'object' && 'success' in response) {
        if (response.success) {
          // Store token and email in the auth store
          login({
            email: response.data.email,
            token: response.data.token,
            phone: response.data.phoneNumber
          });
          router.push('/');
        } else {
          setError(response.error || 'OTP verification failed');
        }
      } else {
        setError('Received invalid response format from server');
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError('An error occurred during OTP verification');
    }
  };
  

  // const handleOTPVerify = async (event: React.FormEvent) => {
  //   event.preventDefault()
  //   const formData = new FormData()
  //   formData.append("email", email)
  //   formData.append("otp", otp)
  //   await otpVerifyAction(formData)
  // }

  // Email validation
  // const validateEmail = () => {
  //     const result = emailSchema.safeParse({ email })
  //     return result.success ? null : result.error.errors[0].message
  // }

  // const emailError = validateEmail()

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row min-h-screen p-4">
      {/* Left side remains the same */}
      <div className="lg:w-1/2 bg-purple-900 text-white flex flex-col justify-between relative overflow-hidden rounded-xl">
        <Image
          src="/assets/login.jpg"
          width={5000}
          height={3000}
          alt=""
          className="relative h-[300px] object-cover lg:h-[calc(100vh-32px)]"
        />
        <div className="z-10 absolute w-full flex justify-center items-center h-full">
          <p className="text-[36px] lg:text-[80px] xl:text-[90px] font-medium leading-tight">
            Crowdshaki.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-start mb-8">
            <h1 className="text-3xl font-semibold">Welcome back!</h1>
          </div>



          {/* Login Method Selection */}
          {!loginMethod && (
            <div className="space-y-4">
              <button
                onClick={() => setLoginMethod('password')}
                className="w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign in with Password
              </button>
              <button
                onClick={() => setLoginMethod('otp')}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign in with Email OTP
              </button>
            </div>
          )}

          {/* Password Form */}
          {loginMethod === 'password' && (
            <form id={passwordForm.id} onSubmit={handlePasswordSubmit} action={passwordAction} >
              {/* Email Input with validation */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name={passwordFields.email.name}
                  key={passwordFields.email.key}
                  defaultValue={passwordFields.email.initialValue}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-red-600 text-sm ">{passwordFields.email.errors}</p>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-red-600 text-sm ">{passwordFields.password.errors}</p>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
          )}

          {/* OTP Form */}
          {loginMethod === 'otp' && (
            <form id={otpForm.id} onSubmit={handleOTPVerify} action={otpVerifyAction}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name={otpFields.email.name}
                  key={otpFields.email.key}
                  defaultValue={otpFields.email.initialValue}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-red-600 text-sm ">{otpFields.email.errors}</p>
              </div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleOTPSend}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send OTP
                </button>
              </div>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </form>
          )}

          {loginMethod && (
            <button
              onClick={() => setLoginMethod(null)}
              className="mt-4 w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Change Login Method
            </button>
          )}

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage