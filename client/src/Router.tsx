import { BrowserRouter, Routes, Route } from "react-router-dom"

import Posts from "./pages/Posts"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Social from "./pages/Social"
import CreatePost from "./pages/CreatePost"
import { UserProvider } from "./context/UserContext"

function AppRoutes() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/sign-up" element={<SignUp />}/>

          <Route path="/" element={<Posts />}/>
          <Route path="/create-post" element={<CreatePost />}/>

          <Route path="/social" element={<Social />}/>
          <Route path="/chat" element={<Posts />}/>
          <Route path="/profile" element={<Posts />}/>
          <Route path="/inbox" element={<Posts />}/>

        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
