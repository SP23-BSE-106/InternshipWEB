import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./components/Auth"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}
