import { create } from 'zustand'

interface LoginStore {
  email: string
  password: string
  otp: string
  loginMethod: 'password' | 'otp' | null
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setOtp: (otp: string) => void
  setLoginMethod: (method: 'password' | 'otp' | null) => void
  resetForm: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  email: '',
  password: '',
  otp: '',
  loginMethod: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setOtp: (otp) => set({ otp }),
  setLoginMethod: (loginMethod) => set({ loginMethod }),
  resetForm: () => set({ email: '', password: '', otp: '', loginMethod: null })
}))