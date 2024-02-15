import React from 'react'
import Navbar from './Navbar'
import SideDrawer from './SideDrawer'
import SideDrawerChat from './SideDrawerChat'

const ChatBox = () => {
  return (
    
    <div>
        <Navbar/>
       <div>
        <div>
           <SideDrawerChat/>
        </div>
        <div>
            one to one chat
        </div>
        </div> 
      
    </div>
  )
}

export default ChatBox
