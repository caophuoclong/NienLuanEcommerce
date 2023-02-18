import React from "react";
import { Link } from 'react-router-dom';
import LogIn from "../LogIn";
import Register from "../Register";
import ResetPassword from "../ResetPassword";
import Forgotpw from "../../assets/images/Forgotpw.png";
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function ForgotPassword() {
    return (
        <div className="w-full h-[93vh] min-h-[90vh] bg-white flex justify-center items-center ">
            <div className="w-[90%] h-[80%] shadow-lg flex justify-center items-center ">

                {/*right side*/}
                <div className="bg-gray-100 h-full w-full flex text-center flex-col space-y-5 items-center justify-center z-10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
                    <img src={Forgotpw} className="w-[70%] h-[90%]" />
                </div>

                {/*left side*/}
                <div className="bg-white w-full h-full z-50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                    <div className="flex space-y-5 flex-col h-full text-center justify-center items-center">
                        <div className="text-3xl font-sans font-bold text-green-500">
                            <p>Forgot Password?</p>
                        </div>

                        <div className="text-slate-400">
                            <p>Please enter your email address to<br /> recieve a verification cord</p>
                        </div>

                        <div className="flex flex-col space-y-5 w-[60%]">
                            <input type="email" placeholder="Email" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
                        </div>

                        <div>
                            <Link to={"/resetpassword"}
                                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                                SEND
                            </Link>
                        </div>

                        <div className="flex justify-center w-64 mb-5">
                            <Link to={"/register"} className="text-sm text-slate-400">Create Account?</Link>
                        </div>

                        <div className="flex flex-col w-[60%] space-y-3 mx-5 gap-1 text-center">
                            <p className="text-sm">Already an Account? <Link to={"/signin"} className="text-sm text-slate-400">SignIn</Link> </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
