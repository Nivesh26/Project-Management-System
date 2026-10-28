import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./Pages/Home"
import Login from "./Logins/Login"
import Signup from "./Logins/Signup"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
