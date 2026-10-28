import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./Pages/Home"
import Login from "./Logins/Login"
import Signup from "./Logins/Signup"
import ForgetPassword from "./Logins/ForgetPassword"
import Learnings from "./Pages/Learnings"
import Jobs from "./Pages/Jobs"
import Projects from "./Pages/Projects"
import Pricing from "./Pages/Pricing"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/learnings" element={<Learnings />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Login, Signup, and Password Reset */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
