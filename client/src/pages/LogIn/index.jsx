import React from "react";
import { Link } from 'react-router-dom';
import Register from "../Register";
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function LogIn() {
  return (
    <div className="w-full h-[93vh] min-h-[90vh] bg-white flex justify-center items-center ">
      <div className="w-[90%] h-[80%] shadow-lg flex justify-center items-center ">

        {/*left side*/}
        <div className="bg-white w-full h-full z-50  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex space-y-5 flex-col h-full justify-center items-center">
            <div className="text-3xl font-sans font-bold ">
              <p>Sign In AccountTe</p>
            </div>

            <div className="flex flex-row space-x-9">
              <a
                href="#"
                className="text-zinc-500 outline outline-zinc-500 rounded-full outline-offset-4">
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="text-zinc-500 outline outline-zinc-500 rounded-full outline-offset-4">
                <FaGoogle className="text-sm" />
              </a>
            </div>

            <div className="text-slate-400">
              <p>For use your email account</p>
            </div>

            <div className="flex flex-col space-y-5 ">
              <input type="text" placeholder="Email" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full" />
              <input type="password" placeholder="Password" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full" />
            </div>

            <div className="flex justify-between w-64 mb-5">
              <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1" />Remember me</label>
              <a href="#" className="text-xs">Forgot Password?</a>
            </div>

            <div>
              <a
                href="#"
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                SIGN IN
              </a>
            </div>
          </div>
        </div>

        {/*right side*/}
        <div className="bg-green-500 h-full w-full flex text-center flex-col space-y-5 items-center justify-center z-10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
          <div className="text-white text-3xl font-sans font-bold">
            <p>Hello, Friend!</p>
          </div>

          <div className="text-white">
            <p>Fill up personal information and<br /> start journey with us</p>
          </div>

          <div>
            <a
              href="./register"
              className="border-2 text-white border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              SIGN UP
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}