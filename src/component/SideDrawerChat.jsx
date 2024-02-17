import React, { useContext } from 'react';
import { LoginContext } from "../context/loginContext";

const SideDrawerChat = () => {
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(LoginContext);
  return (
    <div>
    
    </div>
  )
}

export default SideDrawerChat
