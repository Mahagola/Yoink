import Navigation from "./components/Navigation";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import {AppContext, socket} from "./context/appContext";

function App() {
  const [rooms,setRooms]=useState([]);
  const [currentRoom, setCurrentRoom]=useState([]);
  const [members, setMembers]=useState([]);
  const [messages, setMessages]=useState([]);
  const [privateMemberMessg, setPrivateMemberMessg]=useState({});
  const [newMessages, setNewMessages] = useState({});
  const user=useSelector((state)=>state.user);
  return (
    <AppContext.Provider value={{socket,rooms,setRooms,currentRoom, setCurrentRoom, members, setMembers,messages, setMessages,privateMemberMessg,setPrivateMemberMessg,newMessages,setNewMessages}}>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          {!user && (
            <>
              <Route path="/SignIn" element={<SignIn/>} />
              <Route path="/SignUp" element={<SignUp/>} />
            </>
          )}
          <Route path="/Chat" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
