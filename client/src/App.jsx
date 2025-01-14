import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Homepage from "./pages/homePage";
import Signup from "./pages/signupPage"
import ProtectedRoutes from "./ulits/protectedRoutes";
import Navbar from './components/navbar';
import Profile from './pages/profile';
import TransactioPage from './pages/transactioPage';
import Addtransactionpage from './pages/addtransactionpage';
import Edittransactionpage from './pages/edittransactionpage';
import ErrorPage from "./pages/errorPage"
function App() {


  return (
    <>
      <Routes>
        <Route path='/login' element={
          <ProtectedRoutes>
            <LoginPage />
          </ProtectedRoutes>
        } />
        <Route path='/' element={
          <ProtectedRoutes>
            <Navbar />
            <Homepage />
          </ProtectedRoutes>
        } />
        <Route path='/signup' element={
          <ProtectedRoutes>
            <Signup />
          </ProtectedRoutes>
        } />

        <Route path="/profile" element={
          <ProtectedRoutes>
            <Navbar />
            <Profile />
          </ProtectedRoutes>
        } />
        <Route path="/transaction" element={
          <ProtectedRoutes>
            <Navbar />
            <TransactioPage />
            
          </ProtectedRoutes>
        } />
        <Route path="/addtransaction" element={
          <ProtectedRoutes>
            <Navbar />
            <Addtransactionpage/>
            
          </ProtectedRoutes>
        } />
        <Route path="/edittrans/:id" element={
          <ProtectedRoutes>
            <Navbar />
            <Edittransactionpage/>
          </ProtectedRoutes>
        } />
         <Route path="/*" element={
          <ErrorPage/>
        } />

      </Routes>
    </>
  )
}

export default App
