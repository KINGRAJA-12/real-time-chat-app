import React, { useEffect, useRef, useState } from 'react';
import { SendHorizonal, Camera } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useSocket from '../others/useSocket';
import useAuth from '../others/useAuth';
import axiosInstance from '../others/axiosInstancs';
import toast from 'react-hot-toast';

const Message = () => {
  const [data, setData] = useState([]); 
  const [sendMsg, setSendMsg] = useState('');
  const [sendImg, setSendImg] = useState(null);
  const { id: receiverID } = useParams();
  const { socket, receivedMsg, sendMessage } = useSocket();
  const { addTodb } = useAuth();
  const { isAuth,isSend } = useAuth();
  const msgEndRef=useRef()
  const [receiverName,setReceivername]=useState("")
  useEffect(() => {
    const initialFetch = async () => {
      try {
        const res = await axiosInstance.get(`/data/getConvmsg/${receiverID}`);
        console.log(res)
        setData(res.data.data); 
        setReceivername(res.data.name)
      } catch (err) {
        toast.error(err.message);
      }
    };

    initialFetch();
  }, [receiverID]);

  useEffect(() => {
    if (!socket) return;
    
    socket.on("receive-message", (data) => {
      console.log(data)
      setData((prevData) => [...prevData, { text: data.text,image:data.image, sender: receiverID }]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);
  const handleSendMsg = async (e) => {
    e.preventDefault();

    try {
      let base64ImgUrl = null;

      if (sendImg) {
        const fileReader = new FileReader();
       fileReader.readAsDataURL(sendImg);
        fileReader.onload = async () => {
          base64ImgUrl =await fileReader.result;
          sendAndStoreMessage(base64ImgUrl);
        };
      } else {
        sendAndStoreMessage(null);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const sendAndStoreMessage = async (base64Img) => {
    try {
      const formData = {
        text: sendMsg || '',
        image: base64Img||null,
        receiverId: receiverID
      };
      console.log(formData)
      sendMessage(formData);
      await addTodb(formData, receiverID);
      setData((prevData) => [...prevData, { text: sendMsg, image: base64Img, sender: isAuth._id }]);
      setSendMsg('');
      setSendImg(null);
    } catch (err) {
      toast.error(err.message);
    }
  };
useEffect(()=>{
  msgEndRef.current?.scrollIntoView({behavior:'smooth'})
},[data])
  return (
    <div className='h-[600px] w-full flex flex-col'>
      <h1 className='w-full h-10 text-2xl font-mono font-bold flex justify-center items-center'>
        {receiverName}
      </h1>

      <section className='w-full h-full p-5 overflow-y-auto border-2  flex flex-col'>
        <div className=' flex-grow w-[100%] overflow-y-scroll'>
          {data.map((item, index) => (
            <div
            ref={msgEndRef}
              key={index}
              className={isAuth._id === item.sender ? 'border-b-2 p-2 w-full flex flex-row justify-end' : 'border-b-2 p-2 w-full flex flex-row justify-start'}
            >
              {item.image ? <img src={item.image} alt="Sent" className='w-32 h-32 object-cover mt-2' /> : <p>{item.text}</p>}
            </div>
          ))}
        </div>

        <div className=' w-full h-20 flex flex-row justify-center items-center mt-2 px-8'>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-3/4 h-14 p-2 border rounded-md"
            onChange={(e) => setSendMsg(e.target.value)}
            value={sendMsg||sendImg||""}
          />
          <button className="ml-2 p-2" onClick={handleSendMsg} disabled={isSend}>
            <SendHorizonal size={24} /> Send
          </button>
          <label htmlFor="imageInput" className="ml-2">
            <Camera size={24} />
          </label>
          <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={(e) => setSendImg(e.target.files[0])} />
        </div>
      </section>
    </div>
  );
};

export default Message;
