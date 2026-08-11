import '../App.css'
import Login from './Login'
import logo from '../assets/logo1.png'
import Navbar from './navbar'
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup'
function App() {
  

  return (
    <>

    <div className="logo flex items-center  "> 
      <h2 className="heading text-5xl font-bold text-[#4CBB17]"></h2>
     <img  className="logoHome" src={logo} alt="Logo"/> 
    </div>
  
   <div className="flex flex-col md:flex-row  ">
  {/* Left Side */}
  <div className="flex-1 flex flex-col items-center   p-6 text-center">
    <h1 className="text2 text-4xl md:text-6xl font-bold text-[#4CBB17]">
  
  <span className="block">
    <span className="letter1">C</span>ampus
  </span>
  <span className="block text-[#48872B]">
    <span className="letter2">B</span>aazar
  </span>


</h1>

    <h2 className="mt-4 text-base md:text-xl text-[#39542C] max-w-md">
      Buy, sell, and discover everything you need within your campus community.
    </h2>
  </div>

  {/* Right Side */}
  <div className="flex-1 flex items-center justify-center p-6">
    <Signup />
  </div>
</div>

</>
  )
}

export default App
