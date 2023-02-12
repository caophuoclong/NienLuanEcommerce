import React from 'react'
import { useTranslation } from 'react-i18next'
import Slider from '../../components/Slider';
import Banner from '../../components/Banner';
import Category from '../../components/Category';


export default function Home() {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <Slider height={"400px"} width={"100%"}/>
      <Category/>
      <Banner number={3}/>
    </div>
  )
}
