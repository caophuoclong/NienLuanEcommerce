import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="w-full h-[93vh] min-h-[90vh] bg-white flex justify-center items-center ">
      <div className="w-[90%] h-[80%] shadow-lg flex justify-center items-center ">

        {/*left side*/}
        <div className="bg-green-500 h-full w-full flex text-center flex-col space-y-5 items-center justify-center z-10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
          <div className="text-white text-3xl font-sans font-bold">
            <p>Welcome Back!</p>
          </div>

          <div className="text-white">
            <p>To keep connected with us please login<br /> with your personal info</p>
          </div>

          <div>
            <Link to={"/signin"}
              className="border-2 text-white border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              SIGN IN
            </Link>
          </div>
        </div>

        {/*right side*/}
        <div className="bg-white w-full h-full z-50  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex space-y-3 flex-col h-full justify-center items-center">
            <div className="text-3xl font-sans font-bold text-green-500">
              <p>Create Account</p>
            </div>

            <div className="flex flex-row space-x-9">
              <Link to={"/#"}
                className="text-zinc-500 outline outline-zinc-500 rounded-full outline-offset-4">
                <FaFacebookF className="text-sm" />
              </Link>
              <Link to={"/#"}
                className="text-zinc-500 outline outline-zinc-500 rounded-full outline-offset-4">
                <FaGoogle className="text-sm" />
              </Link>
            </div>

            <div className="text-slate-400">
              <p>Or use your email for registration</p>
            </div>

            <div className="grid grid-cols-3 gap-1 mx-5 w-[70%]">
              <input type="text" placeholder="First Name" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
              <input type="text" placeholder="Middle Name" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
              <input type="text" placeholder="Last Name" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
            </div>

            <div className="flex flex-col w-[70%] space-y-3 mx-5 gap-1">
              <input type="email" placeholder="Email" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
              <input type="text" placeholder="Username" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-1 mx-5 w-[70%]">
              <select name="dropdown" placeholder="Gender" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" >
                <option>Male</option>
                <option>Female</option>
              </select>
              <input type={'date'} placeholder="Birthday" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
            </div>

            <div className="flex flex-col mx-5 gap-1 w-[70%]">
              <input type="password" placeholder="Password" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
            </div>

            <div>
              <Link to={"/#"}
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}