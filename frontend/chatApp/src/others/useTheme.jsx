import { create } from "zustand";
import toast from 'react-hot-toast'

const useTheme = create((set) => ({
  theme: localStorage.getItem('dtheme') || 'dark',
  
  setTheme: (newTheme) => {
    try{
    localStorage.setItem('dtheme', newTheme);
    set({ theme: newTheme });
    toast.success("theme change successfully")
    }
    catch(err){
        toast.error("failed to change theme")
    }
  }
}));

export default useTheme;
