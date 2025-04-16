import { BrowserRouter, Routes, Route } from "react-router-dom"

import Posts from "./pages/Posts"
import Login from "./pages/Login"

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/posts" element={<Posts />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
