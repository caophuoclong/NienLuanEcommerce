import React from 'react'
import {useTranslation} from "react-i18next";
import {changeLanguage} from "i18next";
import ChangeLanguage from './changeLanguage';
export default function Settings() {
    const onChangeLanauge = ()=>{

    }
  return (
    <div className=''>
        Settings
        <ChangeLanguage/>
    </div>
  )
}
