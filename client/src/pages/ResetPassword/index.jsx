import React from "react";
import { Link } from 'react-router-dom';
import LogIn from "../LogIn";
import Register from "../Register";
import Resetpw from "../../assets/images/Resetpw.png";
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function ResetPassword() {
    return (
        <div className="w-full h-[93vh] min-h-[90vh] bg-white flex justify-center items-center ">
            <div className="w-[90%] h-[80%] shadow-lg flex justify-center items-center ">

                {/*left side*/}
                <div className="bg-white w-full h-full z-50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                    <div className="flex space-y-5 flex-col h-full text-center justify-center items-center">
                        <div className="text-3xl font-sans font-bold text-green-500">
                            <p>Create New Password</p>
                        </div>

                        <div className="text-slate-400">
                            <p>Your new password must be different<br /> from previously used password</p>
                        </div>

                        <div className="flex flex-col space-y-5 w-[60%]">
                            <input type="password" placeholder="New Password" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
                            <input type="password" placeholder="Confirm Password" className="outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-lg" />
                        </div>

                        <div>
                            <Link to={"#"}
                                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                                SAVE
                            </Link>
                        </div>
                    </div>
                </div>

                {/*right side*/}
                <div className="bg-gray-100 h-full w-full flex text-center flex-col space-y-5 items-center justify-center z-10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
                <img src={Resetpw} className="w-[70%] h-[90%]" />
                </div>

            </div>
        </div>
    )
}