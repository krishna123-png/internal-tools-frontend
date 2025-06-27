import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../components/Profile'
import EditProfile from '../components/EditProfile'
import ForgotPassword from '../components/ForgotPassword'
import AIAssistant from '../components/AIAssistant'
import CodeTool from '../components/CodeTool'
import Summarizer from '../components/Summarizer'
import ResumeAnalyzer from '../components/ResumeAnalyzer'
import NotFound from '../components/NotFound'
import ResetPassword from '../components/ResetPassword'

export const AuthContext = React.createContext();

export default function App() {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    try {
      const token = localStorage.getItem('ai-internal-tools-token');
      console.log(token);
      if (token && !user) {
        const decoded = jwtDecode(token)
        setUser(decoded);
      }
    }
    catch {
      setUser(null)
    }
  }, []);
  console.log(user);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tools' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/tools/ai-assistant' element={<AIAssistant />} />
          <Route path='/tools/code-tool' element={<CodeTool />} />
          <Route path='/tools/summarizer' element={<Summarizer />} />
          <Route path='/tools/resume-analyzer' element={<ResumeAnalyzer />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}