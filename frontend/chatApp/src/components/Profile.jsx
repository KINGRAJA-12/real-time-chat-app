import React, { useState } from 'react';
import profile from './../assets/profile.jpg';
import { Camera } from 'lucide-react';
import useAuth from '../others/useAuth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { isAuth, update } = useAuth();
  const [img, setImg] = useState(isAuth?.imgUrl || '');

  const handleProfileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64ImgUrl = reader.result;
        setImg(base64ImgUrl);
      };
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleProfileUpdate = async (e) => {
    try {
      e.preventDefault();
      if (!img) return toast.error('Please select a profile image');

      await update(img);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="border-gray-500 border-2 w-[200px] h-[200px] relative left-[62%] flex flex-col justify-center items-center rounded-md z-50">
      <div className="w-[50%] h-[50%] relative">
        <img src={img || isAuth?.imgUrl || profile} alt="Profile" className="rounded-full w-full h-full object-cover" />
        <label htmlFor="file" className="absolute bottom-0 right-0 cursor-pointer">
          <Camera className="font-bold text-2xl" />
        </label>
        <input type="file" id="file" className="opacity-0" onChange={handleProfileChange} />
      </div>
      <button className="bg-blue-600 text-white w-16 h-7 m-4 rounded-md" onClick={handleProfileUpdate}>
        Edit
      </button>
    </div>
  );
};

export default Profile;
