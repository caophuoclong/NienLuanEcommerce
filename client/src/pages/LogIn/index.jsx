import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Register from '../Register';
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { AuthService } from '../../services/auth';
import { useAppDispatch } from '../../app/hooks';
import { getMe } from '../../app/slices/home.slice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {t} = useTranslation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const onSubmit = async() => {
    try{
      const response = await AuthService.signin({username, password, rememberMe});
      window.localStorage.setItem("access_token", response);
      dispatch(getMe());
      navigate("/")
    }catch(error){
      console.log(error);
      if(error.response.status === 403 && error.response.data.message === "Your account is not active"){
        toast.error(t("account_not_active"))
      }else
      alert("Please login again!")
    }

  };
  return (
    <div className="flex h-[93vh] min-h-[90vh] w-full items-center justify-center bg-white ">
      <div className="flex h-[80%] w-[90%] items-center justify-center shadow-lg ">
        {/*left side*/}
        <div className="z-50 h-full w-full bg-white  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex h-full flex-col items-center justify-center space-y-5">
            <div className="font-sans text-3xl font-bold text-green-500">
              <p>{t("sign_in")}</p>
            </div>

            <div className="flex flex-row space-x-9">
              <Link
                to={'#'}
                className="rounded-full text-zinc-500 outline outline-offset-4 outline-zinc-500"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link
                to={'#'}
                className="rounded-full text-zinc-500 outline outline-offset-4 outline-zinc-500"
              >
                <FaGoogle className="text-sm" />
              </Link>
            </div>


            <div className="flex w-[70%] flex-col space-y-5">
              <input
                type="text"
                placeholder={t("username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
              />
              <input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
              />
            </div>

            <div
              className="mb -5 mx-5 flex
            w-64 justify-between"
            >
              <input
                id="rememberMe"
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe((prev) => !prev)}
              />
              <label
                htmlFor="rememberMe"
                className="flex cursor-pointer select-none items-center text-sm"
              >
                {t("remember_me")}
              </label>

              <Link to={'/forgotpassword'} className="text-sm">
                {t("forgot_password")}
              </Link>
            </div>

            <button
              onClick={onSubmit}
              className="inline-block rounded-full border-2 border-green-500 px-12 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
            >
              {t("sign_in").toUpperCase()}
            </button>
          </div>
        </div>

        {/*right side*/}
        <div className="z-10 flex h-full w-full flex-col items-center justify-center space-y-5 bg-green-500 text-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
          <div className="font-sans text-3xl font-bold text-white">
            <p>{t("hello")},</p>
          </div>

          <div className="text-white">
            <p>
              {t("let_join_with_us")}
            </p>
          </div>

          <div>
            <Link
              to={'/register'}
              className="inline-block rounded-full border-2 border-white px-12 py-2 font-semibold text-white hover:bg-white hover:text-green-500"
            >
              {t("sign_up").toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
