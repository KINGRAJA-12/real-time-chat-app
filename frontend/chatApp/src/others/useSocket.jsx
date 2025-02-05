import { create } from "zustand";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const useSocket = create((set, get) => ({
  socket: null,
  activeUsers: [],
  activeUsersList:[],
  receivedMsg:'',
  getConnect: (userId) => {
    let socket = get().socket;
    if (!socket) {
      socket = io("http://localhost:3000");
      set({ socket });
    }
    socket.emit("active-user", userId);
    socket.on("alluser", (data) => {
      set({ activeUsers:data.activeUser});
      set({activeUsersList:data.userIdlist})
    }
  );
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, activeUsers: [] });
    }
  },
  sendMessage:(msg)=>{
    try{
      let socket=get().socket
      if(!socket)return toast.error("socket not ")
      socket.emit('send-message',msg)
      
    }catch(err){
      toast.error(err.message)
    }
  }
}));

export default useSocket;
