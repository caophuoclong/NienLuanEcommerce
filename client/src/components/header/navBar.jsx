import React from 'react';
import ChangeLanguage from '../settings/changeLanguage';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AuthService } from '../../services/auth';
import { setDefaultUser } from '../../app/slices/home.slice';

const NavBar = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.home.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogout = async ()=>{
    try{
      const response = await AuthService.logout();
      window.localStorage.removeItem("access_token")
      dispatch(setDefaultUser())
      navigate("/")
    }catch(error){
      alert("Logout failed")
      console.log(error);
    }

  }
  return (
    <div className="flex items-center justify-between bg-[#212d4c] px-[10rem] py-1">
      <div className="flex">
        <ChangeLanguage />
      </div>
      <div className="flex gap-x-4 items-center">
        {user._id ? (
          <div  className="relative group">
            <Link to="/user/purchase" className='flex items-center gap-x-4 '>
              <div
                className="h-8 w-8 rounded-full bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${user.avatar})`,
                }}
              ></div>
              <span className="italic text-gray-400">@{user.auth.username}</span>
            </Link>
            <div className="w-40 bg-white absolute  z-[100] rounded-md shadow-lg invisible group-hover:visible flex flex-col items-start py-2 right-0">
                <Link to="/user/profile" className="text-black hover:text-blue-500 hover:bg-gray-100 w-full py-2 px-2">{t("my_account")}</Link>
                <Link to="/user/purchase" className="text-black hover:text-blue-500 hover:bg-gray-100 w-full py-2 px-2">{t("purchase")}</Link>
                <button className="text-black hover:text-blue-500 hover:bg-gray-100 w-full py-2 px-2 text-start" onClick={onLogout}>{t("logout")}</button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Link to="/signin">{t('Sign In')}</Link>
            <Link to="/register">{t('Create an Account')}</Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default NavBar;
