import Navigation from "./components/Navigation";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";

function App() {
  const user=useSelector((state)=>state.user);
  return (
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
  );
}

export default App;
