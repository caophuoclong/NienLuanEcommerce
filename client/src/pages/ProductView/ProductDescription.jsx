import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function ProductDescription({description}) {
  return (
    <React.Fragment>
        <p className="text-md font-bold">Product Description</p>
        {/* <textarea  className="w-full h-auto" value={description} disabled={true}/>
         */}
         <ReactMarkdown children={description}/>
         {/* <div className="">
          {description}
         </div> */}
    </React.Fragment>
  )
}
