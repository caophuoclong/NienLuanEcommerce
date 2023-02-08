import React from 'react';
import ChangeLanguage from '../settings/changeLanguage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const {t} = useTranslation();
  return (
    <div className="flex items-center justify-between bg-[#212d4c] px-[10rem]">
      <div className="flex">
        <ChangeLanguage />
      </div>
      <div className="flex gap-x-4">
        <Link to="/sigin">{t('Sign In')}</Link>
        <Link to="/register">{t('Create an Account')}</Link>
      </div>
    </div>
  );
};

export default NavBar;
