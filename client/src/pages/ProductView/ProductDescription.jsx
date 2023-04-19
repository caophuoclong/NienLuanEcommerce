import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function ProductDescription({description}) {
  const {t} = useTranslation();
  return (
    <React.Fragment>
        <p className="text-md font-bold">{t("product_description")}</p>
        {/* <textarea  className="w-full h-auto" value={description} disabled={true}/>
         */}
         <ReactMarkdown children={description}/>
         {/* <div className="">
          {description}
         </div> */}
    </React.Fragment>
  )
}
