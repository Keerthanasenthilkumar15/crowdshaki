// store/formStore.ts
import {create} from 'zustand';

type FormData = {
  name: string;
  orgName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  setFormData: (field: string, value: string) => void;
};

export const useFormStore = create<FormData>((set) => ({
  name: '',
  orgName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  setFormData: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
}));
