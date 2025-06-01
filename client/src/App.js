import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import { Login } from './pages/Login.js'
import { SignUp } from './pages/SignUp.js'
import ForgotPassword from './pages/ForgotPassword.js'
import VerifyEmail from './pages/VerifyEmail.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AppContext } from './Context/AppContext';
import Loading from './components/Loading.js'
import Room from './pages/Room.js'
import CreateRoom from './pages/CreateRoom.js'
import JoinRoom from './pages/JoinRoom.js'
import CodeRoom from './pages/CodeRoom.js'
import Privacy from './pages/Privacy.js'
import AuroraChat from './pages/AuroraChat.js'
import NotFound from './pages/NotFound.js'
import EditorDemo from './pages/EditorDemo.js'
import MainEditor from './pages/Editor.js'

export default function App() {


  const { getUserData } = useContext(AppContext);

  useEffect(() => {
    const authStatus = Cookies.get('auth_status');

    if (authStatus === 'true') {
      const fetchUserData = async () => {
        try {
          await getUserData();
        } catch (err) {
          console.error('Error fetching user data:', err);
          if (err?.response?.status === 401) {
            Cookies.remove('auth_status', { path: '/' });
          }
        }
      };

      fetchUserData();
    }
  }, []);


  return (
    <div>

      <Routes>
        {/* basic routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />


        {/* testing routes */}
        <Route path="/loading" element={<Loading />} />


        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/* Room Routes */}
        <Route path="/room" element={<Room />} />
        <Route path="/room/create" element={<CreateRoom />} />
        <Route path="/room/join" element={<JoinRoom />} />
        <Route path="/room/:roomId" element={<CodeRoom />} />


        {/* Ask AI routes */}
        <Route path="/aurora" element={<AuroraChat />} />



        {/* Editor Demo routes */}
        <Route path="/editor-demo" element={< EditorDemo />} />
        <Route path="/editor" element={< MainEditor />} />




        {/* not found page  */}
        <Route path="*" element={<NotFound />} />


      </Routes>
    </div>
  )
}