import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store's state type
interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    token: string;
    phone: string;
  } | null;
  login: (user: { email: string; token: string; phone: string; }) => void;
  logout: () => void;
}

// Create the store with the AuthState type
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      
      login: (user) => 
        set({
          isAuthenticated: true,
          user,
        }),
      
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;