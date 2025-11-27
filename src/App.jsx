import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/Login/LoginPage"
import HomePage from "./components/Home/HomePage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/dashboard" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App