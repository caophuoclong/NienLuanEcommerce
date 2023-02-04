import React from 'react'
import { Link } from 'react-router-dom'
import Settings from '../../components/settings'
import { useTranslation } from 'react-i18next'


export default function Home() {
  const {t} = useTranslation();
  return (
    <div>
      <h1>{t("Welcome to React")}</h1>
        <Settings/>
        <Link to="/product/123">to Product</Link>
        <Link to="/product"> not found product</Link>
    </div>
  )
}
