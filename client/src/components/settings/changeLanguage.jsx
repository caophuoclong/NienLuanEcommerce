import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import VN from '../../assets/images/flags/vietnam.png';
import US from '../../assets/images/flags/usa.png';
import { useTranslation } from 'react-i18next';
import { changeLang } from '../../app/slices/setting.slice';
import { changeLanguage } from 'i18next';
const ChangeLanguage = () => {
  const { lang } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showOptionLanguage, setShowOptionLanguage] = useState(false);
  const changeLanaugeRef = useRef(null);
  const onClickOutside = (e) => {
    if (changeLanaugeRef.current) {
      if (!changeLanaugeRef.current.contains(e.target)) {
        setShowOptionLanguage(false);
      }
    }
  };
  window.addEventListener('click', onClickOutside);
  const handleChangeLanguage = (lang)=>{
    dispatch(changeLang(lang))
    changeLanguage(lang);
  }
  return (
    <div
      ref={changeLanaugeRef}
      className="realative cursor-pointer"
      onClick={() => setShowOptionLanguage((prev) => !prev)}
    >
        Change language with i18n
      <img className="mx-1" width={32} height={32} src={lang === 'vi' ? VN : US} />
      <div className={`absolute ${showOptionLanguage ? 'block' : 'hidden'} bg-gray-100`}>
        <div className="">
          <div
            onClick={()=>handleChangeLanguage('vi')}
            htmlFor="vi"
            className="flex gap-2 hover:bg-blue-500 hover:text-white rounded-lg items-center px-1 box-border"
          >
            <img width={32} height={32} src={VN} />
            <span className="text-sm">Tiếng Việt</span>
          </div>
          <div
            onClick={() => handleChangeLanguage('en')}
            htmlFor="en"
            className="flex gap-2 hover:bg-blue-500 hover:text-white rounded-lg items-center px-1 box-border"
          >
            <img width={32} height={32} src={US} />
            <span className="text-sm">English</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLanguage;
